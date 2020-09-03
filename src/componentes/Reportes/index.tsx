import React from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core/";
import TypeList from "./TypeList";

export default function Prelist() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed style={{ height: "80vh" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
          LISTAS DE ASISTENCIA
          </Grid>
          <TypeList />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
