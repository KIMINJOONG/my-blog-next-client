import { END } from "@redux-saga/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../../components/AppLayout";
import { authAction, authSelector } from "../../features/Auth/slice";
import { boardAction, boardSelector } from "../../features/Board/slice";
import { mainAction } from "../../features/Main/slice";
import { wrapper } from "../../store/configureStore";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/Pagination";

interface IListStyle {
    childTextAlign: string;
}

const List = styled.ul`
    list-style: none;
    padding: 10px 0px;
    margin: 0;
    overflow: hidden;
    border-bottom: 1px solid #d9dfeb;
    cursor: pointer;

    li:nth-child(1) {
        float: left;
        width: 90%;
        padding: 0px 5px;
        text-align: ${(props: IListStyle) => props.childTextAlign};
    }

    li:nth-child(2) {
        float: left;
        width: 10%;
        text-align: ${(props: IListStyle) => props.childTextAlign};
    }

    @media screen and (max-width: 768px) {
        li:nth-child(1) {
            float: left;
            width: 75%;
            padding: 0px 5px;
            text-align: ${(props: IListStyle) => props.childTextAlign};
        }

        li:nth-child(2) {
            float: left;
            width: 25%;
            text-align: ${(props: IListStyle) => props.childTextAlign};
        }
    }
`;

const Boards = () => {
    const router = useRouter();
    const { boards, totalCount } = useSelector(boardSelector.boards);
    const { me } = useSelector(authSelector.getMe);
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        if (router.query && router.query.limit && router.query.page) {
            setLimit(parseInt(router.query.limit as string, 10));
            setCurrentPage(parseInt(router.query.page as string, 10) - 1);
        }
    }, [router.query]);

    const onClickPage = useCallback(
        (page: number) => {
            if (page < 0) {
                return;
            }
            if (page + 1 > Math.ceil(totalCount / limit)) {
                return;
            }
            router.push(
                `/boards?category=${
                    router.query.category
                }&limit=${limit}&page=${page + 1}`
            );
        },
        [limit, router, totalCount]
    );
    return (
        <AppLayout>
            {me && me.email === "ijboym216@gmail.com" && (
                <div>
                    <Link href={"/boards/create"} prefetch={false}>
                        <a>글쓰기</a>
                    </Link>
                </div>
            )}

            <div style={{ border: "1px solid #d9dfeb" }}>
                <List childTextAlign="center">
                    <li>
                        <span>제목</span>
                    </li>
                    <li>
                        <span>작성일</span>
                    </li>
                </List>
                {boards.map((board) => (
                    <List
                        childTextAlign="center"
                        key={board.id}
                        onClick={() => Router.push(`/boards/${board.id}`)}
                    >
                        <li>
                            <span style={{ fontSize: 13 }}>{board.title}</span>
                        </li>
                        <li>
                            <span style={{ fontSize: 12 }}>
                                {board.createdAt.substring(0, 10)}
                            </span>
                        </li>
                    </List>
                ))}
            </div>
            <div style={{ marginTop: 10 }}>
                <Pagination
                    limit={limit}
                    currentPage={currentPage}
                    onClickPage={onClickPage}
                    totalCount={totalCount}
                />
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: any) =>
        async ({ req, query }) => {
            const { token } = req.cookies;
            if (token) {
                axios.defaults.headers!.Authorization = token;
                axios.defaults.withCredentials = true;
            } else {
                axios.defaults.headers!.Authorization = "";
            }

            const { category, limit, page } = query;
            store.dispatch(authAction.getMeRequest());
            store.dispatch(
                boardAction.loadBoardsRequest(
                    `category=${category}&limit=${limit}&page=${
                        parseInt(page as string, 10) - 1
                    }`
                )
            );
            store.dispatch(mainAction.loadCategoriesRequest());

            store.dispatch(END);

            await store.sagaTask.toPromise();

            return { props: {} };
        }
);

export default Boards;
