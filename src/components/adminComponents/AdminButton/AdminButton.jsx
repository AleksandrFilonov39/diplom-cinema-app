import "./AdminButton.css";

function AdminButton({ title, handleClick, css }) {
  return (
    <button className={!css ? "admin-button" : css} onClick={handleClick}>
      {title}
    </button>
  );
}

export default AdminButton;
