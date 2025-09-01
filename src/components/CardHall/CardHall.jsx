import "./CardHall.css";
import { Link } from "react-router-dom";
import useStore from "../../store";

function CardHall({ filmSeance, halls }) {
  const { selectedDate } = useStore();

  const date = new Date();
  const dateNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
  const time = `${String(date.getHours()).padStart(2, "0")}-${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <>
      {halls.map((hall) => {
        const seance = filmSeance.filter((el) => el.seance_hallid === hall.id);
        if (seance.length === 0 || hall.hall_open === 0) return;
        return (
          <div key={hall.id}>
            <h1 className="film-hall">{hall.hall_name}</h1>
            <div className="film-wrp-allTime">
              {seance.map((el) => {
                const timeSeance = el.seance_time
                  .split(":")
                  .map((el) => el.padStart(2, "0"))
                  .join(":");
                let currentSeances = true;
                if (dateNow === selectedDate && time > timeSeance) {
                  currentSeances = false;
                }
                return (
                  <Link
                    to={
                      currentSeances
                        ? `/hallconfig/${el.id}/${selectedDate}`
                        : "#"
                    }
                    className={`film-time ${!currentSeances ? "disabled" : ""}`}
                    key={el.id} 
                  >
                    <div className="film-wrp-time">
                      <h2 className="film-time">{timeSeance}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CardHall;
