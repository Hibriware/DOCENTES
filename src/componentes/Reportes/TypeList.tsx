import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  Grid,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core/";
import ListTeacher from "./ListTeacher";
import ListPeriodo from "./Periodo";
import ListSubjects from "./listSubject";
import { informacionPdf } from "./reportList";
import { allInformacionPdf } from "./reportList/listAll";




interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 324,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function TypeList() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Materias" {...a11yProps(0)} />
        <Tab label="Docentes" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Materias />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Docentes />
      </TabPanel>
    </div>
  );
}

function Materias() {
  const classes = useStyles();
  const [idPersonal, setIdPersonal] = React.useState(0);
  const [idPeriodo, setIdPeriodo] = React.useState([]);
  const [idMateriaD, setIdMateriaD] = React.useState(0);
  const [infoTeacher, setInfoTeacher] = React.useState<any>([]);
  const [active, setActive] = React.useState(false);

  const download = async () => {
    if (idMateriaD != 0) {
      setActive(true)
      await informacionPdf(idMateriaD, infoTeacher, idPeriodo);
      setActive(false)
    }
  };

  return (
    <React.Fragment>
            <Backdrop className={classes.backdrop} open={active} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ListTeacher
              setIdPersonal={setIdPersonal}
              idPersonal={idPersonal}
              setInfoTeacher={setInfoTeacher}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListPeriodo idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListSubjects
              idPersonal={idPersonal}
              idPeriodo={idPeriodo}
              idMateriaD={idMateriaD}
              setIdMateriaD={setIdMateriaD}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button size="small" disabled={active} variant="contained" color="primary" onClick={download}>
              Descargar lista
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

function Docentes() {
  const classes = useStyles();
  const [idPersonal, setIdPersonal] = React.useState(0);
  const [infoTeacher, setInfoTeacher] = React.useState<any>([]);
  const [idPeriodo, setIdPeriodo] = React.useState([]);
  const [active, setActive] = React.useState(false);


  const allDownload = async()=>{
    if(idPeriodo && infoTeacher){
      setActive(true)
      await allInformacionPdf(infoTeacher,idPeriodo)
      setActive(false)
    }else{
      alert("Seleccione un periodo o docente ")
    }
  };

  return (
    <React.Fragment>
         <Backdrop className={classes.backdrop} open={active} >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <ListTeacher
              setIdPersonal={setIdPersonal}
              idPersonal={idPersonal}
              setInfoTeacher={setInfoTeacher}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <ListPeriodo idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo} />
        </Grid>
        <Grid item xs={6} sm={3}>
        <Button disabled={active} size="small"  variant="contained" color="primary" onClick={allDownload}>
              Descargar listas
            </Button>
        </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}

export default TypeList;
