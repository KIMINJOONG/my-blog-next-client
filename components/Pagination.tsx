import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    limit: number;
    currentPage: number;
    onClickPage: (page: number) => void;
    totalCount: number;
}
const Pagination = ({
    limit,
    currentPage,
    onClickPage,
    totalCount,
}: IProps) => {
    const [pageCount, setPageCount] = useState<number>(0);
    const [pages, setPages] = useState<number[]>([]);
    // const [start, setStart] = useState<number>(0);
    // const [end, SetEnd] = useState<number>(5);

    useEffect(() => {
        const tmpCnt = Math.ceil(totalCount / limit);
        setPageCount(tmpCnt);

        let startPage = 0,
            endPage = 0;
        if (tmpCnt <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = tmpCnt;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= tmpCnt) {
                startPage = tmpCnt - 4;
                endPage = tmpCnt;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        const tmpPages = [...Array(endPage + 1 - startPage).keys()].map(
            (i) => startPage + i
        );
        setPages(tmpPages);
    }, [currentPage, limit, totalCount]);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            }}
        >
            <a
                onClick={() => onClickPage(currentPage - 1)}
                style={{
                    display: "flex",
                    minWidth: 3,
                    textAlign: "center",
                    padding: "0.6em 0.4em",
                    verticalAlign: "middle",
                    border: "1px solid #d9dfeb",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon
                    width={"1.18em"}
                    height={"1em"}
                    icon={faAngleLeft}
                />
            </a>
            {pages.map((page) => {
                if (pages.length > 0) {
                    return (
                        <a
                            key={page}
                            onClick={() => onClickPage(page - 1)}
                            style={{
                                display: "flex",
                                minWidth: 3,
                                textAlign: "center",
                                padding: "0.5em 0.8em",
                                verticalAlign: "middle",
                                borderLeft: "1px solid #d9dfeb",
                                borderTop: "1px solid #d9dfeb",
                                borderBottom: "1px solid #d9dfeb",
                                backgroundColor:
                                    page === currentPage + 1
                                        ? "rgba(0,0,0,.05)"
                                        : "white",
                                cursor: "pointer",
                            }}
                        >
                            {page}
                        </a>
                    );
                }
            })}
            <a
                onClick={() => onClickPage(currentPage + 1)}
                style={{
                    display: "flex",
                    minWidth: 3,
                    textAlign: "center",
                    padding: "0.6em 0.4em",
                    verticalAlign: "middle",
                    border: "1px solid #d9dfeb",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon
                    width={"1.18em"}
                    height={"1em"}
                    icon={faAngleRight}
                />
            </a>
        </div>
    );
};

export default Pagination;
