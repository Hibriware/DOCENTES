import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
    formControl: {
      display: 'flex',
      margin: theme.spacing(0),
      minWidth: 180,
      marginBottom:'-3%',
    },
    selectEmpty: {
      marginTop: theme.spacing(-1),
    },
    papermaterias: {
      padding: theme.spacing(-1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperperiodos: {
      padding: theme.spacing(-2),
      textAlign: 'left',
      color: theme.palette.text.primary,
      fontSize:'small'
    },backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paperAvatar:{
      textAlign:'center'
    },
   td:{
     padding:'0px !important',
   }
  }));