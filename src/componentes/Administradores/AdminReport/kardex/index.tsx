import React from 'react';
import Loader from "../../../Loading";
import {PeriodoActivoContex} from '../../../../Context/PeriodoActivo/ContexPeriodoActivo';
import KardexInput from "./conponents/KardexInput";
import KardexButton from "./conponents/KardexButton";
import {descargarCardex} from '../kardex/pdf/cardex';

const KardexIndex = () => {
    const {periodo} = React.useContext(PeriodoActivoContex);
    const [control, setControl] = React.useState<any>('');
    const [isLoader, setLoader] = React.useState(false);
    const descargar = async (control: string, periodo: number) => {
        setLoader(true);
        await descargarCardex(periodo, control);
        setLoader(false);
    }

    const handlChange = (evt: any) => {
        setControl({
            ...control,
            control: evt.target.value
        })
    }
    return (
        <>
            <Loader open={isLoader} message={"Espere..."}/>
            <KardexInput onChange={handlChange}/>
            <KardexButton onDowloade={descargar} control={control?.control} periodo={periodo?.periodo}/>
        </>
    )
}

export default KardexIndex;
