import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";
import { ILoginResponse } from "../../types/response";

type State = {
    loginLoading: boolean;
    loginDone: boolean;
    loginError: null | any;
    login: ILoginResponse | null;
    me: null | IUser;
    getMeLoading: boolean;
    getMeDone: boolean;
    getMeError: null | any;
};

const initialState: State = {
    loginLoading: false,
    loginDone: false,
    loginError: null,
    login: null,
    me: null,
    getMeLoading: false,
    getMeDone: false,
    getMeError: null,
};

const reducers = {
    getMeInit: (state: State) => {
        state.me = null;
    },
    getMeRequest: (state: State) => {
        state.getMeLoading = true;
    },
    getMeSuccess: (state: State, action: PayloadAction<IUser>) => {
        state.getMeLoading = false;
        state.getMeDone = true;
        state.me = action.payload;
    },
    getMeFailure: (state: State, { payload: error }: any) => {
        state.getMeLoading = false;
        state.getMeDone = false;
        state.getMeError = error;
    },
    loginInit: (state: State) => {
        state.loginLoading = false;
        state.loginDone = false;
        state.loginError = null;
    },
    loginRequest: (state: State, _action: PayloadAction<ILoginRequest>) => {
        state.loginLoading = true;
    },
    loginSuccess: (state: State, action: PayloadAction<ILoginResponse>) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.login = action.payload;
        state.me = action.payload.data;
    },
    loginFailure: (state: State, { payload: error }: any) => {
        state.loginLoading = false;
        state.loginDone = false;
        state.loginError = error;
    },
};

const name: string = "auth";
export const authSlice = createSlice({
    name,
    initialState,
    reducers,
});

const selectLoginState = createSelector(
    (state: State) => state.loginLoading,
    (state: State) => state.loginDone,
    (state: State) => state.loginError,
    (state: State) => state.login,
    (loginLoading, loginDone, loginError, login) => {
        return { loginLoading, loginDone, loginError, login };
    }
);

const selectGetMeState = createSelector(
    (state: State) => state.getMeLoading,
    (state: State) => state.getMeDone,
    (state: State) => state.getMeError,
    (state: State) => state.me,
    (getMeLoading, getMeDone, getMeError, me) => {
        return { getMeLoading, getMeDone, getMeError, me };
    }
);
export const auth = authSlice.name;
export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;

export const authSelector = {
    login: (state: RootState) => selectLoginState(state[auth]),
    getMe: (state: RootState) => selectGetMeState(state[auth]),
};
