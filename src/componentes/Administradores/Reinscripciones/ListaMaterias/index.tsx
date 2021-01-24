import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {isAfter, isBefore} from 'date-fns';
import MaterialTable from 'material-table';
import axios from 'axios';
import swal from 'sweetalert';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    Backdrop,
    makeStyles, createStyles, Theme,
    CircularProgress
} from '@material-ui/core';
import {
    AvailableSubject,
    CourseType,
    Subject
} from '../interfaces';
import {
    AVAILABLE_SUBJECTS_ALL_URL,
} from '../constants/end-points';
import {useStudent} from '../providers/StudentProvider';


const ListaMaterias = ({periodos, cargarAcademica, setMateriasSeleccionada, studiedSubjects}: any) => {
    const {student} = useStudent();

    const classes = useStyles();
    const [active, setActive] = React.useState(false);
    const [availableSubjects, setAvailableSubjects] = useState<AvailableSubject[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);


    const fetchAvailableSubjects = useCallback(() => {
        setActive(true)
        let alumnoCarrera: any = student?.career.name;
        let extraerCarrera = []
        extraerCarrera = alumnoCarrera.split(' ')
        if (extraerCarrera.length) {
            const [tipo] = extraerCarrera
            axios.get(AVAILABLE_SUBJECTS_ALL_URL, {
                params: {
                    period: periodos,
                    career: tipo
                }
            }).then(value => {
                setSubjects(value.data)
            })
                .finally(() => setActive(false));
        }
        setActive(false)

    }, [setSubjects]);


    const filteredSubjects = useMemo<AvailableSubject[]>(() => {

        return availableSubjects.filter(({subject}) => {
                return !studiedSubjects.some((studiedSubject: any) => {
                    return (studiedSubject.clave === subject.clave)
                    //&&(+studiedSubject.promedio >= 70)
                })
            }
        ).map<AvailableSubject>((availableSubject: any) => {
            let courseType = CourseType.Ordinary;

            const sortedStudiedSubjects = studiedSubjects
                .filter((subject: any) => subject.clave === availableSubject.subject.clave)

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
            return {
                ...availableSubject,
                subject: {
                    ...availableSubject.subject,
                    tipo_curso: courseType,
                },
                tableData: {
                    checked: false,
                }
            }
        })
            .filter(availableSubject => !(cargarAcademica as AvailableSubject[])
                .some(value =>
                    value.subject.materiaDocente_id === availableSubject.subject.materiaDocente_id)
            )
    }, [studiedSubjects, availableSubjects]);

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


    return (
        <React.Fragment>
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
                                        variant='caption'>{rowData.subject.docente}</Typography>
                                </Grid>
                            )
                        }
                    },
                ]}
                data={filteredSubjects}

                //data={availableSubjects}
                //data={carganueva}
                onSelectionChange={(data: AvailableSubject[]) => {
                    if (data.length) {
                        setMateriasSeleccionada(data);
                    }
                }}
                options={{
                    selection: true,
                    search: true,
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
            <Backdrop className={classes.backdrop} open={active}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const DialogoListaMaterias = ({periodos, cargarAcademica, setCargaAcademica, materiasSeleccionada, setMateriasSeleccionada, studiedSubjects}: any) => {
    const {student} = useStudent();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        if (student?.controlNumber.length) {
            setOpen(true);
        } else {
            swal({
                text: "Primero realice una búsqueda!",
            });
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const aprobarAgregarNuevasMaterias = async () => {

        if (materiasSeleccionada.length) {
            if (cargarAcademica.length) {
                //agregar cruse de horas
                setCargaAcademica(cargarAcademica.concat(
                    materiasSeleccionada
                        .map((selected: any) => {
                            return {
                                ...selected,
                                tableData: {
                                    ...selected.tableData,
                                    checked: false,
                                },
                            }
                        })));

                setOpen(false);
            } else {
                alert('La carga académica no es valida')
                setMateriasSeleccionada([])
            }
        } else {
            alert('Seleccione una materia o cancele')
        }
    }

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Añadir Materia
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">{''}</DialogTitle>

                <DialogContent>
                    <ListaMaterias
                        periodos={periodos}
                        cargarAcademica={cargarAcademica}
                        setCargaAcademica={setCargaAcademica}
                        materiasSeleccionada={materiasSeleccionada}
                        setMateriasSeleccionada={setMateriasSeleccionada}
                        studiedSubjects={studiedSubjects}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={aprobarAgregarNuevasMaterias} color="primary" autoFocus>
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default DialogoListaMaterias
