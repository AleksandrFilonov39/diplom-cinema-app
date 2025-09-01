import { useState } from "react";
import "./ChangePrice.css";
import AdminButton from "../AdminButton/AdminButton";
import CencelButton from "../CencelButton/CencelButton";
import HallsUI from "../HallsUI/HallsUI";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";

function ChangePrice() {
  const [currentHall, setCurrentHall] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
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

  if (currentPrice === null && allData.result.halls.length > 0) {
    setCurrentPrice((prev) => ({
      ...prev,
      priceStandart: allData.result.halls[0].hall_price_standart,
      priceVip: allData.result.halls[0].hall_price_vip,
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
    const [currentHall] = allData.result.halls.filter((hall) => hall.id === id);
    setCurrentPrice((prev) => ({
      ...prev,
      priceStandart: currentHall.hall_price_standart,
      priceVip: currentHall.hall_price_vip,
    }));
  }

  function generateConfig(rows, places) {
    return Array.from({ length: Number(rows) }, () =>
      Array.from({ length: Number(places) }, () => "standart")
    );
  }

  function updateRowPrice(e) {
    e.preventDefault();
    const { name, value } = e.target;

    if (value === '') {
      setCurrentPrice((prev) => ({ ...prev, [name]: '' }));
      return;
    }
    
    const newValue = Number(value);
    
    if (isNaN(newValue)) {
      return;
    }

    if (value <= 0 || value > 50000) {
      alert("Стоимость не может быть меньше 0 или ");
      setCurrentPrice((prev) => ({ ...prev, [name]: 1 }));
      return;
    }
    setCurrentPrice((prev) => ({ ...prev, [name]: value }));
  }

  const handleClick = async () => {

     if (
      !currentPrice.priceStandart ||
      !currentPrice.priceVip ||
      isNaN(currentPrice.priceStandart) ||
      isNaN(currentPrice.priceVip) ||
      currentPrice.priceStandart > 5000 ||
      currentPrice.priceStandart <= 0 ||
      currentPrice.priceVip > 5000 ||
      currentPrice.priceVip <= 0
    ) {
      alert(
        "Заполните все поля корректно. Стоимость билетов не может быть меньше 0 и больше 5000"
      );
      return;
    }


    const params = new FormData();
    params.set("priceStandart", currentPrice.priceStandart);
    params.set("priceVip", currentPrice.priceVip);

    try {
      const response = await fetch(
        `https://shfe-diplom.neto-server.ru/price/${currentHall.id}`,
        {
          method: "POST",
          body: params,
        }
      );

      const data = await response.json();
      console.log(data, "dsdsvmnjksdvbhsvsjkvbsvjksvsv,");

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

  const handleCencel = () => {
    setCurrentPrice((prev) => ({ ...prev, priceStandart: "1", priceVip: "1" }));
  };

  return (
    <div className="wrp-config-price">
      <h2 className="config-hall-title">Выберите зал для конфигурации:</h2>
      <HallsUI updateCurrentHall={updateCurrentHall} id={currentHall.id} />
      <h2 className="config-hall-title">Установите цены для типов кресел:</h2>
      <form className="config-price-form">
        <label htmlFor="priceStandart" className="form-price-title">
          <div className="wrp-label-price">
            Цена, рублей
            <input
              type="number"
              name="priceStandart"
              className="form-price-input"
              value={currentPrice.priceStandart}
              onChange={updateRowPrice}
            />
          </div>
          <div className="wrp-seats-price">
            <p className="wrp-seats-text">за</p>
            <span className="seats-standart"></span>
            <p className="wrp-seats-text"> обычные кресла </p>
          </div>
        </label>
        <label htmlFor="priceVip" className="form-price-title">
          <div className="wrp-label-price">
            Цена, рублей
            <input
              type="number"
              name="priceVip"
              className="form-price-input"
              value={currentPrice.priceVip}
              onChange={updateRowPrice}
            />
          </div>
          <div className="wrp-seats-price">
            <p className="wrp-seats-text">за</p>
            <span className="seats-vip"></span>
            <p className="wrp-seats-text"> VIP кресла </p>
          </div>
        </label>
      </form>
      <div className="wrp-price-btns">
        <CencelButton title={"отменить"} onClick={handleCencel} widthPX={146}/>
        <AdminButton title={"сохранить"} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default ChangePrice;
