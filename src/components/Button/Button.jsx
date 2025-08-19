import "./Button.css";

function Button({ onClick }) {
  return (
    <button className="login-button" onClick={onClick}>
      войти
    </button>
  );
}

export default Button;
