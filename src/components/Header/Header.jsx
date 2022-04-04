import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  let history = useHistory();
  return (
    <>
      <header>
        <div className="topo">
          <div className="empresa"></div>
          <div className="empresa">Empresa</div>
          <div className="nome">
            Seja bem vindo! {localStorage.getItem("nome")}{" "}
            <LogoutIcon
              className="logout"
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
