import { END } from "@redux-saga/core";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../../components/AppLayout";
import { authAction } from "../../features/Auth/slice";
import { boardAction, boardSelector } from "../../features/Board/slice";
import { mainAction } from "../../features/Main/slice";
import { wrapper } from "../../store/configureStore";
import Link from "next/link";
import Router from "next/router";

interface IListStyle {
    childTextAlign: string;
}

const List = styled.ul`
    list-style: none;
    padding: 10px 0px;
    margin: 0;
    overflow: hidden;

    li:nth-child(1) {
        float: left;
        width: 90%;
        padding: 0px 5px;
        text-align: ${(props: IListStyle) => props.childTextAlign};
    }

    li:nth-child(2) {
        float: left;
        width: 5%;
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
    const { boards } = useSelector(boardSelector.boards);
    return (
        <AppLayout>
            <div>
                <Link href={"/boards/create"} prefetch={false}>
                    <a>글쓰기</a>
                </Link>
            </div>
            <div>
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
                        childTextAlign="left"
                        key={board.id}
                        onClick={() => Router.push(`/boards/${board.id}`)}
                    >
                        <li>
                            <span style={{ fontSize: 13 }}>{board.title}</span>
                        </li>
                        <li>
                            <span style={{ fontSize: 12 }}>
                                {board.createdAt.substr(0, 10)}
                            </span>
                        </li>
                    </List>
                ))}
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, query }) => {
            const { token } = req.cookies;
            if (token) {
                axios.defaults.headers!.Authorization = token;
                axios.defaults.withCredentials = true;
            } else {
                axios.defaults.headers!.Authorization = "";
            }

            const limit = 10;
            const { category } = query;
            store.dispatch(authAction.getMeRequest());
            store.dispatch(
                boardAction.loadBoardsRequest(
                    `category=${category}&limit=${limit}`
                )
            );
            store.dispatch(mainAction.loadCategoriesRequest());

            store.dispatch(END);

            await store.sagaTask.toPromise();
        }
);

export default Boards;
