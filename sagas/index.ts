import { all } from "redux-saga/effects";
import auth from "../features/Auth/saga";
import main from "../features/Main/saga";
import board from "../features/Board/saga";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";
// axios.defaults.withCredentials = true;

export default function* userSaga() {
    yield all([auth(), main(), board()]);
}
