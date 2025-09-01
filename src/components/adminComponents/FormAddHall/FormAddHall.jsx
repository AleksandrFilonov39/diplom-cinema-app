import { useState } from "react";
import Logo from "../../Logo/Logo";
import AdminButton from "../AdminButton/AdminButton";
import Header from "../Header/Header";
import "./FormAddHall.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store";
import CencelButton from "../CencelButton/CencelButton";

function FormAddHall() {
  const [newHall, setNewHall] = useState(null);
  const navigate = useNavigate();
  const { updateAllData } = useStore();

  function navigateTo(e) {
    e.preventDefault();
    navigate("/adminPage", { replace: true });
  }

    function navigateToForCross() {
    navigate("/adminPage", { replace: true });
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (!value.trim()) {
      return;
    }
    setNewHall((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  }

  const addHall = async (e) => {
    e.preventDefault();
    if (!newHall) {
      alert("введите название зала, название не должно быть пустым");
      return;
    }
    try {
      const params = new FormData();
      params.set("hallName", newHall.hallName);

      const response = await fetch("https://shfe-diplom.neto-server.ru/hall", {
        method: "POST",

        body: params,
      });

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      const data = await response.json();
      const currentData = useStore.getState().allData;

      updateAllData({
        ...currentData,
        result: {
          ...currentData.result,
          halls: data?.result?.halls,
        },
      });

      if (data.success) {
        navigate("/adminPage", { replace: true });
      } else {
        alert("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrp-auth">
      <div className="wrp-addHall-form">
        <div className="wrp-logo-addHall">
          <Logo />
          <h2 className="auth-adm">Администраторррская</h2>
        </div>
        <div className="wrp-form-header">
          <Header
            title={"добавление зала"}
            after={"header-text-after-close"}
            css={"header-text-forAddHallForm"}
            onClick={navigateToForCross}
          />
          <form className="wrp-form-addHall" onSubmit={addHall}>
            <div className="wrp-form-addHall-label-input">
              <label htmlFor="hallName" className="form-addHall-title">
                Название зала
              </label>
              <input
                type="text"
                name="hallName"
                placeholder="Например, «Зал 1»"
                className="form-addHall-input-form"
                onChange={handleChange}
              />
            </div> 
            <div className="wrp-form-addHall-btns">
              <AdminButton title={"добавить зал"} onClick={addHall} css={"admin-button-large"}/>
              <CencelButton title={"отменить"} onClick={navigateTo} widthPX={275}/>
            </div>
          </form> 
        </div>
      </div>
    </div>
  );
}

export default FormAddHall;
