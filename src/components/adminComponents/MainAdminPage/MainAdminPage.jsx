import Logo from "../../Logo/Logo";
import AddHall from "../AddHall/AddHall";
import ConfigHall from "../ConfigHall/ConfigHall";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import "./MainAdminPage.css";
import ChangePrice from "../ChangePrice/ChangePrice";
import SeanceList from "../SeanceList/SeanceList";
import OpenSales from "../OpenSales/OpenSales";
import AdminButton from "../AdminButton/AdminButton";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store";
import Loading from "../../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";

function MainAdminPage() {
  const [showContent, setShowContent] = useState({
    addHall: true,
    configHall: true,
    changePrice: true,
    openSales: true,
    seanceList: true,
  });
  const { fetchAllData, allData } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  function hideOption(value) {
    setShowContent((prev) => ({ ...prev, ...value }));
  }

  const deleteDAtaFromLocalStorage = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!allData) {
    return <Loading />;
  }

  const sectionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <div className="wrp-auth-main">
      <div className="wrp-info-main">
        <div className="wrp-logo-main">
          <div>
            <Logo />
            <h2 className="auth-adm">Администраторррская</h2>
          </div>
          <AdminButton
            title={"выйти"}
            handleClick={deleteDAtaFromLocalStorage}
            widthPX={71}
          />
        </div>

        <div className="admin-section">
          <Header
            title={"Управление залами"}
            after={"header-text-after"}
            css={"header-text"}
            sectionName="addHall"
            show={showContent.addHall}
            onClick={hideOption}
          />
          <AnimatePresence initial={false}>
            {showContent.addHall && (
              <motion.div
                className="section-content"
                variants={sectionVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <AddHall />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="admin-section">
          <Header
            title={"конфигурация залов"}
            after={"header-text-after"}
            css={"header-text"}
            sectionName="configHall"
            show={showContent.configHall}
            onClick={hideOption}
          />
          <AnimatePresence initial={false}>
            {showContent.configHall && (
              <motion.div
                className="section-content"
                variants={sectionVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <ConfigHall allData={allData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="admin-section">
          <Header
            title={"конфигурация цен"}
            after={"header-text-after"}
            css={"header-text"}
            sectionName="changePrice"
            show={showContent.changePrice}
            onClick={hideOption}
          />
          <AnimatePresence initial={false}>
            {showContent.changePrice && (
              <motion.div
                className="section-content"
                variants={sectionVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <ChangePrice />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="admin-section">
          <Header
            title={"Сетка сеансов"}
            after={"header-text-after"}
            css={"header-text"}
            sectionName="seanceList"
            show={showContent.seanceList}
            onClick={hideOption}
          />
          <AnimatePresence initial={false}>
            {showContent.seanceList && (
              <motion.div
                className="section-content"
                variants={sectionVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <SeanceList />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="admin-section">
          <Header
            title={"открыть продажи"}
            after={"header-text-after"}
            css={"header-text"}
            sectionName="openSales"
            show={showContent.openSales}
            onClick={hideOption}
          />
          <AnimatePresence initial={false}>
            {showContent.openSales && (
              <motion.div
                className="section-content"
                variants={sectionVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <OpenSales />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MainAdminPage;
