import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {format, isAfter, isBefore} from 'date-fns';
import MaterialTable from 'material-table';
import {
  Avatar,
  Button,
  createStyles,
  Grid,
  Hidden,
  ButtonGroup,
  Paper,
  TextField,
  Theme,
  Typography, Container,Chip,Backdrop ,CircularProgress 
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import BuscarAlumno from './BuscarAlumno';
import {
  AvailableSubject,
  CourseType,
  ReenrollmentResult,
  Student,
  StudiedSubjects,
  Subject
} from './interfaces';
import {
  AVAILABLE_SUBJECTS_URL,
  COURSED_SUBJECTS_URL, 
  REENROLLMENT_URL
} from './constants/end-points';
import {isTimeCrossings} from './utils/reenrollment-filters';
import {useStudent} from './providers/StudentProvider';
import DialogoListaMaterias from './ListaMaterias';
import BajaTemporal from './BajaTemporal/index';
import BajaPermanente from './BajaPermanente';



type AvailableCareer = {
  careerID: number;
  startDate: string;
  endDate: string;
  period: number;
  studyPlanID: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    avatarLarge: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    mt: {
      marginTop: theme.spacing(1),
    },backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
  }),
);

const TimeField: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()))
    return () => {
      clearInterval(interval);
    }
  }, []);

  const currentTime = useMemo(() => {
    return date;
  }, [date]);

  return (
    <TextField
      id='time'
      fullWidth
      label='Hora'
      value={format(currentTime, 'pp')}
      InputProps={{
        readOnly: true,
      }}
      variant="outlined"
    />
  )
}

const ReEnrollmentPage: React.FC = () => {
  const classes = useStyles();
  const {student} = useStudent();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrolledSubjectsOnPeriod, setEnrolledSubjectsOnPeriod] = useState<any[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<AvailableSubject[]>([]);
  const [studiedSubjects, setStudiedSubjects] = useState<StudiedSubjects[]>([]);//listo
  const [selectedSubjects, setSelectedSubjects] = useState<AvailableSubject[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTwoEspecialSubjects, setIsTwoEspecialSubjects] = useState(false);
  const [creditsInfo, setCreditsInfo] = useState({min: 20, max: 36});
  const [periodos, setPeriodos] = useState('');
  const [BuscaNumeroControl, setBuscarNumeroControl] = useState('');
  const [cargarAcademica, setCargaAcademica] = useState<AvailableSubject[]>([]);
  const [materiasSeleccionada, setMateriasSeleccionada] = useState<AvailableSubject[] | any>([]);
  const [hoursCruse,setHoursCruse] = useState(false);
  const[isLoaders,setLoaders] = useState(false)


  const updatedStudent = useMemo<Student | null>(() => {
    return student;
  }, [student]);

  useEffect(() => {
    if (student?.folio) {
      axios.get(`${COURSED_SUBJECTS_URL}/${student?.folio}`).then(res => {
        setStudiedSubjects(res.data?.subjectsStudied || []);
      }).catch(() => {
        // TODO: Handle error messsage
      });
    }
  }, [student]);

  const fetchAvailableSubjects = useCallback(() => {
    setLoading(true);
    setSubjects([])
    axios.get(AVAILABLE_SUBJECTS_URL, {
      params: {
        folio: student?.folio,
        period: periodos,
      }
    }).then(value => {
      setSubjects(value.data)
    })
      .finally(() => setLoading(false));
  }, [student, setLoading]);


  useEffect(() => {

    fetchAvailableSubjects();

  }, [fetchAvailableSubjects]);

  const handleDatesWithTime = (time: string) => {
    if (!time) {
      return null;
    }
    const hour = +time.substring(0, 2) || 0;
    const minutes = +time.substring(3, 5) || 0;
    const seconds = +time.substring(6, 8) || 0;
    return new Date(0, 0, 0, hour, minutes, seconds);
  }

  const handleStartTime = (currentTime: string, newTime: string) => {
    const parsedCurrentTime = handleDatesWithTime(currentTime);
    const parsedNextTime = handleDatesWithTime(newTime);
    if (parsedCurrentTime && parsedNextTime) {
      if (isAfter(parsedCurrentTime, parsedNextTime)) {
        return newTime.substring(0, 5);
      }
      return currentTime.substring(0, 5);
    } else {
      return newTime.substring(0, 5);
    }
  }

  const handleEndTime = (currentTime: string, newTime: string) => {
    const parsedCurrentTime = handleDatesWithTime(currentTime);
    const parsedNextTime = handleDatesWithTime(newTime);
    if (parsedCurrentTime && parsedNextTime) {
      if (isBefore(parsedCurrentTime, parsedNextTime)) {
        return newTime.substring(0, 5);
      }
      return currentTime.substring(0, 5);
    } else {
      return newTime.substring(0, 5);
    }
  }

  useEffect(() => {
    const teacherAssignment = subjects.filter((subject: any, index: number, self: any[]) => {
      return self.map((selfItem: any) => selfItem.materiaDocente_id).indexOf(subject.materiaDocente_id) === index;
    }).map((assigment: any) => assigment.materiaDocente_id);

    teacherAssignment.forEach((assignment: any) => {
      let availableSubject: any = {};
      subjects.filter((subject: any) => subject.materiaDocente_id === assignment).forEach((subject: any) => {
        availableSubject = {...availableSubject, subject}
        switch (subject.dia) {
          case 'Lun':
            availableSubject.monday = {
              startTime: handleStartTime(availableSubject?.monday?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.monday?.endTime, subject.horaFinal),
            }
            break;
          case 'Mar':
            availableSubject.tuesday = {
              startTime: handleStartTime(availableSubject?.tuesday?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.tuesday?.endTime, subject.horaFinal),
            }
            break;
          case 'Mie':
            availableSubject.wednesday = {
              startTime: handleStartTime(availableSubject?.wednesday?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.wednesday?.endTime, subject.horaFinal),
            }
            break;
          case 'Jue':
            availableSubject.thursdays = {
              startTime: handleStartTime(availableSubject?.thursdays?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.thursdays?.endTime, subject.horaFinal),
            }
            break;
          case 'Vie':
            availableSubject.friday = {
              startTime: handleStartTime(availableSubject?.friday?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.friday?.endTime, subject.horaFinal),
            }
            break;
          case 'Sab':
            availableSubject.saturday = {
              startTime: handleStartTime(availableSubject?.saturday?.startTime, subject.horaInicio),
              endTime: handleEndTime(availableSubject?.saturday?.endTime, subject.horaFinal),
            }
            break;
        }
      });

      setAvailableSubjects((prevState: any[]) => {
        return [...prevState, availableSubject]
      })
    });
  }, [subjects]);


  const filteredSubjects = useMemo<AvailableSubject[]>(() => {
    return availableSubjects.filter(({subject}) => {
        return !studiedSubjects.some(studiedSubject => {
          return (studiedSubject.clave === subject.clave) &&
            (+studiedSubject.promedio >= 70)
        })
      }
    ).map(availableSubject => {
      let courseType = CourseType.Ordinary;

      const sortedStudiedSubjects = studiedSubjects
        .filter(subject => subject.clave === availableSubject.subject.clave)
        .sort((a, b) => {
          if (a.periodo > b.periodo) {
            return -1
          }
          return 1
        });

      if (sortedStudiedSubjects.length > 0) {
        const latestStudiedSubject = sortedStudiedSubjects[0];
        switch (latestStudiedSubject.tipo_curso) {
          case CourseType.Ordinary:
            courseType = CourseType.Repeat
            break;
          case CourseType.Repeat:
            courseType = CourseType.Especial;
            break;
          default:
            // TODO: quest about this
            courseType = CourseType.Ordinary;
            break;
        }
      }

      let checked = false;
      const currentSubjectIsSelected = selectedSubjects.some(value =>
        value.subject.materiaDocente_id === availableSubject.subject.materiaDocente_id);
      if (isTwoEspecialSubjects) {
        if (currentSubjectIsSelected) {
          if (courseType === CourseType.Especial) {
            checked = true;
          }
        }
      } else if (currentSubjectIsSelected) {
        checked = true;
      }
      if (!checked && enrolledSubjectsOnPeriod.length) {
        checked = enrolledSubjectsOnPeriod
          .some(enrolledSubject => enrolledSubject.materiadocente_id === availableSubject.subject.materiaDocente_id);
      }

      return {
        ...availableSubject,
        subject: {
          ...availableSubject.subject,
          tipo_curso: courseType,
        },
        tableData: {
          checked,
        }
      }
    });
  }, [studiedSubjects, availableSubjects, enrolledSubjectsOnPeriod]);


  useEffect(() => {
    setCargaAcademica(filteredSubjects)
  }, [filteredSubjects])


  const updatedSelectedSubjects = useMemo(() => {
    if (isTwoEspecialSubjects) {
      return selectedSubjects.filter(({subject}) => subject.tipo_curso === CourseType.Especial);
    }
    return selectedSubjects;
  }, [selectedSubjects, isTwoEspecialSubjects])

  const requestedCredits = useMemo(() => {
    return updatedSelectedSubjects.reduce((previousValue, {subject}) => {
      return previousValue + (+subject.creditos);
    }, 0)
  }, [updatedSelectedSubjects]);

  const handleFinish = () => {
    setLoaders(true)
    const reenrollmentResults = selectedSubjects.map<ReenrollmentResult>(selected => {
      const {subject} = selected;
      return {
        courseType: subject.tipo_curso,
        period: +subject.periodo,
        semester: updatedStudent?.nextSemester || -1,
        studentId: updatedStudent?.folio || 0,
        teacherSubjectId: subject.materiaDocente_id,
      }
    });

    if (window.confirm('¿Estás seguro de continuar?, Todavía puedes cambiar tu selección de materias.')) {
      setLoading(true);
      axios.post(REENROLLMENT_URL, {
        reenrollmentResults,
        student: updatedStudent?.folio || undefined,
        period: periodos, //prueba pariodo
      }).then(res => alert(res.data)).catch(() => {
        setLoading(false);
      })
    }
    setLoaders(false)
  }

  // get current semester credits
  const semesterCredits = useMemo(() => {
    return filteredSubjects.filter((subject, index, self) => {
      return self.map((selfItem) => selfItem.subject.clave).indexOf(subject.subject.clave) === index;
    }).filter((({subject}) => +subject.semestreMateria === updatedStudent?.nextSemester))
      .reduce((previousValue, currentValue) => {
        return previousValue + (+currentValue.subject.creditos);
      }, 0);
  }, [filteredSubjects]);

  const disableFinishButton = useMemo(() => {
    const disableByValidationOfCredits = (requestedCredits < creditsInfo.min &&
      semesterCredits > requestedCredits) ||
      (requestedCredits > creditsInfo.max);
    return !filteredSubjects.length ||
      !selectedSubjects.length ||
      disableByValidationOfCredits ||
      !!enrolledSubjectsOnPeriod.length;
  }, [filteredSubjects, selectedSubjects, requestedCredits, enrolledSubjectsOnPeriod,creditsInfo]);

  const handleClearOnSearch = React.useCallback(() => {
    setStudiedSubjects([]);
    setAvailableSubjects([]);
    setEnrolledSubjectsOnPeriod([]);
  }, [setStudiedSubjects, setAvailableSubjects, setEnrolledSubjectsOnPeriod]);

  return (
    <React.Fragment>
         <Backdrop className={classes.backdrop} open={isLoaders}>
        <CircularProgress color="inherit" />
      </Backdrop>
    <Container fixed maxWidth={'xl'}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Hidden lgUp>
            <Grid item lg={2}>
              <Grid container direction="column"
                    alignItems="center"
                    style={{minHeight: '17vh'}}
                    justify="center">
                <Grid item xs={12}>
                  <Avatar
                    variant='square'
                    className={classes.avatarLarge}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWcS-F1QZx9oUUizxWNlzolbc8nZJ7S0D49Q&usqp=CAU"
                  >
                    C
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TextField
                    id='control-number'
                    fullWidth
                    label='No. de Control'
                    value={updatedStudent?.controlNumber || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={1} xl={3}>
                  <TextField
                    id='grade'
                    fullWidth
                    label='Semestre'
                    value={updatedStudent?.currentSemester || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
                  <TextField
                    id='student'
                    fullWidth
                    label='Alumno'
                    value={`${updatedStudent?.firstName || ''
                    } ${updatedStudent?.fatherName || ''
                    } ${updatedStudent?.motherName || ''}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <TextField
                    id='career'
                    fullWidth
                    label='Carrera'
                    value={updatedStudent?.career?.name || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TextField
                    id='min-credits'
                    fullWidth
                    label='Créditos mínimos'
                    value={((semesterCredits < creditsInfo.min && semesterCredits > 1) ?
                      semesterCredits : creditsInfo.min) || 0}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TextField
                    id='max-credits'
                    fullWidth
                    label='Créditos máximos'
                    value={creditsInfo.max || 0}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TextField
                    id='current-credits'
                    fullWidth
                    label='Créditos solicitados'
                    value={requestedCredits || 0}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                  <TextField
                    id='subjects'
                    fullWidth
                    label='Asignaturas seleccionadas'
                    value={updatedSelectedSubjects.length}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TextField
                    id='date'
                    fullWidth
                    label='Fecha'
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={3}>
                  <TimeField/>
                </Grid>
                <Grid item xs={6}>
                  <BuscarAlumno
                    periodos={periodos}
                    setPeriodos={setPeriodos}
                    BuscaNumeroControl={BuscaNumeroControl}
                    setBuscarNumeroControl={setBuscarNumeroControl}
                    clear={handleClearOnSearch}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={2}>
                <Grid container direction="column"
                      alignItems="center"
                      style={{minHeight: '17vh'}}
                      justify="center">
                  <Grid item xs={12}>
                    <Avatar
                      variant='square'
                      className={classes.avatarLarge}
                      src="https://lh3.googleusercontent.com/proxy/jnfe8F3mRr6smjRWVci80rV0YJ6SST8tkoWuKou0iNd40LQ5xBL3j3oaT1NjKLAnb43_wHKLZT0M7ONt"
                    >
                      C
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Paper>
        <Grid container spacing={2} className={classes.mt}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid>
            {
         hoursCruse ?  <Chip color="secondary" size="small" style={{justifyContent:'center'}} icon={<WarningIcon />} label="Existen cruces en los horarios, de las materias seleccionadas"/>:null
            }
          </Grid>
        </Grid>
          <Grid item xs={12}>
            <ButtonGroup size="small" variant="contained" color="primary" aria-label="contained primary button group">
              <DialogoListaMaterias
                periodos={periodos}
                cargarAcademica={cargarAcademica}
                setCargaAcademica={setCargaAcademica}
                materiasSeleccionada={materiasSeleccionada}
                setMateriasSeleccionada={setMateriasSeleccionada}
                studiedSubjects={studiedSubjects}
              />
              <BajaTemporal
                periodos={periodos}
              />
              <BajaPermanente/>
            </ButtonGroup>
            <MaterialTable
              title="Asignaturas"
              columns={[
                {title: 'Semestre', field: 'subject.semestreMateria', type: 'numeric'},
                {title: 'Clave', field: 'subject.clave'},
                {title: 'Nombre', field: 'subject.nombre'},
                {title: 'Créditos', field: 'subject.creditos', type: 'numeric'},
                {
                  title: 'Tipo',
                  field: 'subject.tipo_curso',
                  lookup: {'ordinario': 'O', 'repeticion': 'R', 'especial': 'E'},
                },
                {
                  title: 'Lunes',
                  field: 'monday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.monday?.startTime} - {rowData?.monday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Martes',
                  field: 'tuesday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.tuesday?.startTime} - {rowData?.tuesday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Miércoles',
                  field: 'wednesday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.wednesday?.startTime} - {rowData?.wednesday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Jueves',
                  field: 'thursday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.thursday?.startTime} - {rowData?.thursday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Viernes',
                  field: 'friday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.friday?.startTime} - {rowData?.friday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Sabado',
                  field: 'saturday',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData?.saturday?.startTime} - {rowData?.saturday?.endTime}</Typography>
                      </Grid>
                    )
                  }
                },
                {
                  title: 'Docente',
                  field: 'subject.docente',
                  render: (rowData: any) => {
                    return (
                      <Grid container direction={'column'}>
                        <Typography
                          variant='caption'>{rowData.subject?.docente || ''}</Typography>
                      </Grid>
                    )
                  }
                },
              ]}
              // data={filteredSubjects}
              data={cargarAcademica}
              onSelectionChange={(data, rowData) => {
                setCreditsInfo(() => {
                  let max = 36;
                  let min = 20;
                  const especialSubjects = data
                    .filter(({subject}) => subject.tipo_curso === CourseType.Especial);
                  if (especialSubjects.length === 1) {
                    max = 20;
                    min = 1;
                  } else if (especialSubjects.length === 2) {
                    max = especialSubjects.reduce((previousValue, {subject}) => {
                      return previousValue + (+subject.creditos);
                    }, 0);
                    min = 1;
                    setIsTwoEspecialSubjects(true);
                  } else {
                    setIsTwoEspecialSubjects(false);
                  }
                  return {
                    max,
                    min,
                  }
                });
                let cruces = 0;
                data.forEach((availableSubject, index) => {
                  isTimeCrossings(data, availableSubject) && cruces++;
                })
                if(cruces > 0){
                  setHoursCruse(true)
                }else{
                  setHoursCruse(false)
                }
                //console.log('cruces totales',cruces * 0.5)
                setSelectedSubjects(data);
              }}

              options={{
                selection: true,
                search: false,
                showSelectAllCheckbox: false,
                showTextRowsSelected: false,
              }}

              localization={{
                pagination: {
                  labelDisplayedRows: '{from}-{to} de {count}',
                  labelRowsPerPage: 'Filas por página',
                  labelRowsSelect: 'Filas',
                },
              }}
            />
          </Grid>
          <Hidden only={'xs'}>
            <Grid item sm={9} md={9} lg={10}/>
          </Hidden>
          <Grid item xs={12} sm={3} md={3} lg={2}>
            <Button
              disabled={disableFinishButton }
              onClick={handleFinish}
              fullWidth color="primary"
              variant="contained"
            >
              Finalizar
            </Button>
          </Grid>
        </Grid>
      </div>
   
    </Container>
    
    </React.Fragment>
  )
}

export default ReEnrollmentPage
