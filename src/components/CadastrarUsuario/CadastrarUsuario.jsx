import { React, useState, useEffect } from "react";
import "./CadastrarUsuario.scss";
import LeftHeader from "../LeftHeader/LeftHeader";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Api from "../../Api";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CadastrarUsuario = () => {
  const [id_usuario, setIdUsuario] = useState();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [editando, setEditando] = useState(false);
  const [id_empresa, setIdEmpresa] = useState(
    localStorage.getItem("id_empresa")
  );
  const [usuarios_empresa, setUsuariosEmpresa] = useState([]);

  const handleCpfCnpjChange = (event) => {
    // Get only the numbers from the data input
    let data = event.target.value.replace(/\D/g, "");
    // Checking data length to define if it is cpf or cnpj
    if (data.length > 11) {
      // It's cnpj
      let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
        5,
        3
      )}/`;
      if (data.length > 12)
        cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
      else cnpj += data.substr(8);
      // Pass formatting for the data
      data = cnpj;
    } else {
      // It's cpf
      let cpf = "";
      let parts = Math.ceil(data.length / 3);
      for (let i = 0; i < parts; i++) {
        if (i === 3) {
          cpf += `-${data.substr(i * 3)}`;
          break;
        }
        cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
      }
      // Pass formatting for the data
      data = cpf;
    }
    // Update state
    setCpf(data);
  };

  const handleEditar = (id, nome, usuario, cpf) => {};

  const handleExcluir = (id, nome) => {
    swal({
      title: "Você tem certeza?",
      text: `Deseja excluir o usuário ${nome}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete(`usuarios/${id}`).then((res) => {
          swal("Sucesso", "Usuário excluido com sucesso", "success");
        });
      } else {
        swal("Cancelado", "Usuário não excluido", "error");
      }
    });
  };

  const handleCadastrar = (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      id_empresa: id_empresa,
    };

    Api.post("usuarios/cadastrar", data).then(
      (res) => {
        swal("Usuário cadastrado com sucesso!");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    Api.get(`usuarios/empresa/${id_empresa}`).then((res) => {
      setUsuariosEmpresa(res.data);
    });
  }, [Api]);

  return (
    <>
      <div className="view-cadastrar-usuario">
        <Header />
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={3}>
            <LeftHeader />
          </Grid>
          <Grid
            item
            xs={9}
            paddingTop={8}
            className="grid-direita"
            style={{ paddingTop: "60px" }}
          >
            <div className="titulo">Controle de usuários</div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Cpf</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios_empresa.map((usuario, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{usuario.nome}</TableCell>
                      <TableCell align="left">{usuario.email}</TableCell>
                      <TableCell align="left">{usuario.cpf}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          type="button"
                          size="small"
                          style={{ margin: "10px" }}
                          onClick={() => {
                            setIdUsuario(usuario.id);
                            setIdEmpresa(usuario.id_empresa);
                            setNome(usuario.nome);
                            setEmail(usuario.usuario);
                            setCpf(usuario.cpf);
                            setEditando(true);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          type="button"
                          color="error"
                          size="small"
                          onClick={() => {
                            handleExcluir(usuario.id, usuario.nome);
                          }}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="titulo">Cadastro/Edição</div>

            {editando ? (
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  setEditando(false);
                  setIdUsuario(null);
                  setNome("");
                  setEmail("");
                  setSenha("");
                  setCpf("");
                }}
                className="btn-cadastrar"
                style={{ margin: "10px" }}
              >
                Limpar
              </Button>
            ) : (
              ""
            )}

            <form onSubmit={handleCadastrar}>
              <TextField
                className="inputs"
                id="nome"
                type="nome"
                name="nome"
                value={nome}
                label="Nome"
                variant="standard"
                fullWidth={true}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              />
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
                name="cpf"
                type="text"
                value={cpf}
                label="CPF/CNPJ"
                variant="standard"
                fullWidth={true}
                onChange={(e) => {
                  handleCpfCnpjChange(e);
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

              <div className="botao">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!senha || !email}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CadastrarUsuario;
