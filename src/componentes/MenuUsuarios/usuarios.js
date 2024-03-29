import React, { Component } from "react";
import {PrivateRoute_Doncente,PrivateRoute_Administador} from './rutasProtegidas'
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SchoolIcon from '@material-ui/icons/School';
import EventIcon from '@material-ui/icons/Event';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import PersonIcon from '@material-ui/icons/Person';
//iconos
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DescriptionIcon from "@material-ui/icons/Description";
import PaymentIcon from '@material-ui/icons/Payment';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useStyles } from "./styles";
import Menu_docentes from "../Dodentes/contenedores/menu_opciones";
import Acta_entregas from "../Administradores/administrador/acta_entregas";
import Cards from "./cards";
import Boletas from "../Administradores/boletasCalificacion/boletas";
import AuthService from "../servicios/AuthService";
import HomePagos from "../Administradores/conceptoPagos/homePago";
import Reinscripcion from "../Administradores/Reinscripciones";
import AdminReport from "../Administradores/AdminReport"
import Axios from "axios";
import {USER_ACCESS_MODULE} from './constants';


class Menus extends Component {
  constructor(props) {
    super(props);

    this.AuthService = new AuthService();
    this.logout = this.logout.bind(this);
    this.state = {
      open: false,
      statusJefeAcademico:false
    };

    this.menuItems = [
      { icon: <HomeIcon></HomeIcon>, link: "/" },
      { icon: <EventIcon></EventIcon>, link: "/inicio" },
      { icon: <DescriptionIcon></DescriptionIcon>, link: "/Docente" },
      { icon: <PaymentIcon></PaymentIcon>, link: "/pagos" },
      { icon: <SchoolIcon></SchoolIcon>, link: "/reinscripcion" },
      { icon: <PictureAsPdfIcon></PictureAsPdfIcon>, link: "/admin/report" }


    ];
  }
 
  componentDidMount(){
    Axios.get(USER_ACCESS_MODULE,{
      params:{
        nameModule:'altas/bajas'
      }
    }).then((res)=>{
      this.setState({statusJefeAcademico:res.data.status === 'active'? true:false})
    }).catch((error)=>console.log(error))
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const userType = this.AuthService.getUserAccess();
    const sections =
      userType === "Administrador"
        ? ["Inicio", "Administrador", , "Pagos","Materias(Bajas/Altas)","Reportes"]
        : userType === "administradorse"
        ? ["Inicio", "Administrador", , "Pagos",,"Reportes"]
        : userType === "Gestión Escolar"
        ? ["Inicio", "Administrador", , "Pagos","Materias(Bajas/Altas)","Reportes"]
        : userType === "Docente"? ["Inicio", ,"Docente"]:(userType === "Jefe académico" && this.state.statusJefeAcademico)? ["Inicio",,,, "Reinscripcion","Reportes"]: ["Inicio",,,,,"Reportes"];

    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            style={{ background: "#3f51b5" }}
            position="fixed"
            size="small"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar variant="dense">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap></Typography>
              </div>
              <Chip
                style={{ color: "white" }}
                label={userType}
                color="primary"
                size="small"
                icon={<PersonIcon />}
              />
              <IconButton
                title="cerrar la sesión"
                onClick={this.logout}
                style={{ color: "white" }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {sections.map((text, index) => (
                <Link
                  to={this.menuItems[index].link}
                  style={{ textDecoration: "none" }}
                  key={text + "_link"}
                >
                  <ListItem button key={text}>
                    <ListItemIcon>{this.menuItems[index].icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route
                exact
                path="/"
                render={(routeProps) => <Cards {...routeProps} />}
              />
            <Route exact
                path="/reinscripcion"
                render={(routeProps) => <Reinscripcion {...routeProps} />}
              />
              <Route exact
                path="/admin/report"
                render={(routeProps) => <AdminReport {...routeProps} />}
              />
              <PrivateRoute_Doncente
                exact
                path="/Docente"
                component={Menu_docentes}/>
              <PrivateRoute_Administador
                exact
                path="/inicio"
                component={Acta_entregas}/>
              <PrivateRoute_Administador
                exact
                path="/boletas"
                component={Boletas}
                  />
              <PrivateRoute_Administador
                exact
                path="/Pagos"
                component={HomePagos}/>
              <Redirect from="*" to="/" />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  logout() {
    this.props.resetear();
    this.AuthService.logout();
    this.props.onAuthChange();
  }
}

export default withStyles(useStyles, { withTheme: true })(Menus);



