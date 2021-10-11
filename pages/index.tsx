import type { NextPage } from "next";
import { Colors } from "../util/colors";
import Image from "next/image";

const Home: NextPage = () => {
    return (
        <div
            style={{
                maxWidth: 1200,
                height: "100vh",
                margin: "0 auto",
                backgroundColor: Colors.lightGray,
            }}
        >
            <div
                style={{
                    display: "flex",
                    paddingTop: 10,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ display: "flex", flex: 1 }}>
                        <Image
                            src="/logo.png"
                            alt={"logo.png"}
                            width={200}
                            height={50}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            background: Colors.darkGray,
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 20,
                        }}
                    >
                        <div style={{ paddingRight: 40, paddingLeft: 10 }}>
                            <span style={{ color: Colors.white }}>게시글</span>
                        </div>
                        <div style={{ paddingRight: 40 }}>
                            <span style={{ color: Colors.white }}>게시글2</span>
                        </div>
                        <div style={{ paddingRight: 10 }}>
                            <span style={{ color: Colors.white }}>로그인</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    paddingTop: 50,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div style={{ display: "flex", width: "20%" }}>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "1px solid black",
                                }}
                            ></div>
                            <div style={{ paddingLeft: 10 }}>
                                <span>개발자 김인중의 블로그입니다.</span>
                            </div>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <div
                                style={{
                                    border: "1px dotted gray",
                                }}
                            ></div>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <span style={{ fontWeight: "bold", fontSize: 18 }}>
                                해쉬태그
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "row",
                                paddingTop: 10,
                            }}
                        >
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                            <div style={{ padding: 5 }}>
                                <span style={{ color: Colors.lightGreen }}>
                                    #bboy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ paddingLeft: 50, display: "felx", flex: 1 }}>
                    <div>
                        <span style={{ fontWeight: "bold", fontSize: 20 }}>
                            LATEST
                        </span>
                    </div>
                    <div
                        style={{
                            paddingTop: 10,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                margin: "10px 20px",
                                width: 250,
                                height: 250,
                                backgroundColor: Colors.white,
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div>
                                    <span style={{ color: Colors.lightGreen }}>
                                        게시글
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                        }}
                                    >
                                        제목
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        날짜
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "10px 20px",
                                width: 250,
                                height: 250,
                                backgroundColor: Colors.white,
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div>
                                    <span style={{ color: Colors.lightGreen }}>
                                        게시글
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                        }}
                                    >
                                        제목
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        날짜
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "10px 20px",
                                width: 250,
                                height: 250,
                                backgroundColor: Colors.white,
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div>
                                    <span style={{ color: Colors.lightGreen }}>
                                        게시글
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                        }}
                                    >
                                        제목
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        날짜
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "10px 20px",
                                width: 250,
                                height: 250,
                                backgroundColor: Colors.white,
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div>
                                    <span style={{ color: Colors.lightGreen }}>
                                        게시글
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                        }}
                                    >
                                        제목
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        날짜
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: "10px 20px",
                                width: 250,
                                height: 250,
                                backgroundColor: Colors.white,
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div>
                                    <span style={{ color: Colors.lightGreen }}>
                                        게시글
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                        }}
                                    >
                                        제목
                                    </span>
                                </div>
                                <div style={{ paddingTop: 10 }}>
                                    <span
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        날짜
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
