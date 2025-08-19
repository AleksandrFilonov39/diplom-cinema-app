import { useState } from "react";
import "./DropHall.css";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function DropHall({ id, onDrop, onDropOutside, colors }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { allData } = useStore();

  if (!allData?.result?.films) {
    return <Loading />;
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    onDrop(id);
  };

  return (
    <div
      className="wrp-seances"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {allData.result.seances
        .filter((el) => el.seance_hallid === id)
        .sort((a, b) => a.seance_time.localeCompare(b.seance_time))
        .map((seance) => {
          const [filmName] = allData.result.films.filter(
            (film) => film.id === seance.seance_filmid
          );
          return (
            <div
              key={seance.id}
              style={{ background: colors[seance.seance_filmid] }}
              className="wrp-seances-film"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", seance.id);
              }}
              onDragEnd={() =>
                onDropOutside(seance.id, filmName.film_name, seance.seance_time)
              }
            >
              <p className="film-name-seance">{filmName.film_name}</p>
              <p className="film-time-seance">{seance.seance_time}</p>
            </div>
          );
        })}
    </div>
  );
}

export default DropHall;
