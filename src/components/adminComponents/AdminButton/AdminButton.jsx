import "./AdminButton.css";

function AdminButton({ title, handleClick, css, widthPX }) {
  return (
    <button className={!css ? "admin-button" : css} onClick={handleClick}
    style={{width: `${widthPX}px`}}
    >
      {title}
    </button>
  );
}

export default AdminButton;
