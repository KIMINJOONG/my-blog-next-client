import { all } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
// 'http://127.0.0.1:8000/api';
// 'https://api.piccha.app/api';
//   process.env.NODE_ENV === 'production'
//     ? 'https://api.kohubi.xyz'
//     : 'http://127.0.0.1:8000';

export default function* userSaga() {
    yield all([]);
}
