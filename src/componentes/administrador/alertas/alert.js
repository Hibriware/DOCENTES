import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

export const Alertas = (data) => {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClick = (Transition) => () => {
        setTransition(() => Transition);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                message="I love snacks"
            />
        </div>
    )


}