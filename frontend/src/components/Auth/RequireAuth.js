import {
    useLocation,
    Navigate
  } from "react-router-dom";

import {useSelector,useDispatch} from 'react-redux';
import React,{useEffect} from "react";
import AuthService from '../../services/auth';
import {setUser} from '../../slicers/auth';

function RequireAuth({ children }) {

    let location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const authService = new AuthService();

    useEffect(() => {
      authService.getUser()
          .then(res => dispatch(setUser(res)))
          .catch(err => console.log('Аккаунт нету'))
  }, [user])

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    else{
      return children;
    }  
  }

export default RequireAuth;