import type { NextPage } from "next";
import { Colors } from "../util/colors";
import AppLayout from "../components/AppLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../features/Auth/slice";

const Home: NextPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authAction.getMeRequest());
    }, [dispatch]);
    return <AppLayout></AppLayout>;
};

export default Home;
