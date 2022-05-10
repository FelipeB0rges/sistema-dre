import { React, useState, useEffect } from "react";
import "./TiposReceitas.scss";
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

const TiposReceitas = () => {
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(false);
  const [idTipoReceita, setIdTipoReceita] = useState();
  const [TiposReceitas, setTiposReceitas] = useState([]);
  const [id_empresa, setIdEmpresa] = useState(
    localStorage.getItem("id_empresa")
  );

  const handleExcluir = (id, descricao) => {
    swal({
      title: "Você tem certeza?",
      text: `Deseja excluir o tipo de receita ${descricao}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete(`tipos_receitas/${id}`).then((res) => {
          swal("Sucesso", "Tipo de receita excluida com sucesso", "success");
        });
      } else {
        swal("Cancelado", "Tipo de receita não excluida", "error");
      }
    });
  };

  const handleCadastrar = (event) => {
    event.preventDefault();

    const data = {
      descricao: descricao,
      id_empresa: id_empresa,
    };

    Api.post("tipos_receitas/cadastrar", data).then(
      (res) => {
        swal("Tipo de receita cadastrada com sucesso!");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
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
            <div className="titulo">Controle de tipos de receitas</div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Descrição</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TiposReceitas.map((tipo_receita, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{tipo_receita.descricao}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          type="button"
                          size="small"
                          style={{ margin: "10px" }}
                          onClick={() => {
                            setIdEmpresa(tipo_receita.id_empresa);
                            setDescricao(tipo_receita.descricao);
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
                            handleExcluir(tipo_receita.id, tipo_receita.descricao);
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
                  setIdTipoReceita(null);
                  setDescricao("");
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
                id="descricao"
                type="descricao"
                name="descricao"
                value={descricao}
                label="Descricao"
                variant="standard"
                fullWidth={true}
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              />

              <div className="botao">
                <Button variant="contained" type="submit" disabled={!descricao}>
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

export default TiposReceitas;
