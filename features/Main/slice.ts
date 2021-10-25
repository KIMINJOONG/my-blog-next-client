import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";
import { IBoardsResponse } from "../../types/response";

type State = {
    loadBoardsLoading: boolean;
    loadBoardsDone: boolean;
    loadBoardsError: null | any;
    boards: IBoard[];
    totalCount: number;
};

const initialState: State = {
    loadBoardsLoading: false,
    loadBoardsDone: false,
    loadBoardsError: null,
    boards: [],
    totalCount: 0,
};

const reducers = {
    loadBoardsRequest: (state: State) => {
        state.loadBoardsLoading = true;
    },
    loadBoardsSuccess: (
        state: State,
        action: PayloadAction<IBoardsResponse>
    ) => {
        state.loadBoardsLoading = false;
        state.loadBoardsDone = true;
        state.boards = action.payload.boards;
        state.totalCount = action.payload.totalCount;
    },
    loadBoardsFailure: (state: State, { payload: error }: any) => {
        state.loadBoardsLoading = false;
        state.loadBoardsDone = false;
        state.loadBoardsError = error;
    },
};

const name: string = "main";
export const mainSlice = createSlice({
    name,
    initialState,
    reducers,
});

const selectBoardsState = createSelector(
    (state: State) => state.loadBoardsLoading,
    (state: State) => state.loadBoardsDone,
    (state: State) => state.loadBoardsError,
    (state: State) => state.boards,
    (state: State) => state.totalCount,
    (
        loadBoardsLoading,
        loadBoardsDone,
        loadBoardsError,
        boards,
        totalCount
    ) => {
        return {
            loadBoardsLoading,
            loadBoardsDone,
            loadBoardsError,
            boards,
            totalCount,
        };
    }
);

export const main = mainSlice.name;
export const mainReducer = mainSlice.reducer;
export const mainAction = mainSlice.actions;

export const authSelector = {
    boards: (state: RootState) => selectBoardsState(state[main]),
};
