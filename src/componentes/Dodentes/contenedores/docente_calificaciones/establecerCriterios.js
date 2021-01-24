import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ValidarCriterios from './validarCriterios';
import LoaderCriterios from './reportes/cargando';
import {EnviarCriterios} from './cont_criterios';
import {PeriodoMateriasContext} from "../../../../Context/PeriodoMateria/ContextPeriodosMateria";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function MenuCriterios({open,handleClose,updates }){
  const [statePeriodoMateria] = useContext(PeriodoMateriasContext);

  const[isBtn,setIsBtn]=React.useState(true);
  const [openLoad, setOpenLoad] = React.useState(false);
  const[isComfirmar,setIsComfirmar]=React.useState(false);
  const [TODOS_LOS_CRITERIOS,setTodo_los_criterios] =React.useState({
    c1:'',
    c2:'',
    c3:'',
    c4:''
  })

    function _handleClose(){
        handleClose()
    }

  async  function buttonAceptar() {
  handleClose()
    setOpenLoad(true)
  await gurardarcriterios();

    }

async function gurardarcriterios() {
    const PERIODO = statePeriodoMateria?.data[0].periodo;
  await EnviarCriterios(1, TODOS_LOS_CRITERIOS.c1, "sin descripcion",PERIODO );
  await EnviarCriterios(2, TODOS_LOS_CRITERIOS.c2, "sin descripcion",PERIODO );
  await EnviarCriterios(3, TODOS_LOS_CRITERIOS.c3, "sin descripcion",PERIODO );
  await EnviarCriterios(4, TODOS_LOS_CRITERIOS.c4, "sin descripcion",PERIODO, updates);
  setIsComfirmar(!isComfirmar)
  setOpenLoad(false)
}
return(
    <div>
      <LoaderCriterios openLoad={openLoad} />
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
        </DialogContentText>
        <ValidarCriterios setIsBtn={setIsBtn} isBtn={isBtn} setTodo_los_criterios ={setTodo_los_criterios} TODOS_LOS_CRITERIOS={TODOS_LOS_CRITERIOS} isComfirmar={isComfirmar}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleClose} color="primary">
          Cancelar
        </Button>
        <Button disabled={isBtn} onClick={buttonAceptar}   color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}

export default React.memo(MenuCriterios);
