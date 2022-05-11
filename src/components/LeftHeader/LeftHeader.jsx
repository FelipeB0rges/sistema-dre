import { React, useState } from "react";
import "./LeftHeader.scss";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const LeftHeader = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="view-left-header">
        <div className="item-header">
          <div className="item selecionado">
            <Link to="/home">
              {" "}
              Home <HomeIcon className="icone" />
            </Link>
          </div>
        </div>
        <div className="item-header">
          <div
            className="item"
            onClick={() => {
              if (open != "receitas") {
                setOpen("receitas");
              } else {
                setOpen(false);
              }
            }}
          >
            Receitas <AttachMoneyIcon className="icone" />
            <div className={open == "receitas" ? "sub-menu ativo" : "sub-menu"}>
              <div className="sub-item">
                <Link to="/tipos-receitas"> Tipos receitas</Link>
              </div>
              <div className="sub-item">
                <Link to="/receitas-cadastrar"> Cadastrar</Link>
              </div>
              
            </div>
          </div>
        </div>
        <div className="item-header">
          <div
            className="item"
            onClick={() => {
              if (open != "despesas") {
                setOpen("despesas");
              } else {
                setOpen(false);
              }
            }}
          >
            Despesas <AttachMoneyIcon className="icone" />
            <div className={open == "despesas" ? "sub-menu ativo" : "sub-menu"}>
            <div className="sub-item">
                <Link to="/tipos-despesas"> Tipos despesas</Link>
              </div>
              <div className="sub-item">
                <Link to="/despesas-cadastrar"> Cadastrar</Link>
              </div>
          
            </div>
          </div>
        </div>
        <div className="item-header">
          <div className="item">
            <Link to="cadastrar-usuario">
              {" "}
              Cadastrar Usuários <AccountCircleIcon className="icone" />
            </Link>
          </div>
        </div>
        <div className="item-header">
          <div className="item">
          <Link to="relatorios">
            Relatórios <AssessmentIcon className="icone" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftHeader;
