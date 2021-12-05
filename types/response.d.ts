export interface ILoginResponse {
    access_token: string;
    message: string;
    data: IUser;
}

export interface IBoardsResponse {
    totalCount: number;
    boards: Board[];
}

export interface ILoadCategoriesResponse {
    data: ICategory[];
}
