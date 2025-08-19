import { useState } from "react";
import "./ConfigHall.css";
import AdminButton from "../AdminButton/AdminButton";
import CencelButton from "../CencelButton/CencelButton";
import HallsUI from "../HallsUI/HallsUI";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function ConfigHall() {
  const [currentHall, setCurrentHall] = useState(null);
  const { allData, updateAllData } = useStore();

  if (!allData?.result?.halls) {
    return <Loading />;
  }

  if (currentHall === null && allData.result.halls.length > 0) {
    setCurrentHall((prev) => ({
      ...prev,
      id: allData.result.halls[0].id,
      rows: allData.result.halls[0].hall_rows,
      places: allData.result.halls[0].hall_places,
      config: allData.result.halls[0].hall_config,
    }));
    return null;
  }

  function updateCurrentHall(id, hall_rows, hall_places, hall_config) {
    const config = hall_config
      ? hall_config
      : generateConfig(hall_rows, hall_places);
    setCurrentHall((prev) => ({
      ...prev,
      id: id,
      rows: hall_rows,
      places: hall_places,
      config: config,
    }));
  }

  function generateConfig(rows, places) {
    return Array.from({ length: Number(rows) }, () =>
      Array.from({ length: Number(places) }, () => "standart")
    );
  }

  function updateRowPalce(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (currentHall.places > 15 || currentHall.places <= 0) {
      alert(
        "число мест в ряду не должно превышать 15 и не может бать меньше нуля"
      );
      setCurrentHall((prev) => ({ ...prev, places: 10 }));
      return;
    }

    if (currentHall.rows > 15 || currentHall.rows <= 0) {
      alert(
        "число рядов в зале не должно превышать 15 и не может бать меньше нуля"
      );
      setCurrentHall((prev) => ({ ...prev, rows: 10 }));
      return;
    }

    setCurrentHall((prev) => {
      const newRows = name === "rows" ? value : prev.rows;
      const newPlaces = name === "places" ? value : prev.places;
      const config = generateConfig(newRows, newPlaces);
      return { ...prev, [name]: value, config: config };
    });
  }

  function chengePlaсe(indRow, indPlace) {
    let arr = currentHall.config;
    let row = currentHall.config[indRow];
    let placeName = currentHall.config[indRow][indPlace];
    if (placeName === "standart") {
      placeName = "vip";
    } else if (placeName === "vip") {
      placeName = "disabled";
    } else if (placeName === "disabled") {
      placeName = "standart";
    }
    row = [...row.slice(0, indPlace), placeName, ...row.slice(indPlace + 1)];
    arr = [...arr.slice(0, indRow), row, ...arr.slice(indRow + 1)];
    setCurrentHall((prev) => ({ ...prev, config: arr }));
  }

  const handleClick = async () => {
    const params = new FormData();
    params.set("rowCount", currentHall?.rows.toString());
    params.set("placeCount", currentHall?.places.toString());
    params.set("config", JSON.stringify(currentHall?.config));
    try {
      const response = await fetch(
        `https://shfe-diplom.neto-server.ru/hall/${currentHall.id}`,
        {
          method: "POST",
          body: params,
        }
      );
      const data = await response.json();

      const currentData = useStore.getState().allData;

      updateAllData({
        ...currentData,
        result: {
          ...currentData.result,
          halls: [
            ...currentData.result.halls.filter(
              (el) => el.id !== data?.result?.id
            ),
            data.result,
          ],
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  function handleCencel() {
    const config = generateConfig(10, 10);
    setCurrentHall((prev) => ({
      ...prev,
      rows: 10,
      places: 10,
      config: config,
    }));
  }

  return (
    <div className="wrp-config-hall">
      <h2 className="config-hall-title">Выберите зал для конфигурации:</h2>
      <HallsUI updateCurrentHall={updateCurrentHall} id={currentHall.id} />
      <h2 className="config-hall-title">
        Укажите количество рядов и максимальное количество кресел в ряду:
      </h2>
      <form className="config-hall-form">
        <label htmlFor="rows" className="form-addHall-title">
          <p className="form-addHall-text">Рядов, шт</p>
          <input
            type="number"
            name="rows"
            className="form-addHall-input"
            value={currentHall.rows}
            onChange={updateRowPalce}
          />
        </label>
        <span className="form-addHall-cros">X</span>
        <label htmlFor="places" className="form-addHall-title">
          <p className="form-addHall-text">Мест, шт</p>
          <input
            type="number"
            name="places"
            className="form-addHall-input"
            value={currentHall.places}
            onChange={updateRowPalce}
          />
        </label>
      </form>
      <h2 className="config-hall-title">
        Теперь вы можете указать типы кресел на схеме зала:
      </h2>
      <div className="wrp-all-seats">
        <div className="wrp-seats">
          <span className="seats-standart"></span>
          <p className="wrp-seats-text"> — обычные кресла </p>
        </div>
        <div className="wrp-seats">
          <span className="seats-vip"></span>
          <p className="wrp-seats-text"> — VIP кресла </p>
        </div>
        <div className="wrp-seats">
          <span className="seats-disabled"></span>
          <p className="wrp-seats-text"> — заблокированные (нет кресла) </p>
        </div>
      </div>
      <h2 className="title-seats-text">
        Чтобы изменить вид кресла, нажмите по нему
      </h2>
      <div className="wrp-hall-seats">
        <h3 className="hall-seats-title"> экран</h3>
        <div className="hall-seats">
          {Array.isArray(currentHall.config) &&
            currentHall.config.map((row, indRow) => (
              <div className="hall-seats-row" key={indRow}>
                {row.map((el, indPlace) => (
                  <span
                    className={`seats-${el}`}
                    key={indPlace}
                    onClick={() => chengePlaсe(indRow, indPlace)}
                  >
                    <p className="seats-name">{el}</p>
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="wrp-btn">
        <CencelButton title={"отменить"} onClick={handleCencel} />
        <AdminButton title={"сохранить"} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default ConfigHall;
