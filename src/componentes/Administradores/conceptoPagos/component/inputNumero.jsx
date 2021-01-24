import React from 'react';
import PropTypes from 'prop-types';
//import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

/*function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}*/

/*TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};*/

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

 function FormattedInputs({_handlenChange, costo}) {
  const classes = useStyles();
  /*const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    costo: '',
  });*/

  const handleChange = (event) => {
    _handlenChange(event)
    //setValues({
      //...values,
      //[event.target.name]: event.target.value,
    //});
  };

  return (
    <div className={classes.root}>
      <TextField
        label="$Costo"
        value={costo}
        onChange={handleChange}
        name="costo"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );


}

export default FormattedInputs;
