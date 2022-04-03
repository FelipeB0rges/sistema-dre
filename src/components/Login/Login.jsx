import React, { useEffect, useState } from 'react';
import styles from './Login.scss'
import TextField from "@mui/material/TextField";
import Logo from '../../assets/images/logo192.png'
import Button from "@mui/material/Button";
import Api from '../../Api';
import { useHistory } from "react-router-dom";


const Login = () => {
    let history = useHistory()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro_login, setErroLogin] = useState(false)


    const handleLogin = (event) => {
        event.preventDefault();
        console.log('logando')
        if (email != 'admin@admin.com' && senha != 'admin') {
            setErroLogin(true)
        } else {
            history.push('/home')
        }
    }

    return (
        <div className="view-login">
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
                    <div className={!erro_login ? "error_login" : "error_login ativo"}>Email ou senha incorretos!</div>
                    <div className="botao">
                        <Button variant="contained" type="submit" disabled={!senha || !email}>
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;