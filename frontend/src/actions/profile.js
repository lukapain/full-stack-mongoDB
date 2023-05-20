import axios from "axios";
import { setAlert } from "./alert";
import {GET_PROFILE,GET_PROFILES,GET_REPOS,PROFILE_ERROR,CLEAR_PROFILE} from './type'

//get current users prof

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type':'application/json'
        }
    }
    const res = await axios.post('http://localhost:5000/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created','success'));
  if(!edit) {
    history.push('/dashboard');
  }

} catch (err) {
    const error = err.response.data.errors;

        if(error){
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}