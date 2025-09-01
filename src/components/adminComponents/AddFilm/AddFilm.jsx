import { useState } from "react";
import AdminButton from "../AdminButton/AdminButton";
import CencelButton from "../CencelButton/CencelButton";
import Header from "../Header/Header";
import "./AddFilm.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/Logo";
import useStore from "../../../store";

function AddFilm() {
  const [film, setFilm] = useState({ duration: 0 });
  const navigate = useNavigate();
  const { updateAllData } = useStore();

  function navigateTo() {
    navigate("/adminPage", { replace: true });
  }

  const filmData = (e) => { 
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "duration" && value < 0) {
      alert("Продолжительность фильма не может быть меньше 0");
      setFilm((prev) => ({
        ...prev,
        [name]: 0,
      }));
      return;
    }
    setFilm((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const filePoster = (e) => {
    setFilm((prev) => ({
      ...prev,
      poster: e.target.files[0],
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !film.filmName ||
      !film.duration ||
      !film.description ||
      !film.country ||
      !film.poster
    ) {
      return;
    }
    const params = new FormData();
    params.set("filmName", film.filmName.toString());
    params.set("filmDuration", film.duration);
    params.set("filmDescription", film.description.toString());
    params.set("filmOrigin", film.country.toString());
    params.set("filePoster", film.poster);
    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/film", {
        method: "POST",
        body: params,
      });
      const data = await response.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      const currentData = useStore.getState().allData;

      updateAllData({
        ...currentData,
        result: {
          ...currentData.result,
          films: data.result.films,
        },
      });

      navigate("/adminPage", { replace: true });
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
        <Header
          title={"Добавление фильма"}
          after={"header-text-after-close"}
          css={"header-text-forAddHallForm"}
          onClick={navigateTo}
        />
        <form className="wrp-form-addHall">
          <div className="wrp-form-addHall-label-input">
          <label htmlFor="filmName" className="form-addHall-title">
            Название фильма
          </label>
          <input
            type="text"
            name="filmName"
            id="filmName"
            onChange={filmData}
            className="form-addHall-input-form"
          />

          <label htmlFor="duration" className="form-addHall-title">
            Продолжительность фильма (мин.)
          </label>
          <input
            type="number"
            name="duration"
            value={film.duration}
            id="duration"
            onChange={filmData}
            className="form-addHall-input-form"
          />

          <label htmlFor="description" className="form-addHall-title">
            Описание фильма
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={filmData}
            className="form-addHall-input-about"
          />

          <label htmlFor="country" className="form-addHall-title">
            Страна
          </label> 
          <input
            type="text"
            name="country"
            id="country"
            onChange={filmData}
            className="form-addHall-input-form"
          />
          </div>
          <div className="wrp-addFilm-btns">
            <AdminButton title={"добавить фильм"} handleClick={handleClick} /> 
 
            <label className="custom-file-upload">
              <span>Загрузить постер</span>
              <input type="file" name="poster" onChange={filePoster} />
            </label>

            <CencelButton title={"отменить"} onClick={navigateTo} widthPX={146}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFilm;
