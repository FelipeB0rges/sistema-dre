import { React, useState, useEffect } from "react";
import "./Relatorios.scss";
import LeftHeader from "../LeftHeader/LeftHeader";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Api from "../../Api";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import moment from "moment";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Relatorios = () => {
  const [Relatorios, setRelatorios] = useState([]);
  const [idRelatorio, setIdRelatorio] = useState();
  const [dataInicio, setDataInicio] = useState(moment());
  const [dataFim, setDataFim] = useState(moment());
  const [RelatoriosCampos, setRelatoriosCampos] = useState([]);
  const [RelatorioResultados, setRelatorioResultados] = useState([]);
  const [RelatorioDescricao, setRelatorioDescricao] = useState([]);
  const [DinamicosSelecionados, setDinamicosSelecionados] = useState([]);
  const [Dinamicos, setDinamicos] = useState([]);
  const [id_empresa, setIdEmpresa] = useState(
    localStorage.getItem("id_empresa")
  );

  const handleGerar = (event) => {
    event.preventDefault();

    const data = {
      id_relatorio: `${idRelatorio}`,
      id_empresa: id_empresa,
      data_inicio: idRelatorio == 1 || idRelatorio == 2 ? null : dataInicio,
      data_fim: idRelatorio == 1 || idRelatorio == 2 ? null : dataFim,
    };

    Api.post("relatorios/gerar", data).then(
      (res) => {
        console.log(res);
        res = res.data;

        if (res.length == 0) {
          swal("Aten????o", "Nenhum resultado encontrado", "warning");
        }

        setRelatorioResultados(res.map((obj) => Object.values(obj)));
        setRelatoriosCampos(Object.keys(res[0]));
        setRelatorioDescricao(res.map((obj) => obj.descricao));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  function RelatoriosDinamicos(id) {
    if (id == 4) {
      Api.post(`relatorios/despesas`, { id_empresa: id_empresa }).then(
        (res) => {
          setDinamicos(res.data);
          console.log(res);
        }
      );
    }
  }

  useEffect(() => {
    Api.get(`relatorios`).then((res) => {
      console.log(res.data);
      setRelatorios(res.data);
    });
  }, [Api]);

  return (
    <>
      <div className="view-relatorios">
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
            <div className="titulo">Relat??rios</div>
            <form onSubmit={handleGerar}>
              <FormControl fullWidth style={{ margin: "25px 0" }}>
                <InputLabel id="demo-simple-select-label">Relat??rio</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idRelatorio}
                  label="Tipo de receita"
                  onChange={(event) => {
                    setIdRelatorio(event.target.value);
                    RelatoriosDinamicos(event.target.value);
                  }}
                >
                  {Relatorios.map((relatorio, index) => (
                    <MenuItem key={index} value={relatorio.id}>
                      {relatorio.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data inicial"
                  value={dataInicio}
                  onChange={(dataInicio) => {
                    setDataInicio(dataInicio);
                  }}
                  style={{ margin: "15px 0" }}
                  disabled={
                    idRelatorio == 1 || idRelatorio == 2 || !idRelatorio
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data final"
                  value={dataFim}
                  onChange={(dataFim) => {
                    setDataFim(dataFim);
                    console.log(dataFim);
                  }}
                  style={{ margin: "15px 0" }}
                  disabled={
                    idRelatorio == 1 || idRelatorio == 2 || !idRelatorio
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              {(idRelatorio == 3 || idRelatorio == 4 && Dinamicos.length>1) && (
                <FormGroup>
                  {Dinamicos.map((dinamico, index) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={dinamico.descricao}
                      key={index}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setDinamicosSelecionados([
                            ...DinamicosSelecionados,
                            dinamico.id,
                          ]);
                        } else {
                          setDinamicosSelecionados(
                            DinamicosSelecionados.filter(
                              (id) => id != dinamico.id
                            )
                          );
                        }
                        console.log(DinamicosSelecionados)
                      }
                      }
                    />
                  ))}
                </FormGroup>
              )}

              <div className="botao">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!idRelatorio}
                >
                  Buscar
                </Button>
              </div>
            </form>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    {RelatoriosCampos.map((campo, index) => (
                      <TableCell key={index}>{campo}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {RelatorioResultados.map((relatorio, index) => (
                    <TableRow key={index}>
                      {relatorio.map((resultado, index) => (
                        <TableCell key={index}>{resultado}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Relatorios;
