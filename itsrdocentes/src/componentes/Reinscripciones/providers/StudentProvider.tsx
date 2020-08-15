import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Student,Control} from '../interfaces';
import {me} from '../services/StudentService';
import {useAuth} from './AuthProvider';
import { strict } from 'assert';


type StudentContextValues = {
  student: Student | null;
  setStudent: Dispatch<SetStateAction<Student | null>>;
  loadingStudent: boolean;
  numeroControl:Control | null;
  setNumeroControl: Dispatch<SetStateAction<Control | null>>;
}


const StudentContext = React.createContext<StudentContextValues>({numeroControl:null,setNumeroControl:()=>{},student: null, loadingStudent: false, setStudent: ()=>{},});

const StudentProvider: React.FC = (props) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const[numeroControl,setNumeroControl] = useState<Control | any>(null)

  
  useEffect(() => {
    if(numeroControl?.numeroControl){
      console.log("actualizar data provider")
      me(numeroControl?.numeroControl).then(result => {
        if (result) {
          setStudent(result);
        }
      }).finally();
    }
  }, [numeroControl]);

  const loadingStudent = useMemo(() => {
    return loading;
  }, [loading])

  return (
    <StudentContext.Provider value={{numeroControl,student, loadingStudent, setStudent ,setNumeroControl}}>
      {props.children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => {
  const context = useContext(StudentContext);
  return context;
}


export default StudentProvider;
