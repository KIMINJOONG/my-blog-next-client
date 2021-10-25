import type { NextPage } from "next";
import { Colors } from "../util/colors";
import AppLayout from "../components/AppLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction, authSelector } from "../features/Auth/slice";
import { wrapper } from "../store/configureStore";
import { END } from "@redux-saga/core";
import cookies from "next-cookies";
import axios from "axios";
import { mainAction } from "../features/Main/slice";

const Home: NextPage = () => {
    return <AppLayout></AppLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, res, ...etc }) => {
            const { token } = req.cookies;
            if (token) {
                axios.defaults.headers!.Authorization = token;
                axios.defaults.withCredentials = true;
            } else {
                axios.defaults.headers!.Authorization = "";
            }
            store.dispatch(authAction.getMeRequest());
            store.dispatch(mainAction.loadBoardsRequest());

            store.dispatch(END);

            await store.sagaTask.toPromise();
        }
);

export default Home;
