import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { authAction } from "./slice";
import Cookies from "js-cookie";

function getMeToken() {
    const token = Cookies.get("token");
    const Authorization = token ? token : "";
    return Authorization;
}

function getMeAPI() {
    const Authorization = getMeToken();
    return axios.get("/auth/me", { headers: { Authorization } });
}

function* getMe() {
    const { getMeSuccess, getMeFailure } = authAction;
    try {
        const result: AxiosResponse<IUser> = yield call(getMeAPI);
        yield put(getMeSuccess(result.data));
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            // Access to config, request, and response
            yield put(getMeFailure(error.response?.data));
        } else {
            // Just a stock error
            yield put(getMeFailure(error));
        }
    }
}

export function* watchGetMe() {
    const { getMeRequest } = authAction;
    yield takeLatest(getMeRequest, getMe);
}

function loginAPI(data: ILoginRequest) {
    return axios.post("/auth/login", data);
}

function* login(action: PayloadAction<ILoginRequest>) {
    const { loginSuccess, loginFailure } = authAction;
    try {
        const result: AxiosResponse<ILoginResponse> = yield call(
            loginAPI,
            action.payload
        );
        Cookies.set("token", `Bearer ${result.data.access_token as string}`);
        // yield AsyncStorage.setItem("token", result.data.access_token);
        yield put(loginSuccess(result.data));
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            // Access to config, request, and response
            yield put(loginFailure(error.response?.data));
        } else {
            // Just a stock error
            yield put(loginFailure(error));
        }
    }
}

export function* watchlogin() {
    const { loginRequest } = authAction;
    yield takeLatest(loginRequest, login);
}

export default function* mainSaga() {
    yield all([fork(watchlogin), fork(watchGetMe)]);
}
