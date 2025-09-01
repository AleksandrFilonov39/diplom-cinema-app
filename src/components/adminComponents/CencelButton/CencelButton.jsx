import "./CencelButton.css";

function CencelButton({ title, onClick, widthPX}) {
  return (
    <button onClick={onClick} className={"form-addHall-cancelBTN"} style={{width: `${widthPX}px`}} >
      {title}
    </button>
  );
}

export default CencelButton; 
 