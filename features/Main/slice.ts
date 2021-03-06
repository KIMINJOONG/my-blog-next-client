import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";
import { IBoardsResponse } from "../../types/response";

type State = {
    loadBoardsLoading: boolean;
    loadBoardsDone: boolean;
    loadBoardsError: null | any;
    boards: IBoard[];
    totalCount: number;
    loadCategoriesLoading: boolean;
    loadCategoriesDone: boolean;
    loadCategoriesError: null | any;
    categories: ICategory[];
};

const initialState: State = {
    loadBoardsLoading: false,
    loadBoardsDone: false,
    loadBoardsError: null,
    boards: [],
    totalCount: 0,
    loadCategoriesLoading: false,
    loadCategoriesDone: false,
    loadCategoriesError: null,
    categories: [],
};

const reducers = {
    loadCategoriesRequest: (state: State) => {
        state.loadCategoriesLoading = true;
    },
    loadCategoriesSuccess: (state: State, action: PayloadAction<any>) => {
        state.loadCategoriesLoading = false;
        state.loadCategoriesDone = true;
        state.categories = action.payload;
    },
    loadCategoriesFailure: (state: State, { payload: error }: any) => {
        state.loadCategoriesLoading = false;
        state.loadCategoriesDone = false;
        state.loadCategoriesError = error;
    },
    loadBoardsRequest: (state: State, _action: PayloadAction<string>) => {
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

const selectCategoriesState = createSelector(
    (state: State) => state.loadCategoriesLoading,
    (state: State) => state.loadCategoriesDone,
    (state: State) => state.loadCategoriesError,
    (state: State) => state.categories,
    (
        loadCategoriesLoading,
        loadCategoriesDone,
        loadCategoriesError,
        categories
    ) => {
        return {
            loadCategoriesLoading,
            loadCategoriesDone,
            loadCategoriesError,
            categories,
        };
    }
);

export const main = mainSlice.name;
export const mainReducer = mainSlice.reducer;
export const mainAction = mainSlice.actions;

export const mainSelector = {
    boards: (state: RootState) => selectBoardsState(state[main]),
    categories: (state: RootState) => selectCategoriesState(state[main]),
};
