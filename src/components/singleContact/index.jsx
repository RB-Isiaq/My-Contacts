import { useNavigate } from "react-router-dom";

function SingleContact({ id, letter, firstName, lastName }) {
  const navigate = useNavigate();

  function showContactDetailsHandler() {
    navigate(id);
  }

  return (
    <li
      className="contact"
      id={`contact-${id}`}
      onClick={showContactDetailsHandler}
    >
      <span>{letter} </span> {firstName} {lastName}
    </li>
  );
}

export default SingleContact;
