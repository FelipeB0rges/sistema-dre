import React, { useState } from "react";
import "./Home.scss";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import LeftHeader from "../LeftHeader/LeftHeader";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createRow(desc, qty, unit, price) {
  return { desc, qty, unit, price };
}


const rows = [
  createRow("Madeira", "Materiais", "Receita",100),
  createRow("Telhas", "Materiais", "Despesa",30),
  createRow("Cimento", "Materiais", "Despesa",10),
];

const Home = () => {
  let history = useHistory();

  return (
    <>
      <div className="view-home">
        <Header />
        <Grid
          container
          spacing={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3}>
            <LeftHeader />
          </Grid>
          <Grid item xs={9} paddingTop={0} className="grid-direita">
            <div className="direita">
              <div className="titulo">Resumo Mensal</div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell align="right">Categoria</TableCell>
                      <TableCell align="right">Tipo</TableCell>
                      <TableCell align="right">Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{`R$ ${row.price}`}</TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">R$ 60,00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
