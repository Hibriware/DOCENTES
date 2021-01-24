import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

export const ChipCriterios = React.memo((data) => {
    console.log('memo chipCriterios')
    const {ccx1, ccx2, ccx3, ccx4, c1, c2, c3, c4} = data
    return (
        <div>
            <Chip size="small" avatar={<Avatar>{ccx1}</Avatar>} label={c1} color="secondary"/>
            <Chip size="small" avatar={<Avatar>{ccx2}</Avatar>} label={c2} color="secondary"/>
            <Chip size="small" avatar={<Avatar>{ccx3}</Avatar>} label={c3} color="secondary"/>
            <Chip size="small" avatar={<Avatar>{ccx4}</Avatar>} label={c4} color="secondary"/>
        </div>
    );
})
