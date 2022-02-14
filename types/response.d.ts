export interface ILoginResponse {
    access_token: string;
    message: string;
    data: IUser;
}

export interface IBoardsResponse {
    totalCount: number;
    boards: IBoard[];
}

export interface ILoadCategoriesResponse {
    data: ICategory[];
}

export interface ILoadBoardResponse {
    data: IBoard;
}
