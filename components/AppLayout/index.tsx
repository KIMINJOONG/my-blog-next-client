import React, { useCallback, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/Auth/slice";

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
            background-color: black;
        }
    }
`;

const ToggleButtton = styled.a`
    display: block;
    position: absolute;
    right: 32px;
    font-size: 50px;
    @media screen and (max-width: 768px) {
        display: block;
    }
`;

const AppLayout = ({ children }: IProps) => {
    const [isToggleMenuButton, setIsToggleMenuButton] =
        useState<boolean>(false);
    const { me } = useSelector(authSelector.getMe);
    return (
        <div>
            <Nav>
                <LogoWrapper style={{ flex: 1 }}>
                    <Image
                        src="/logo.png"
                        alt={"logo.png"}
                        width={200}
                        height={40}
                    />
                </LogoWrapper>
                <Menu isToggleMenuButton={isToggleMenuButton}>
                    <li>
                        <a href="">메뉴1</a>
                    </li>
                    <li>
                        <a href="">메뉴2</a>
                    </li>
                    <li>
                        {me ? (
                            <Link href="/login" prefetch={false}>
                                <a href="">로그아웃</a>
                            </Link>
                        ) : (
                            <Link href="/login" prefetch={false}>
                                <a href="">로그인</a>
                            </Link>
                        )}
                    </li>
                </Menu>

                <ToggleButtton
                    onClick={() => setIsToggleMenuButton(!isToggleMenuButton)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </ToggleButtton>
            </Nav>
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;
