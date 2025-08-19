import { useState, useEffect } from "react";
import "./DragFilm.css";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function DragFilm({ deleteFilm, onDragStart, setBgColor }) {
  const [colors, setColors] = useState({});
  const { allData } = useStore();

  useEffect(() => {
    setBgColor(colors);
  }, []);

  if (!allData?.result?.films) {
    return <Loading />;
  }

  const handleDragStart = (e, film) => {
    e.dataTransfer.setData("text/plain", film.id);
    onDragStart(film);
  };

  const getRandomHexColor = (filmId) => {
    if (colors[filmId]) return colors[filmId];
    const newColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setColors((prev) => ({ ...prev, [filmId]: newColor }));
    return newColor;
  };

  return (
    <div className="wrp-drag-films">
      {allData.result.films.map((film) => (
        <div
          key={film.id}
          style={{ backgroundColor: getRandomHexColor(film.id) }}
          className="wrp-drop-film"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, film)}
        >
          <img src={film.film_poster} alt="poster" className="drop-film-img" />
          <div className="drop-film-side">
            <h2 className="drop-film-name">{film.film_name}</h2>
            <p className="drop-film-duration">{film.film_duration} мин</p>
          </div>
          <button
            className="drop-film-delete-btn"
            onClick={() => deleteFilm(film.id)}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default DragFilm;
