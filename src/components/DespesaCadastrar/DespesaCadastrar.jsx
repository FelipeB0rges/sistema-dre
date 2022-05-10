import { React, useState, useEffect } from "react";
import "./DespesaCadastrar.scss";
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

const DespesaCadastrar = () => {
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState(false);
  const [idDespesa, setIdDespesa] = useState();
  const [Despesas, setDespesas] = useState([]);
  const [TiposDespesas, setTiposDespesas] = useState([]);
  const [valor, setValor] = useState("");
  const [idTipoDespesa, setIdTipoDespesa] = useState();
  const [id_empresa, setIdEmpresa] = useState(
    localStorage.getItem("id_empresa")
  );

  const handleExcluir = (id, nome) => {
    swal({
      title: "Você tem certeza?",
      text: `Deseja excluir a despesa? ${nome}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete(`despesas/${id}`).then((res) => {
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
      id_tipo: idTipoDespesa,
      nome: nome,
      valor: valor,
    };

    console.log(data)

    Api.post("despesas/cadastrar", data).then(
      (res) => {
        swal("Receita cadastrada com sucesso!");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    Api.get(`despesas/empresa/${id_empresa}`).then((res) => {
      setDespesas(res.data);
    });
    Api.get(`tipos_despesas/empresa/${id_empresa}`).then((res) => {
      setTiposDespesas(res.data);
    });
  }, [Api]);

  return (
    <>
      <div className="view-tipos-despesas">
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
            <div className="titulo">Controle de despesas</div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Tipo de despesa</TableCell>
                    <TableCell align="left">Valor</TableCell>
                    <TableCell align="left">Data</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Despesas.map((despesa, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{despesa.nome}</TableCell>
                      <TableCell align="left">{despesa.descricao}</TableCell>
                      <TableCell align="left">{despesa.valor}</TableCell>
                      <TableCell align="left">{despesa.data}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          type="button"
                          size="small"
                          style={{ margin: "10px" }}
                          onClick={() => {
                            setIdEmpresa(despesa.id_empresa);
                            setNome(despesa.nome);
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
                            handleExcluir(despesa.id, despesa.nome);
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
                  setIdDespesa(null);
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
                  Tipo de despesa
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idTipoDespesa}
                  label="Tipo de despesa"
                  onChange={(event) => {
                    setIdTipoDespesa(event.target.value);
                  }}
                >
                  {TiposDespesas.map((tipo, index) => (
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

export default DespesaCadastrar;
