import type { NextPage } from "next";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import { authAction } from "../features/Auth/slice";
import { wrapper } from "../store/configureStore";
import { END } from "@redux-saga/core";
import cookies from "next-cookies";
import axios from "axios";
import { mainAction, mainSelector } from "../features/Main/slice";
import Link from "next/link";
import { formatDate } from "../util/date";

const Home: NextPage = () => {
    const { boards } = useSelector(mainSelector.boards);
    return (
        <AppLayout>
            {boards.map((board) => (
                <div
                    key={board.id}
                    style={{
                        boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                        padding: 20,
                        marginTop: "24px",
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            display: "inline-block",
                            borderRadius: "16px",
                            backgroundColor: "#03e0c5",
                            textAlign: "center",
                        }}
                    >
                        <span style={{ color: "#ffffff" }}>
                            {board.category?.name}
                        </span>
                    </div>
                    <div>
                        <h3>{board.title}</h3>
                    </div>
                    <div>
                        <span
                            style={{
                                fontFamily: "SFProText",
                                fontSize: 12,
                                fontWeight: "normal",
                                fontStretch: "normal",
                                fontStyle: "normal",
                                lineHeight: 1.33,
                                letterSpacing: "normal",
                                color: "rgba(60, 60, 67, 0.6)",
                            }}
                        >
                            {formatDate(board.createdAt)}
                        </span>
                    </div>
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Link href={`boards/`} prefetch={false}>
                            <a
                                style={{
                                    fontFamily: "SFProText",
                                    fontSize: 13,
                                    lineHeight: 1.38,
                                    letterSpacing: -0.08,
                                    textAlign: "right",
                                    color: "#03e0c5",
                                    cursor: "pointer",
                                }}
                            >
                                +more
                            </a>
                        </Link>
                    </div>
                </div>
            ))}
        </AppLayout>
    );
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
            store.dispatch(mainAction.loadBoardsRequest("limit=5"));

            store.dispatch(END);

            await store.sagaTask.toPromise();
        }
);

export default Home;
