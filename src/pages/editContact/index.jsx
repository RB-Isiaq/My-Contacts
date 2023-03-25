import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phonenumber = useRef();

  const navigate = useNavigate();
  const contactId = window.location.pathname.slice(6);

  let existingContactsList = JSON.parse(localStorage.getItem("contacts"));

  let identifiedContact = existingContactsList.filter(
    (contact) => contact.id === contactId
  );

  const firstNameValue = identifiedContact[0].firstName;
  const lastNameValue = identifiedContact[0].lastName;
  const emailValue = identifiedContact[0].email;
  const phonenumberValue = identifiedContact[0].phonenumber;

  function goBackHandler() {
    navigate("..");
  }

  function deleteContactHandler() {
    let existingContactsList = JSON.parse(localStorage.getItem("contacts"));

    existingContactsList.filter((contact, index) => {
      if (contact.id === contactId) {
        const proceed = window.confirm(
          "Are you sure you want to delete this contact"
        );
        if (proceed) {
          existingContactsList.splice(index, 1);
          console.log(existingContactsList);
          localStorage.setItem(
            "contacts",
            JSON.stringify(existingContactsList)
          );
        }
        return contact;
      }
      return existingContactsList;
    });
    navigate("..");
  }

  function submitHandler(e) {
    e.preventDefault();
    let existingContactsList;
    const editedContactData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      phonenumber: phonenumber.current.value,
      id:
        firstName.current.value.split("").slice(0, 3).join("") +
        phonenumber.current.value.split("").slice(-5).join(""),
    };
    existingContactsList = JSON.parse(localStorage.getItem("contacts"));

    existingContactsList.filter((contact, index) => {
      if (contact.id === contactId) {
        existingContactsList.splice(index, 1, editedContactData);
        console.log(existingContactsList);
        localStorage.setItem("contacts", JSON.stringify(existingContactsList));
      }
      return contact;
    });
    navigate(`/${editedContactData.id}`);
  }
  return (
    <main>
      <div id="edit-screen">
        <div id="edit-screen-btns">
          <div>
            <button id="cancel-edit-btn" onClick={goBackHandler}>
              Cancel
            </button>
          </div>
          <div>
            <button id="delete-btn" onClick={deleteContactHandler}>
              Delete
            </button>
          </div>
        </div>
        <form id="edit-form" method="post" onSubmit={submitHandler}>
          <div>
            <label htmlFor="edit-firstname">First Name:</label>
            <br />
            <input
              ref={firstName}
              type="text"
              id="edit-firstname"
              name="e-firstname"
              defaultValue={firstNameValue}
            />
          </div>
          <div>
            <label htmlFor="edit-lastname">Last Name:</label>
            <br />
            <input
              ref={lastName}
              type="text"
              id="edit-lastname"
              name="e-lastname"
              defaultValue={lastNameValue}
            />
          </div>
          <div>
            <label htmlFor="edit-email">Email:</label>
            <br />
            <input
              ref={email}
              type="email"
              id="edit-email"
              name="e-mail"
              defaultValue={emailValue}
            />
          </div>
          <div>
            <label htmlFor="edit-phonenumber">Phone:</label>
            <br />
            <input
              ref={phonenumber}
              type="tel"
              id="edit-phonenumber"
              name="e-phone"
              defaultValue={phonenumberValue}
            />
          </div>
          <div>
            <input type="submit" id="update-btn" value="Save" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditContact;
