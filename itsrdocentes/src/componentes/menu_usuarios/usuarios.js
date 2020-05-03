import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom';

//iconos
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import {useStyles} from './styles';
import Menu_docentes from '../contenedores/menu_opciones';
import Acta_entregas from '../administrador/acta_entregas'

class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
        open:false
     };
    //this.AuthService=new AuthService();
    //this.logout=this.logout.bind(this);
    this.menuItems=[
      {icon:<HomeIcon></HomeIcon>,link:'/'},
      {icon:<DescriptionIcon></DescriptionIcon>,link:'/docentes'}    
    ];
  }
  
  render(){
  const {classes}=this.props;
  const{open}=this.state;

 // const userType=this.AuthService.getUserAccess();
  const userType='Administrador';
console.log(userType + " menus disponibles para vos")
  // const sections=(userType==='Administrador')?['Inicio','Monitoreo','Catalogo Personal','Reportes','Accesos']:
  //                 (userType==='Guardia')?['Inicio','Reporte observaciones']:['Inicio','Reportes','Monitoreo'];
  const sections=(userType==='Administrador')?['Inicio','Docentes']:
  (userType==='Docentes')?[,'Docentes']:['Inicio'];



  return (<Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{background:'#3f51b5'}}
        position="fixed"
        size="small"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
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
          <div style={{flexGrow:1}}>
          <Typography variant="h6" noWrap>
            
          </Typography>
          </div>
          <IconButton  style={{color:'white'}}>
            <ExitToAppIcon/> 
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
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider />
        <List>
        {sections.map((text,index)=>
                        (
                            <Link to={this.menuItems[index].link} style={{textDecoration:'none'}} key={text +'_link'}>
                                <ListItem button key={text}>
                                    <ListItemIcon>{this.menuItems[index].icon}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            </Link>
                        )
                    )}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
                  <Route path='/' exact render={routeProps=><Acta_entregas {...routeProps} />}></Route>
                 { /*<Route path='/monitoreo' exact render={routeProps=><Monitoreo{...routeProps} propname={'m'}/>}></Route>
                  <Route path='/catalogoPersonal' exact render={routeProps=><CatalogoPersonal{...routeProps} propname={'cp'}/>}></Route>
                  <Route path='/catalogoUsuario' exact render={routeProps=><CatalogoUsuario{...routeProps} propname={'cu'}/>}></Route>
                  <Route path='/guardiasObservaciones' exact render={routeProps=><GuardiasObservaciones{...routeProps} propname={'go'}/>}></Route>
                  <Route path='/reporte_monitoreo' exact render={routeProps=><Reporte_m{...routeProps} propname={'g'}/>}></Route>
                        <Route path='/reporte_personal' exact render={routeProps=><Reporte_p{...routeProps} propname={'o'}/>}></Route>*/}  
                  <Route path='/docentes' exact render={routeProps=><Menu_docentes{...routeProps} propname={'o'}/>}></Route>  
                  <Redirect from="*" to="/"/>
              </Switch>
      </main>
    </div>
    </Router>
  );
}

handleDrawerOpen = () => {
  this.setState({open:true});
};
handleDrawerClose = () => {
  this.setState({open:false});
};
logout(){
  this.AuthService.logout();
  this.props.onAuthChange();
}
}

export default withStyles(useStyles,{withTheme:true})(Menu);
