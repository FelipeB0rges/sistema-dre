import React, { useState, useEffect } from "react";
import "./Login.scss";
import TextField from "@mui/material/TextField";
import Logo from "../../assets/images/logo192.png";
import Button from "@mui/material/Button";
import Api from "../../Api";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro_login, setErroLogin] = useState(false);
  const[splash,setSplash] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      senha: senha,
    };

    Api.post("usuarios/login", data).then(
      (res) => {
        console.log(res)
        localStorage.setItem("nome", res.data[0].nome);
        localStorage.setItem("id_usuario", res.data[0].id);
        localStorage.setItem("email", res.data[0].email);
        localStorage.setItem("id_empresa", res.data[0].id_empresa);
        history.push("/home");
      },
      (err) => {
        setEmail("")
        setSenha("")
        swal("Erro", "Usuário ou senha incorretos", "error");
      }
    );
  };

  setTimeout(() => {
    setSplash(true);
  }, 5000);


  return (
    <div className="view-login">
      <div className={splash ? "splash inativo" : "splash"} >
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="login">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <form onSubmit={handleLogin}>
          <TextField
            className="inputs"
            id="nome"
            type="email"
            name="email"
            value={email}
            label="Email"
            variant="standard"
            fullWidth={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            className="inputs"
            id="nome"
            name="senha"
            type="password"
            value={senha}
            label="Senha"
            variant="standard"
            fullWidth={true}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          />
          <div className={!erro_login ? "error_login" : "error_login ativo"}>
            Email ou senha incorretos!
          </div>
          <div className="botao">
            <Button
              variant="contained"
              type="submit"
              disabled={!senha || !email}
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
