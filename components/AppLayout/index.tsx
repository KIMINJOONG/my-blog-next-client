import React, { useCallback, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authAction, authSelector } from "../../features/Auth/slice";
import { mainSelector } from "../../features/Main/slice";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Router from "next/router";

interface IProps {
    children: React.ReactNode;
}

interface IMenuProps {
    isToggleMenuButton: boolean;
}

const Nav = styled.nav`
    display: flex;
    align-items: center;
    padding: 8px 12px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const LogoWrapper = styled.div`
    flex: 1;
`;

const Menu = styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0px;

    & > li {
        padding: 8px 12px;
    }

    @media screen and (max-width: 768px) {
        display: ${(props: IMenuProps) =>
            props.isToggleMenuButton ? "flex" : "none"};
        flex-direction: column;
        align-items: center;
        width: 100%;

        & > li {
            width: 100%;
            text-align: center;
        }

        & > li:hover {
            background-color: #03e0c5;
        }
    }
`;

const MenuItem = styled.li`
    color: black;
    font-weight: bold;
    @media screen and (max-width: 768px) {
        & > li:hover {
            color: #fff;
        }
    }
`;

const ToggleButtton = styled.a`
    display: none;
    position: absolute;
    width: 25px;
    right: 10px;
    border-width: 1px;
    @media screen and (max-width: 768px) {
        display: block;
    }
`;

const AppLayout = ({ children }: IProps) => {
    const dispatch = useDispatch();
    const [isToggleMenuButton, setIsToggleMenuButton] =
        useState<boolean>(false);
    const { me } = useSelector(authSelector.getMe);
    const { categories } = useSelector(mainSelector.categories);

    const onSubmitLogout = useCallback(() => {
        Cookies.remove("token");
        dispatch(authAction.getMeInit());
        alert("로그아웃 되었습니다.");
        Router.push("/");
    }, [dispatch]);
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Nav>
                <LogoWrapper style={{ flex: 1 }}>
                    <Image
                        onClick={() => Router.push("/")}
                        src="/logo.png"
                        alt={"logo.png"}
                        width={200}
                        height={40}
                    />
                </LogoWrapper>
                <Menu isToggleMenuButton={isToggleMenuButton}>
                    {categories.map((category) => (
                        <MenuItem key={category.id}>
                            <Link href={`/boards?category=${category.id}`}>
                                <a href="">{category.name}</a>
                            </Link>
                        </MenuItem>
                    ))}

                    <MenuItem>
                        {me ? (
                            <span onClick={() => onSubmitLogout()}>
                                로그아웃
                            </span>
                        ) : (
                            <Link href="/login" prefetch={false}>
                                <a href="">로그인</a>
                            </Link>
                        )}
                    </MenuItem>
                </Menu>

                <ToggleButtton
                    onClick={() => setIsToggleMenuButton(!isToggleMenuButton)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </ToggleButtton>
            </Nav>
            <div
                style={{
                    padding: 20,
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
