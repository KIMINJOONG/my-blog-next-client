import { END } from "@redux-saga/core";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../../components/AppLayout";
import { boardAction, boardSelector } from "../../features/Board/slice";
import { wrapper } from "../../store/configureStore";

const List = styled.ul`
    list-style: none;
    padding: 10px 0px;
    margin: 0;
    overflow: hidden;

    li:nth-child(1) {
        float: left;
        width: 5%;
        text-align: center;
    }

    li:nth-child(2) {
        float: left;
        width: 90%;
        padding: 0px 5px;
        text-align: center;
    }

    li:nth-child(3) {
        float: left;
        width: 5%;
        text-align: center;
    }

    @media screen and (max-width: 768px) {
        li:nth-child(1) {
            float: left;
            width: 10%;
            text-align: center;
        }

        li:nth-child(2) {
            float: left;
            width: 65%;
            padding: 0px 5px;
            text-align: center;
        }

        li:nth-child(3) {
            float: left;
            width: 25%;
            text-align: center;
        }
    }
`;

const Boards = () => {
    const { boards } = useSelector(boardSelector.boards);
    return (
        <AppLayout>
            <div>
                <List>
                    <li>
                        <span>번호</span>
                    </li>
                    <li>
                        <span>제목</span>
                    </li>
                    <li>
                        <span>작성일</span>
                    </li>
                </List>
                {boards.map((board) => (
                    <List key={board.id}>
                        <li>
                            <span>{board.id}</span>
                        </li>
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
            store.dispatch(
                boardAction.loadBoardsRequest(
                    `category=${category}&limit=${limit}`
                )
            );
            store.dispatch(END);

            await store.sagaTask.toPromise();
        }
);

export default Boards;
