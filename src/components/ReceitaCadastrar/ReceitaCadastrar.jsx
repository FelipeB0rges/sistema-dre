import { React, useState, useEffect } from "react";
import "./ReceitaCadastrar.scss";
import LeftHeader from "../LeftHeader/LeftHeader";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Api from "../../Api";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ReceitaCadastrar = () => {
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState(false);
  const [idReceita, setIdReceita] = useState();
  const [Receitas, setReceitas] = useState([]);
  const [TiposReceitas, setTiposReceitas] = useState([]);
  const [valor, setValor] = useState("");
  const [idTipoReceita, setIdTipoReceita] = useState();
  const [id_empresa, setIdEmpresa] = useState(
    localStorage.getItem("id_empresa")
  );

  const handleExcluir = (id, nome) => {
    swal({
      title: "Você tem certeza?",
      text: `Deseja excluir a receita? ${nome}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete(`receitas/${id}`).then((res) => {
          swal("Sucesso", "Receita excluida com sucesso", "success");
        });
      } else {
        swal("Cancelado", "Receita não excluida", "error");
      }
    });
  };

  const handleCadastrar = (event) => {
    event.preventDefault();

    const data = {
      id_empresa: id_empresa,
      id_tipo: idTipoReceita,
      nome: nome,
      valor: valor,
    };

    console.log(data)

    Api.post("receitas/cadastrar", data).then(
      (res) => {
        swal("Receita cadastrada com sucesso!");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    Api.get(`receitas/empresa/${id_empresa}`).then((res) => {
      setReceitas(res.data);
    });
    Api.get(`tipos_receitas/empresa/${id_empresa}`).then((res) => {
      setTiposReceitas(res.data);
    });
  }, [Api]);

  return (
    <>
      <div className="view-tipos-receitas">
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
            <div className="titulo">Controle de receitas</div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Tipo de receita</TableCell>
                    <TableCell align="left">Valor</TableCell>
                    <TableCell align="left">Data</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Receitas.map((receita, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{receita.nome}</TableCell>
                      <TableCell align="left">{receita.descricao}</TableCell>
                      <TableCell align="left">{receita.valor}</TableCell>
                      <TableCell align="left">{receita.data}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          type="button"
                          size="small"
                          style={{ margin: "10px" }}
                          onClick={() => {
                            setIdEmpresa(receita.id_empresa);
                            setNome(receita.nome);
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
                            handleExcluir(receita.id, receita.nome);
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
                  setIdReceita(null);
                  setNome("");
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de receita
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idTipoReceita}
                  label="Tipo de receita"
                  onChange={(event) => {
                    setIdTipoReceita(event.target.value);
                  }}
                >
                  {TiposReceitas.map((tipo, index) => (
                    <MenuItem key={index} value={tipo.id}>
                      {tipo.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                id="valor"
                type="number"
                name="valor"
                value={valor}
                label="Valor"
                variant="standard"
                fullWidth={true}
                onChange={(e) => {
                  setValor(e.target.value);
                }}
              />

              <div className="botao">
                <Button variant="contained" type="submit" disabled={!nome}>
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

export default ReceitaCadastrar;
