import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { IBoardsResponse } from "../../types/response";
import { mainAction } from "./slice";

function loadBoardsAPI() {
    return axios.get("/boards");
}

function* loadBoards() {
    const { loadBoardsSuccess, loadBoardsFailure } = mainAction;
    try {
        const result: AxiosResponse<IBoardsResponse> = yield call(
            loadBoardsAPI
        );
        yield put(loadBoardsSuccess(result.data));
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            // Access to config, request, and response
            yield put(loadBoardsFailure(error.response?.data));
        } else {
            // Just a stock error
            yield put(loadBoardsFailure(error));
        }
    }
}

export function* watchLoadBoards() {
    const { loadBoardsRequest } = mainAction;
    yield takeLatest(loadBoardsRequest, loadBoards);
}

export default function* mainSaga() {
    yield all([fork(watchLoadBoards)]);
}