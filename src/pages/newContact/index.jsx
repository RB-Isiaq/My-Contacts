import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function NewContact() {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phonenumber = useRef();

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    let existingContactsList;
    const newContactData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      phonenumber: phonenumber.current.value,
      id:
        firstName.current.value.split("").slice(0, 3).join("") +
        phonenumber.current.value.split("").slice(-5).join(""),
    };

    if (localStorage.getItem("contacts") === null) {
      existingContactsList = [];
      existingContactsList.push(newContactData);
      localStorage.setItem("contacts", JSON.stringify(existingContactsList));
    } else {
      existingContactsList = JSON.parse(localStorage.getItem("contacts"));
      existingContactsList.push(newContactData);
      localStorage.setItem("contacts", JSON.stringify(existingContactsList));
    }

    navigate("/");
    console.log(localStorage.getItem("contact"));
  }

  function cancelHandler() {
    navigate("/");
  }
  return (
    <main>
      <div id="contact-form-screen">
        <div>
          <button id="cancel-btn" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
        <form id="contact-form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <br />
            <input
              ref={firstName}
              required
              type="text"
              id="firstname"
              name="firstname"
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <br />
            <input ref={lastName} type="text" id="lastname" name="lastname" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input ref={email} type="email" id="email" name="mail" />
          </div>
          <div>
            <label htmlFor="phonenumber">Phone:</label>
            <br />
            <input ref={phonenumber} type="tel" id="phonenumber" name="phone" />
          </div>
          <div>
            <input type="submit" id="save-contact-btn" value="Save" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewContact;
