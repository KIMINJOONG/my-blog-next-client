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
                        marginTop: "24px",
                        padding: 10,
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            borderRadius: "8px",
                            backgroundColor: "#03e0c5",
                            textAlign: "center",
                            verticalAlign: "center",
                            width: 40,
                            height: 20,
                        }}
                    >
                        <span style={{ color: "#ffffff", fontSize: 12 }}>
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
                        <Link href={`/boards/${board.id}`} prefetch={false}>
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
    (store: any) =>
        async ({ req }) => {
            const { token } = req.cookies;
            if (token) {
                axios.defaults.headers!.Authorization = token;
                axios.defaults.withCredentials = true;
            } else {
                axios.defaults.headers!.Authorization = "";
            }
            store.dispatch(authAction.getMeRequest());
            store.dispatch(mainAction.loadBoardsRequest("limit=5"));
            store.dispatch(mainAction.loadCategoriesRequest());

            store.dispatch(END);

            await store.sagaTask.toPromise();
            return { props: {} };
        }
);

export default Home;
