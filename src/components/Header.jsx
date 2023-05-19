import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "styles/header.css";

// const categories = [{ name: "Matricular", slug: "matricula" }, { name: "Tabulados", slug: "tabulados" }, { name: "Perfil", slug: "profile" }]

const Header = ({ categories }) => {

    const userInfo = useLocation().state;

    return (
        <div className="header-container">
            {/* <div className="top"> */}
            <div className="left">
                <span className="header-title">
                    SARA
                </span>
            </div>

            <div className="right">
                {categories.map((category) => (
                    <Link key={category.slug}
                        to={`/${category.slug}`}
                        className="link"
                        // target="_blank"
                        state={userInfo}
                    >
                        <span className="header-category">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
            {/* </div> */}
        </div>
    )
}

export default Header;