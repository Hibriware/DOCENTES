import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {getListaPeriodo} from "../../../servicios/api";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2)
        //minWidth: 200,
    },

}));

function Peridos({periodos, setPeriodos}) {
    const classes = useStyles();
    const [listaPeriodo, setListaPeriodo] = React.useState([]);

    useEffect(() => {
        const data = async () => {
            let periodo = await getListaPeriodo();
            setListaPeriodo(periodo);
        };
        data();
    }, []);

    return (
        <FormControl size="small" fullWidth variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Periodo</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={periodos}
                onChange={(evt) => setPeriodos(evt.target.value)}
                label="Periodo"
            >
                {listaPeriodo.map((_periodo, i) => (
                    <MenuItem key={i} value={_periodo.idnomenclaturaPeriodo}>
                        {_periodo.rango}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Peridos;
