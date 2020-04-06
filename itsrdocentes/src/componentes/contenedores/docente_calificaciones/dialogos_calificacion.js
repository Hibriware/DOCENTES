import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
    formControl: {
      display: 'flex',
      margin: theme.spacing(1),
      minWidth: 180,
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
    },
  }));