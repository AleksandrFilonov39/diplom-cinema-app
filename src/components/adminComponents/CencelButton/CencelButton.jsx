import "./CencelButton.css";

function CencelButton({ title, onClick }) {
  return (
    <button onClick={onClick} className="form-addHall-cancelBTN">
      {title}
    </button>
  );
}

export default CencelButton;
 