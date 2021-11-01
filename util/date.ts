export const formatDate = (createdAt: string) => {
    let createdAtSplit = [];
    let createdat = "";
    let createdAtSubstring = createdAt.substring(0, 10);
    createdAtSplit = createdAtSubstring.split("-");

    createdat = createdAtSplit.join(".");
    return createdat;
};
