import "./Tickets.css";
import { QRCodeSVG } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Logo from "../Logo/Logo";
import useStore from "../../store";
import Loading from "../Loading/Loading";

function Tickets() {
  const [unicCode] = useState(() => uuidv4());

  const { ticketsDataQR } = useStore();

  if (!ticketsDataQR) {
    return <Loading />;
  }

  const qrData = {
    "Код бронирования": unicCode,
    Дата: ticketsDataQR.result[0].ticket_date,
    Время: ticketsDataQR.result[0].ticket_time,
    "Название фильма": ticketsDataQR.result[0].ticket_filmname,
    Зал: ticketsDataQR.result[0].ticket_hallname,
    Место: ticketsDataQR.result
      .reduce((acc, el) => {
        acc += `Ряд: ${el.ticket_row} - Сидение: ${el.ticket_place}, `;
        return acc;
      }, "")
      .slice(0, -2),
    Стоимость: ticketsDataQR.result.reduce((acc, el) => {
      return acc + el.ticket_price;
    }, 0),
    Примечание: "Билет действителен строго на свой сеанс",
  };

  return (
    <div className="container-tickets">
      <div className="header__nav">
        <Logo />
      </div>
      <div className="buy-ticket-title">
        <p className="ticket-titel-text">Электронный билет</p>
      </div>
      <div className="buy-ticket-info">
        <div className="buy-ticket-film-info">
          <p className="buy-ticket-film-about-atr">На фильм: </p>
          <p className="buy-ticket-film-about-value">
            {ticketsDataQR.result[0].ticket_filmname}
          </p>
        </div>
        <div className="buy-ticket-film-info">
          <p className="buy-ticket-film-about-atr">Места: </p>
          <p className="buy-ticket-film-about-value">
            {ticketsDataQR.result
              .reduce((acc, el) => {
                acc += `Ряд: ${el.ticket_row} - Сидение: ${el.ticket_place}, `;
                return acc;
              }, "")
              .slice(0, -2)}
          </p>
        </div>
        <div className="buy-ticket-film-info">
          <p className="buy-ticket-film-about-atr">В зале: </p>
          <p className="buy-ticket-film-about-value">
            {ticketsDataQR.result[0].ticket_hallname}
          </p>
        </div>
        <div className="buy-ticket-film-info">
          <p className="buy-ticket-film-about-atr">Начало сеанса: </p>
          <p className="buy-ticket-film-about-value">
            {ticketsDataQR.result[0].ticket_time}
          </p>
        </div>
        <div className="buy-ticket-film-btn">
          <QRCodeSVG
            className="qr-ticket"
            value={JSON.stringify(qrData)}
            size={256}
            level="H"
          />
        </div>
        <p>
          Покажите QR-код нашему контроллеру для подтверждения бронирования.
        </p>
        <p>Приятного просмотра!</p>
      </div>
    </div>
  );
}

export default Tickets;
