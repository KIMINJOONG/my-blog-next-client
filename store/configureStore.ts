import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer,
    devTools: true,
    middleware: [
        ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
        sagaMiddleware,
    ],
});

sagaMiddleware.run(rootSaga);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
