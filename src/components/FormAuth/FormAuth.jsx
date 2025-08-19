import "./FormAuth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function FormAuth() {
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", JSON.stringify(user));
        navigate("/adminPage", { replace: true });
      } else {
        alert("incorrect data");
      }
    } catch (e) {
      console.log(e);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="wrp-form">
      <label htmlFor="form" className="form-label">
        Авторизация
      </label>
      <form name="form" className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-input-label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="Введите E-mail"
          onChange={handleChange}
        />
        <label htmlFor="password" className="form-input-label">
          Пароль
        </label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-input"
            placeholder="Введите пароль"
            onChange={handleChange}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="form-btn">Авторизоваться</button>
      </form>
    </div>
  );
}

export default FormAuth;
