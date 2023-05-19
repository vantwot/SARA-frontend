import React from "react";
import { Header } from "./";
import { Outlet } from "react-router";

const Layout = ({ children, categories }) => {

    return (
        <>
            <Header
                categories={categories}
             />
            {/* {children} */}
            <Outlet />
        </>
    )
}

export default Layout;