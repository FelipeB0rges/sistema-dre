import React from "react";
import "./LeftHeader.scss";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const LeftHeader = () => {
  let history = useHistory();
  return (
    <>
      <div className="view-left-header">
        <div className="item-header">
          <div className="item selecionado">
            Home <HomeIcon className="icone" />
          </div>
        </div>
        <div className="item-header">
          <div className="item">
            Receitas <AttachMoneyIcon className="icone" />
          </div>
        </div>
        <div className="item-header">
          <div className="item">
            Despesas <AttachMoneyIcon className="icone" />
          </div>
        </div>
        <div className="item-header">
          <div className="item">
            Relatórios <AssessmentIcon className="icone" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftHeader;
