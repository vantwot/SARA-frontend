import React from "react";
import { Header } from "./";
import { Outlet } from "react-router";
// import { useLocation } from "react-router-dom";

const Layout = ({ children, categories }) => {

    // const userInfo = useLocation().state;
    // console.log(userInfo);

    return (
        <>
            <Header
                categories={categories}
             />
            {children}
            <Outlet />
        </>
    )
}

export default Layout;