import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ValidarCriterios from './validarCriterios';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
 



function MenuCriterios({open,handleClose }){

    function _handleClose(){
        handleClose()
    }


return(
    <div>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={_handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Defina los criterios primero!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        Ejemplo: C1=20 C2=30 C3=10 C4=40
        De preferencia no utilice, 
        Ejemplo: C1=25 C2=35 C3=10 C4=40

          <ValidarCriterios/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={_handleClose} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}

export default React.memo(MenuCriterios);