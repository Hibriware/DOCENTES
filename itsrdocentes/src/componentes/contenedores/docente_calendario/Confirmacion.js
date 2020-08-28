import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';



export const Confirmacion = (data) => {
    const [open, setOpen] = React.useState({open:false,isDisable:false});

    useEffect(() => {
        setOpen({...open, open:data.open})
    },[data.open])

    const _GuardarTemas = async (e) => {
        e.preventDefault()
        setOpen({...open, isDisable:true})
       await data.onGuardar()
        setOpen({...open, isDisable:false,open:false})

    }

    const _handleClose = () => {
        data.close()
    }

    return (
        <div>
            <Dialog open={open.open} onClose={_handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Nota...</DialogTitle>
                <DialogContent>
                 <DialogContentText>
                    Confirme que las fechas seleccionadas
                    son las correctas para las evaluaciones formativas.
                    No podrá hacer cambios.
                 </DialogContentText>
               </DialogContent>
                <DialogActions>
                  <Button onClick={_handleClose} color="primary">
                     Cancelar
                  </Button>
                    <Button disabled={open.isDisable} onClick={_GuardarTemas} color="primary">
                       Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
} 