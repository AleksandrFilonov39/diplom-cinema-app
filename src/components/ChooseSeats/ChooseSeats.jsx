import { useEffect, useState } from "react";
import "./ChooseSeats.css";
import { useParams } from "react-router-dom";
import Logo from "../Logo/Logo";
import AdminButton from "../adminComponents/AdminButton/AdminButton";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import Loading from "../Loading/Loading";

function ChooseSeats() {
  const [data, setData] = useState(null);
  const { id, dateSeance } = useParams();
  const [choosenSeats, setChoosenSeats] = useState([]);
  const navigate = useNavigate();
  const { allData } = useStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL("https://shfe-diplom.neto-server.ru/hallconfig");
        url.searchParams.append("seanceId", id);
        url.searchParams.append("date", dateSeance);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }

    fetchData();
  }, [dateSeance, id]);

  if (!allData?.result?.seances) {
    return <Loading />;
  }

  if (!allData || !data) {
    return <Loading />;
  }

  const seance = allData.result.seances.find((el) => el.id === Number(id));
  const filmName = allData.result.films.find(
    (el) => el.id === seance.seance_filmid
  );
  const hallName = allData.result.halls.find(
    (el) => el.id === seance.seance_hallid
  );

  const chooseSeats = (seat, row, place) => {
    if (seat === "taken" || seat === "disabled") {
      return;
    }
    const seatIndex = choosenSeats.findIndex(
      (ele) => ele[0] === row && ele[1] === place
    );
    console.log(seatIndex, "seatIndex");
    if (seatIndex !== -1) {
      setChoosenSeats([
        ...choosenSeats.filter((ele, index) => index !== seatIndex),
      ]);
    } else {
      setChoosenSeats((prev) => [...prev, [row, place]]);
    }
  };

  const handleClick = () => {
    if (choosenSeats.length === 0) {
      alert("Выберите места для бронирования");
      return;
    }
    setChoosenSeats([
      ...choosenSeats.map((el) =>
        el.push(
          data.result[el[0]][el[1]] === "vip"
            ? hallName.hall_price_vip
            : hallName.hall_price_standart
        )
      ),
    ]);
    navigate("/buyTickets", {
      replace: true,
      state: {
        choosenSeats,
        filmName: filmName.film_name,
        seance: seance.seance_time,
        hallName: hallName.hall_name,
        id: id,
        date: dateSeance,
      },
    });
  };

  return (
    <div className="container-choose-seats">
      <div className="header__nav-choose-seats">
        <Logo />
      </div>
      <div className="wrp-title-choose-seats">
        <div className="wrp-title-choose">
          <div className="wrp-title-choose-name">
            <p className="title-choose-seats-film-name">{filmName.film_name}</p>
            <p className="title-choose-seats-film-time">
              Начало сеанса: {seance.seance_time}
            </p>
            <p className="title-choose-seats-hall-name">{hallName.hall_name}</p>
          </div>
          <div className="wrp-title-choose-tap">
            <img
              src="./hint.png"
              alt="double tap"
              className="wrp-title-choose-tap-img"
            />
            <p>тапните дважды для увеличения</p>
          </div>
        </div>

        <div className="wrp-hall-choose-seats">
          <img
            src="./screen.png"
            alt="screen"
            className="wrp-hall-choose-seats-img"
          />
          <div className="hall-seats-choose">
            {data.result?.map((row, indRow) => (
              <div className="hall-seats-choose-row" key={indRow}>
                {row.map((el, indPlace) => (
                  <span
                    className={
                      choosenSeats.find(
                        (ele) => ele[0] === indRow && ele[1] === indPlace
                      )
                        ? "seats-choose-select"
                        : `seats-choose-${el}`
                    }
                    key={indPlace}
                    onClick={() => chooseSeats(el, indRow, indPlace)}
                  >
                    <p className="seats-choose-name"></p>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="seats-choose-varaibles">
            <div className="seats-choose-varaibles-standart">
              <span className="seats-choose-standart"></span>
              <p className="seats-choose-name">
                Свободно ({hallName.hall_price_standart}руб.)
              </p>
            </div>
            <div className="seats-choose-varaibles-standart">
              <span className="seats-choose-taken"></span>
              <p className="seats-choose-name">Занято</p>
            </div>
            <div className="seats-choose-varaibles-standart">
              <span className="seats-choose-vip"></span>
              <p className="seats-choose-name">
                {" "}
                Свободно VIP ({hallName.hall_price_vip}руб.)
              </p>
            </div>
            <div className="seats-choose-varaibles-standart">
              <span className="seats-choose-select"></span>
              <p className="seats-choose-name">Выбрано</p>
            </div>
          </div>
        </div>
        <div className="seats-choose-btn">
          <AdminButton title={"забронировать"} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default ChooseSeats;
