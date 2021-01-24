//import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {getToken, getUserID, isValid} from '../services/AuthService';
import axios from 'axios';
//import {useRouter} from 'next/router';
//import firebase from 'firebase/app';
//import 'firebase/auth';
//var router:any;
/*
type AuthContextType = {
  userID?: string | number;
  isLoggedIn: boolean;
  loading: boolean;
  logOut: () => void;
  checkAuth: () => void;
}
const AuthContext = React.createContext<AuthContextType>({
  userID: undefined,
  isLoggedIn: false,
  loading: false,
  logOut: () => {
  },
  checkAuth: () => {
  },
});

const AuthProvider: React.FC = (props) => {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [userID, setUserID] = useState<string | number | undefined>(undefined);


  const checkAuth = useCallback(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
    setLoading(true);
    setUserID(getUserID());
    setLogged(isValid());
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const logOut = useCallback(() => {
    setLoading(false);
    setLogged(false);
    setUserID(undefined);
    //firebase.auth().signOut();
  }, [setLoading, setLogged, setUserID]);

  const isLoggedIn = useMemo(() => {
    return logged;
  }, [logged]);

  const isLoading = useMemo(() => {
    return loading;
  }, [loading]);

  const loggedUserID = useMemo(() => {
    return userID;
  }, [userID])

  return (
    <AuthContext.Provider value={{
      loading: isLoading,
      isLoggedIn,
      userID: loggedUserID,
      checkAuth,
      logOut,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  return authContext;
}

export const protectedPage = (Component: any) => (props: any) => {
  
  //  const router = useRouter();
  const {loading: authLoading, checkAuth, isLoggedIn} = useAuth();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    try {
      checkAuth();
      if (!authLoading && !isLoggedIn) {
        router.replace('/Login').then(() => setShouldRender(false));
      } else {
        isLoggedIn && setShouldRender(true)
      }  
    } catch (error) {
      setShouldRender(false)
    }
    
  }, [isLoggedIn, authLoading]);

  return ((!authLoading && shouldRender && <Component {...props} />) || null)
}

export default AuthProvider;*/
