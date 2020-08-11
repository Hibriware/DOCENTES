import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Student} from '../interfaces';
import {me} from '../services/StudentService';
import {useAuth} from './AuthProvider';


type StudentContextValues = {
  student: Student | null;
  setStudent: Dispatch<SetStateAction<Student | null>>;
  loadingStudent: boolean;
}
const StudentContext = React.createContext<StudentContextValues>({student: null, loadingStudent: false, setStudent: ()=>{},});

const StudentProvider: React.FC = (props) => {
  const {isLoggedIn, loading: authLoading, checkAuth} = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const endTime = (+new Date()) + (2.3 * 1000);

  const timedLoading = useCallback(() => {
    if (+new Date() <= endTime) {
      setTimeout(() => {
        setLoading(false);
      }, endTime - (+new Date()))
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    !isLoggedIn && setStudent(null);
  }, [isLoggedIn]);

  useEffect(() => {
    checkAuth();
    if (!isLoggedIn && authLoading) {
      timedLoading();
    }
    if (!authLoading && isLoggedIn) {
      me().then(result => {
        if (result) {
          setStudent(result);
          timedLoading();
        }
      }).finally(() => timedLoading());
    }
  }, [authLoading, isLoggedIn]);

  const loadingStudent = useMemo(() => {
    return loading;
  }, [loading])

  return (
    <StudentContext.Provider value={{student, loadingStudent, setStudent}}>
      {props.children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => {
  const context = useContext(StudentContext);
  return context;
}

export default StudentProvider;
