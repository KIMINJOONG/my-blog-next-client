import { all } from "redux-saga/effects";
import auth from "../features/Auth/saga";
import main from "../features/Main/saga";
import board from "../features/Board/saga";

export default function* userSaga() {
    yield all([auth(), main(), board()]);
}
