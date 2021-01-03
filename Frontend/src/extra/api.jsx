import axios from 'axios';
import config from './config';

export function getUserDetails() {
  return axios.get(`${config.authURL}`, { withCredentials: true })
}