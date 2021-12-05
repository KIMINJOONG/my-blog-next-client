import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { IBoardsResponse, ILoadCategoriesResponse } from "../../types/response";
import { mainAction } from "./slice";

function loadCategoriesAPI() {
    return axios.get("/categories");
}

function* loadCategories() {
    const { loadCategoriesSuccess, loadCategoriesFailure } = mainAction;
    try {
        const result: AxiosResponse<ILoadCategoriesResponse> = yield call(
            loadCategoriesAPI
        );
        yield put(loadCategoriesSuccess(result.data));
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            // Access to config, request, and response
            yield put(loadCategoriesFailure(error.response?.data));
        } else {
            // Just a stock error
            yield put(loadCategoriesFailure(error));
        }
    }
}

export function* watchLoadCategories() {
    const { loadCategoriesRequest } = mainAction;
    yield takeLatest(loadCategoriesRequest, loadCategories);
}

function loadBoardsAPI(query: string) {
    return axios.get(`/boards?${query}`);
}

function* loadBoards(action: PayloadAction<string>) {
    const { loadBoardsSuccess, loadBoardsFailure } = mainAction;
    try {
        const result: AxiosResponse<IBoardsResponse> = yield call(
            loadBoardsAPI,
            action.payload
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
    yield all([fork(watchLoadBoards), fork(watchLoadCategories)]);
}
