import { useState } from "react";
import AdminButton from "../AdminButton/AdminButton";
import "./SeanceList.css";
import { useNavigate } from "react-router-dom";
import DragFilm from "../DragFilm/DragFilm";
import DropHall from "../DropHall/DropHall";
import DeleteSeance from "../DeleteSeance/DeleteSeance";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function SeanceList() {
  const { allData, updateAllData } = useStore();
  const [dragFilmData, setDragFilmData] = useState();
  const [colors, setColors] = useState({});
  const [deleteFilmData, setDeleteFilmData] = useState({ delete: false });
  const navigate = useNavigate();

  if (!allData?.result?.halls) {
    console.log(allData, "allData?.result?.hallsvdsvsdvses");
    return <Loading />;
  }

  const handleClick = () => {
    navigate("/addFilm", { replace: true });
  };

  const deleteFilm = async (id) => {
    try {
      const response = await fetch(
        `https://shfe-diplom.neto-server.ru/film/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      const data = await response.json();

      const currentData = useStore.getState().allData;

      updateAllData({
        ...currentData,
        result: {
          ...currentData.result,
          films: data.result.films,
          seances: data.result.seances,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDragStart = (film) => {
    setDragFilmData(film);
  };

  const setBgColor = (newColor) => {
    setColors((prev) => ({ ...prev, ...newColor }));
  };

  const handleDropInHall = (hallId) => {
    if (!dragFilmData?.id) return;
    navigate(`/addSeance/${hallId}/${dragFilmData.id}`, { replace: true });
  };

  const handleDropOutside = async (id, filmName, seanceTime) => {
    setDeleteFilmData((prev) => ({
      ...prev,
      id: id,
      filmName: filmName,
      seanceTime: seanceTime,
      delete: true,
    }));
  };

  const deleteSeance = async () => {
    const id = deleteFilmData.id;

    try {
      const responce = await fetch(
        `https://shfe-diplom.neto-server.ru/seance/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!responce.ok) {
        throw new Error("не получилось удалить сеанс");
      }
      const data = await responce.json();

      const currentData = useStore.getState().allData;

      updateAllData({
        ...currentData,
        result: {
          ...currentData.result,
          seances: data.result.seances,
        },
      });
    } catch (e) {
      console.log(e);
    }

    setDeleteFilmData((prev) => ({ ...prev, delete: false }));
  };

  const closeDelete = () => {
    setDeleteFilmData((prev) => ({ ...prev, delete: false }));
  };

  return (
    <div className={deleteFilmData.delete ? "wrp-seance-del" : "wrp-seance"}>
      <AdminButton title={"добавить фильм"} handleClick={handleClick} />
      <div className="wrp-drag-film">
        <DragFilm
          deleteFilm={deleteFilm}
          onDragStart={handleDragStart}
          setBgColor={setBgColor}
        />
      </div>
      <div className="wrp-seance-halls">
        {allData.result.halls.map((hall) => (
          <div key={hall.id}>
            <h2 className="seance-hall-name">{hall.hall_name}</h2>
            <DropHall
              id={hall.id}
              onDrop={handleDropInHall}
              onDropOutside={handleDropOutside}
              colors={colors}
            />
          </div>
        ))}
      </div>
      {deleteFilmData.delete && (
        <DeleteSeance
          deleteFilmData={deleteFilmData}
          deleteSeance={deleteSeance}
          closeDelete={closeDelete}
        />
      )}
    </div>
  );
}

export default SeanceList;
