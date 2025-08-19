import { useState } from "react";
import "./OpenSales.css";
import AdminButton from "../AdminButton/AdminButton";
import HallsUI from "../HallsUI/HallsUI";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function OpenSales() {
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
      open: allData.result.halls[0].hall_open,
    }));
    return null;
  }

  function updateCurrentHall(id, hall_rows, hall_places) {
    setCurrentHall((prev) => ({
      ...prev,
      id: id,
      rows: hall_rows,
      places: hall_places,
      open: allData.result.halls.find((el) => el.id === id).hall_open,
    }));
  }

  const handleClick = async () => {
    const params = new FormData();
    params.set("hallOpen", currentHall.open === 0 ? "1" : "0");
    try {
      const response = await fetch(
        `https://shfe-diplom.neto-server.ru/open/${currentHall.id}`,
        {
          method: "POST",
          body: params,
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
          halls: data.result.halls,
        },
      });

      setCurrentHall((prev) => ({
        ...prev,
        open: currentHall.open === 0 ? 1 : 0,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrp-open-seles">
      <h2 className="config-open-seles-title">
        Выберите зал для конфигурации:
      </h2>
      <HallsUI updateCurrentHall={updateCurrentHall} id={currentHall.id} />
      <h2 className="config-open-seles-title-ready">Всё готово к открытию</h2>
      <div className="wrp-open-seles-btn">
        <AdminButton
          title={
            !currentHall.open
              ? "Открыть продажу билетов"
              : "Приостановить продажу билетов"
          }
          handleClick={handleClick}
          css={"admin-button-large"}
        />
      </div>
    </div>
  );
}

export default OpenSales;
