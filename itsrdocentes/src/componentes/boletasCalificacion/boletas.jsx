import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuBoletas from './pestanas';

function BoletasMain() {
    return(
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <MenuBoletas/>
        </Container>
      </React.Fragment>
    )
}

export default BoletasMain;