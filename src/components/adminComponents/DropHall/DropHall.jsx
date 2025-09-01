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

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

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

          const [filmDuration] = allData.result.films.filter(
            (film) => film.id === seance.seance_filmid
          );
          const seanseWidth = (100 * filmDuration.film_duration) / 1440;
          const startMinutes = timeToMinutes(seance.seance_time);
          const position = ((startMinutes + 0) / 1440) * 90;
          const newPosition = Math.max(0, Math.min(100, position));

          return (
            <div className="wrp-seances-film-name">
              <div
                key={seance.id}
                style={{
                  background: colors[seance.seance_filmid],
                  position: "absolute",
                  left: `${newPosition}%`,
                  width: `${seanseWidth}%`,
                }}
                className="wrp-seances-film"
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", seance.id);
                }}
                onDragEnd={() =>
                  onDropOutside(
                    seance.id,
                    filmName.film_name,
                    seance.seance_time
                  )
                }
              >
                <p className="film-name-seance">{filmName.film_name}</p>
              </div>
              <p
                className="film-time-seance"
                style={{
                  left: `${newPosition}%`,
                }}
              >
                {seance.seance_time}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default DropHall;
