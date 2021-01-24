import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Docente_principal from './docente_principal/vista_principal';
import Docente_calendario from './docente_calendario/docente_calendario';
import Tabla_calificaciones from './docente_calificaciones/tabla_calificaciones';
import Grid from '@material-ui/core/Grid';

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

}));

const TabsWrappedLabel = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{background: '#fafafa', color: '#000'}}>
                <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab
                        value="one"
                        label="Principal"
                        wrapped
                        {...a11yProps('one')}
                    />
                    <Tab value="two" label="Calendario" {...a11yProps('two')} />
                    <Tab value="three" label="Calificaciones" {...a11yProps('three')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <Grid item xs={12}>
                    <Docente_principal/>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index="two">
                <Docente_calendario/>
            </TabPanel>
            <TabPanel value={value} index="three">
                <Tabla_calificaciones/>
            </TabPanel>
        </div>
    );
}


export default TabsWrappedLabel;
