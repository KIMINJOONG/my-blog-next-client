import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import ReactHtmlParser from "react-html-parser";
import { wrapper } from "../../store/configureStore";
import axios, { AxiosResponse } from "axios";
import { END } from "redux-saga";
import { boardAction } from "../../features/Board/slice";
import { GetServerSideProps } from "next";
import { ILoadBoardResponse } from "../../types/response";

interface IProps {
    board: IBoard;
}
const Board = ({ board }: IProps) => {
    return (
        <AppLayout>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    padding: 10,
                }}
            >
                <div>
                    <p style={{ fontSize: 20, fontWeight: "bold" }}>
                        {board.title}
                    </p>
                </div>
                <div>
                    <p>{board && ReactHtmlParser(board.content)}</p>
                </div>
            </div>
        </AppLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.params) {
        const { id } = context.params;
        if (id) {
            const response: AxiosResponse<ILoadBoardResponse> = await axios.get(
                `boards/${id}`
            );
            if (response.data) {
                return { props: { board: response.data } };
            } else {
                return { props: { board: null } };
            }
        } else {
            return { props: { board: null } };
        }
    } else {
        return { props: { board: null } };
    }
};

export default Board;
