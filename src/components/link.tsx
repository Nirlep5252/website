import Link from "next/link";

interface LinkProps {
    href: string;
    text: string;
    classes?: string;
}

export default function UwULink(props: LinkProps) {
    return (
        <>
            <Link href={props.href} className={`${props.classes} relative uwu-link text-white`}>
                {props.text}
                <span className="underline h-0.5 bg-red-500 absolute -bottom-0.5 right-0 w-2/5 transition-all duration-200 ease-linear"></span>
            </Link>
        </>
    )
}