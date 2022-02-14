interface ILoginRequest {
    email: string;
    password: string;
}

interface ICreateBoardRequest {
    title: string;
    content: string;
    hashtags: string;
    categoryId: number;
}
