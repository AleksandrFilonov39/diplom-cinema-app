import useStore from "../../../store";

function HallsUI({ updateCurrentHall, id }) {
  const { allData } = useStore();

  return (
    <div className="wrp-config-hall-hall_name">
      {allData.result.halls.map((hall) => {
        return (
          <div
            key={hall.id}
            className={
              hall.id === id
                ? "config-hall-hall_name__active"
                : "config-hall-hall_name"
            }
            onClick={() =>
              updateCurrentHall(
                hall.id,
                hall.hall_rows,
                hall.hall_places,
                hall.hall_config
              )
            }
          >
            <p className="config-hall-name">{hall.hall_name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HallsUI;
