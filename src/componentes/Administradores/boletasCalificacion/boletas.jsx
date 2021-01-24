import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuBoletas from './pestanas';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function BoletasMain() {
const [loader, setLoader] = React.useState(false)

  const classes = useStyles();
    return(
        <React.Fragment>
          	<Backdrop className={classes.backdrop} open={loader}>
				<CircularProgress color="inherit" />
        <h2>Espere...</h2>
			</Backdrop>
        <CssBaseline />
        <Container fixed>
          <MenuBoletas setLoader={setLoader}/>
        </Container>
      </React.Fragment>
    )
}

export default BoletasMain;
