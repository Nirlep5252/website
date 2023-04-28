import React from "react";

interface SocialLinkProps {
    externalLink: string;
    icon: React.ReactNode;
    text: string;
}

export default function SocialLink(props: SocialLinkProps) {
    return (
        <button className="border border-transparent flex items-center justify-center gap-2 rounded-full hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-2 py-2 h-12 social-link" onClick={() => {
            window.open(props.externalLink, "_blank")
        }}>
            {props.icon}
            <span className="social-text flex items-center justify-center">{props.text}</span>
        </button>
    )
}