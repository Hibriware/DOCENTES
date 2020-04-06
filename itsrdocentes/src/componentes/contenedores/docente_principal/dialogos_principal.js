import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        
      },
  
    },
    pdfss:{
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    avatar: {
      display: 'flex',
      justifyContent: 'space-evenly',
      '& > *': {
        margin: theme.spacing(1),
        
      }},
    }));
  