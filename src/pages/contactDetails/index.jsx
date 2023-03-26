import { useNavigate } from "react-router-dom";
import { AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";

function ContactDetails() {
  const navigate = useNavigate();
  const contactId = window.location.pathname.slice(1);

  let existingContactsList = JSON.parse(localStorage.getItem("contacts"));

  let identifiedContact = existingContactsList.filter(
    (contact) => contact.id === contactId
  );

  const firstName = identifiedContact[0].firstName;
  const lastName = identifiedContact[0].lastName;
  const email = identifiedContact[0].email;
  const phonenumber = identifiedContact[0].phonenumber;

  function goBackHandler() {
    navigate("..");
  }
  function editPageHandler() {
    navigate(`/edit/${contactId}`);
  }

  function sendEmail() {
    window.open(`mailto:${email}`);
  }
  function callPhoneNumber() {
    window.open(`tel:${phonenumber}`);
  }
  function sendMessage() {
    window.open(`sms:${phonenumber}`);
  }
  function openWhatsapp() {
    window.open(`https://wa.me/${phonenumber}`);
  }
  return (
    <div id="details">
      <div className="box">
        <div>
          <div className="top-btns">
            <div>
              <button className="back-to-home-btn" onClick={goBackHandler}>
                Back
              </button>
            </div>
            <div>
              <button className="edit-btn" onClick={editPageHandler}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <p className="full-name">
          {firstName} {lastName}
        </p>
        <p className="contact-label">Email</p>
        <div className="email-flex">
          <p className="label-content">{email}</p>
          <div>
            <button className="email" onClick={sendEmail}>
              <AiOutlineMail />
            </button>
          </div>
        </div>
        <p className="contact-label">Phone</p>
        <div className="phone-flex">
          <p className="label-content">{phonenumber}</p>
          <div className="phone-flex-2">
            <div>
              <button className="call" color="yellow" onClick={callPhoneNumber}>
                <AiOutlinePhone />
              </button>
            </div>
            <div>
              <button className="message" onClick={sendMessage}>
                <AiOutlineMessage />
              </button>
            </div>
            <div>
              <button className="message" onClick={openWhatsapp}>
                <AiOutlineWhatsApp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
