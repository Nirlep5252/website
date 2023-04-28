"use client"
import { usePathname } from "next/navigation";
import NavLink from "./navlink";
import React from "react";

export default function Navbar() {
    let path = usePathname();

    React.useEffect(() => {
        path = "/" + path.split("/")[1];
        const activeBg = document.getElementById("active-bg");
        const activeLink = document.querySelector(`[href="${path}"]`);
        const firstLink = document.querySelector(`[href="/"]`);
        if (activeLink !== null && activeBg !== null && firstLink !== null) {
            activeBg.style.width = `${activeLink.clientWidth}px`;
            activeBg.style.height = `calc(${activeLink.clientHeight}px + 12px)`;

            const firstLinkRects = firstLink.getClientRects()[0];
            const activeLinkRects = activeLink.getClientRects()[0];
            const top = activeLinkRects.top - firstLinkRects.top;
            const left = activeLinkRects.left - firstLinkRects.left;

            activeBg.style.top = `${top}px`;
            activeBg.style.left = `${left}px`;
        } else if (activeBg !== null) {
            activeBg.style.width = "0px";
            activeBg.style.height = "0px";
        }
    }, [path])

    return (
        <>
            <nav className="fixed left-1/2 flex z-50 -translate-x-1/2 mx-auto items-center justify-center w-fit mt-6 h-9 rounded-full">
                <div id="active-bg" className="bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100 h-9 rounded-full z-0 absolute bg transition-all duration-200 ease-linear flex items-center justify-center"></div>
                <NavLink text="home" href="/" />
                <NavLink text="posts" href="/posts" />
                <NavLink text="projects" href="/projects" />
                <NavLink text="adventures" href="/adventures" />
            </nav>
        </>
    )
}