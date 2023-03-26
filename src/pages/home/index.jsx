import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleContact from "../../components/singleContact";

const Home = () => {
  const navigate = useNavigate();
  const [contactLists, setContactLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let existingContactsList;

    if (localStorage.getItem("contacts") === null) {
      existingContactsList = [];
      setContactLists(existingContactsList);
    } else {
      existingContactsList = JSON.parse(localStorage.getItem("contacts"));
      existingContactsList.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      setContactLists(existingContactsList);
    }
  }, []);

  function addNewContact() {
    navigate("new");
  }

  function changeInputValue(e) {
    setSearchInput(e.target.value);
    let existingContactsList = JSON.parse(localStorage.getItem("contacts"));
    if (e.target.value !== "") {
      // const searchedContacts = existingContactsList.filter(
      //   (contact) =>
      //     contact.firstName.toLowerCase().includes(e.target.value) ||
      //     contact.lastName.toLowerCase().includes(e.target.value)
      // );
      // searchedContacts.sort((a, b) => {
      //   if (a.firstName < b.firstName) return -1;
      //   if (a.firstName > b.firstName) return 1;
      //   return 0;
      // });
      // setContactLists(searchedContacts);
      setContactLists(
        existingContactsList.filter(
          (contact) =>
            contact.firstName.toLowerCase() === e.target.value ||
            contact.lastName.toLowerCase() === e.target.value
        )
      );
    } else {
      existingContactsList = JSON.parse(localStorage.getItem("contacts"));
      existingContactsList.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      setContactLists(existingContactsList);
    }
  }

  function searchHandler(e) {
    e.preventDefault();
  }
  return (
    <main>
      <div id="contact-list-screen">
        <h1>My Contacts</h1>
        <form id="search-section" onSubmit={searchHandler}>
          <div>
            <input
              type="search"
              id="search-bar"
              name="search"
              placeholder="Search contacts"
              value={searchInput}
              onChange={changeInputValue}
            />
          </div>
        </form>
        <ul id="list">
          {contactLists.map((contact) => {
            return (
              <SingleContact
                key={contact.id}
                id={contact.id}
                letter={contact.firstName.slice(0, 1).toUpperCase()}
                firstName={contact.firstName}
                lastName={contact.lastName}
              />
            );
          })}
        </ul>
        <div>
          <button id="new-contact-btn" onClick={addNewContact}>
            +
          </button>
        </div>
      </div>
    </main>
  );
};
export default Home;
