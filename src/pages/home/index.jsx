import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai'
import SingleContact from "../../components/singleContact";

const Home = () => {
  const navigate = useNavigate();
  const searchValue = useRef();
  const [contactLists, setContactLists] = useState([]);
  // const [searchInput, setSearchInput] = useState("");

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
    e.preventDefault()
    // setSearchInput(e.target.value);
    let searchInputValue = searchValue.current.value
    let existingContactsList;
    existingContactsList = JSON.parse(localStorage.getItem("contacts"));
    let searchedContacts = []
    for (let i = 0; i < existingContactsList.length; i++) {
      // if(existingContactsList[i].firstName.toLowerCase().includes(e.target.value) ||
      // existingContactsList[i].lastName.toLowerCase().includes(e.target.value)) {
      if(existingContactsList[i].firstName.toLowerCase().includes(searchInputValue) ||
      existingContactsList[i].lastName.toLowerCase().includes(searchInputValue)) {
        console.log(searchInputValue);
        searchedContacts.push(existingContactsList[i])
        console.log(searchedContacts);
        console.log('FILTERED');
        setContactLists(searchedContacts)
      }
    }
    if (searchInputValue === "") {
      existingContactsList = JSON.parse(localStorage.getItem("contacts"));
      existingContactsList.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      setContactLists(existingContactsList);
    } 
    // else {
    //   existingContactsList = JSON.parse(localStorage.getItem("contacts"));
    //   let searchedContacts = []
    //   for (let i = 0; i < existingContactsList.length; i++) {
    //     if(existingContactsList[i].firstName.toLowerCase().includes(e.target.value) ||
    //     existingContactsList[i].lastName.toLowerCase().includes(e.target.value)) {
    //       searchedContacts.push(existingContactsList[i])
    //       console.log(searchedContacts);
    //       console.log('FILTERED');
    //       setContactLists(searchedContacts)
    //     }
    //   }
    //   // USING FILTER METHOD
    //   // let searchedContacts = existingContactsList.filter(
    //   //   (contact) =>
    //   //     contact.firstName.toLowerCase().includes(e.target.value) ||
    //   //     contact.lastName.toLowerCase().includes(e.target.value)
    //   // );
    //   // console.log(e.target.value);
    //   // console.log(searchedContacts);
    //   // searchedContacts.sort((a, b) => {
    //   //   if (a.firstName < b.firstName) return -1;
    //   //   if (a.firstName > b.firstName) return 1;
    //   //   return 0;
    //   // });
    //   // setContactLists(searchedContacts);
    // }
  }

 
  return (
    <main>
      <div id="contact-list-screen">
        <h1>My Contacts</h1>
        <form id="search-section" onSubmit={changeInputValue}>
          <div>
            <input
            ref={searchValue}
              type="search"
              id="search-bar"
              name="search"
              placeholder="Search contacts"
              // value={searchInput}
              onChange={changeInputValue}
            />
          </div>
          <button>
          <AiOutlineSearch />
          </button>
          
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
