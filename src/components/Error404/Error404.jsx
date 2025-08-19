import "./Error404.css";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="wrp-error404">
      <button
        className="error404-btn"
        onClick={() => navigate("/", { replace: true })}
      >
        <div class="left"></div>
        На главную, там люди, спасение и печеньки!
        <div class="right"></div>
      </button>
    </div>
  );
}

export default Error404;
