import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { authAction, authSelector } from "../features/Auth/slice";
import { Colors } from "../util/colors";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login, loginDone, loginError } = useSelector(authSelector.login);
    const dispatch = useDispatch();

    const onSubmitLogin = useCallback(() => {
        const loginRequest: ILoginRequest = {
            email,
            password,
        };

        dispatch(authAction.loginRequest(loginRequest));
    }, [dispatch, email, password]);

    useEffect(() => {
        if (loginDone) {
            Router.push("/");
            alert(login?.message);
        }
        if (loginError) {
            alert(loginError.message);
        }
    }, [login?.message, loginDone, loginError]);

    return (
        <AppLayout>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <div
                        style={{
                            width: 300,
                            height: 56,
                            border: "1px solid ",
                            display: "flex",
                            flexDirection: "column",
                            padding: 10,
                            borderRadius: 200,
                        }}
                    >
                        <span style={{ fontSize: 10 }}>이메일 주소</span>
                        <div>
                            <input
                                style={{
                                    border: 0,
                                    width: "100%",
                                    height: 23,
                                    outlineColor: "white",
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <div
                        style={{
                            width: 300,
                            height: 56,
                            border: "1px solid ",
                            display: "flex",
                            flexDirection: "column",
                            padding: 10,
                            borderRadius: 200,
                        }}
                    >
                        <span style={{ fontSize: 10 }}>비밀번호</span>
                        <div>
                            <input
                                type="password"
                                style={{
                                    border: 0,
                                    width: "100%",
                                    height: 23,
                                    outlineColor: "white",
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <div
                        style={{
                            width: 300,
                            height: 56,
                            display: "flex",
                            flexDirection: "column",
                            padding: 10,
                            borderRadius: 200,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#32EAB9",
                        }}
                    >
                        <span
                            style={{ fontSize: 20, color: Colors.white }}
                            onClick={onSubmitLogin}
                        >
                            로그인
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Login;
