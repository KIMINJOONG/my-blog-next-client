interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: number;
    token: string;
}

interface IBoard {
    title: string;
    content: string;
    view: string;
    categoryId: number;
    category: ICategory;
    boardHashtag?: IHashtag[];
}

interface ICategory {
    code: number;
    name: string;
    boards: IBoard[];
}

interface IHashtag {
    name: string;
    categoryCode: number;
    boardHashTag: IBoard[];
}
