import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { auth, authReducer } from "../features/Auth/slice";
import { main, mainReducer } from "../features/Main/slice";

const rootReducer = combineReducers({
    [auth]: authReducer,
    [main]: mainReducer,
});

export const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return rootReducer(state, action);
};

// (이전상태, 액션) => 다음상태
// const rootReducer = (state: any, action: AnyAction) => {
//     switch (action.type) {
//         default: {
//             const combinedReducer = combineReducers({
//                 [auth]: authReducer,
//             });
//             return combinedReducer(state, action);
//         }
//     }
// };

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
