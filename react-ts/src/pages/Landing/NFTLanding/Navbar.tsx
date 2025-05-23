import React, { useState, useEffect } from 'react';
import { Collapse, Container, NavbarToggler, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Scrollspy from "react-scrollspy";


//import Images
import logodark from "../../../assets/images/logo-dark.png";
import logolight from "../../../assets/images/logo-light.png";

const Navbar = () => {
    const [isOpenMenu, setisOpenMenu] = useState(false);
    const [navClass, setnavClass] = useState("");

    const toggle = () => setisOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    const scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setnavClass("is-sticky");
        } else {
            setnavClass("");
        }
    };

    const [activeLink, setActiveLink] = useState<any>();
    useEffect(() => {
        const activation = (event: any) => {
            const target: any = event.target;
            if (target) {
                target.classList.add('active');
                setActiveLink(target);
                if (activeLink && activeLink !== target) {
                    activeLink.classList.remove('active');
                }
            }
        };
        const defaultLink: any = document.querySelector('.navbar li.a.active');
        if (defaultLink) {
            defaultLink?.classList.add("active")
            setActiveLink(defaultLink)
        }
        const links = document.querySelectorAll('.navbar a');
        links.forEach((link) => {
            link.addEventListener('click', activation);
        });
        return () => {
            links.forEach((link) => {
                link.removeEventListener('click', activation);
            });
        };
    }, [activeLink]);

    return (
        <React.Fragment>
            <nav className={"navbar navbar-expand-lg navbar-landing fixed-top " + navClass} id="navbar">
                <Container>
                    <Link className="navbar-brand" to="/index">
                        <img src={logodark} className="card-logo card-logo-dark" alt="logo dark" height="17" />
                        <img src={logolight} className="card-logo card-logo-light" alt="logo light" height="17" />
                    </Link>

                    <NavbarToggler className="navbar-toggler py-0 fs-20 text-body" onClick={toggle} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler>

                    <Collapse
                        className="navbar-collapse"
                        id="navbarSupportedContent"
                        isOpen={isOpenMenu}
                    >
                        <Scrollspy
                            offset={-18}
                            items={[
                                "hero",
                                "wallet",
                                "marketplace",
                                "categories",
                                "creators",
                            ]}
                            currentClassName="active"
                            className="navbar-nav mx-auto mt-2 mt-lg-0"
                            id="navbar-example"
                        >
                            <li className="nav-item">
                                <NavLink className="fs-15 active" href="#hero">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="fs-15" href="#wallet">
                                    Wallet
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="fs-15" href="#marketplace">
                                    Marketplace
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="fs-15" href="#categories">
                                    Categories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="fs-15" href="#creators">
                                    Creators
                                </NavLink>
                            </li>
                        </Scrollspy>

                        <div className="">
                            <Link to="/apps-nft-wallet" className="btn btn-primary">Wallet Connect </Link>
                        </div>
                    </Collapse>
                </Container>
            </nav>
            <div className="bg-overlay bg-overlay-pattern"></div>
        </React.Fragment>
    );
};

export default Navbar;