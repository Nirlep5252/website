import Link from "next/link";

interface LinkProps {
  href: string;
  text: string;
  classes?: string;
  external?: boolean;
}

export default function UwULink(props: LinkProps) {
  const classNames = `${props.classes} relative uwu-link text-white font-semibold`;
  const e = (
    <>
      {props.text}
      <span className="underline h-0.5 bg-red-500 absolute -bottom-0.5 left-0 w-2/5 transition-all duration-200 ease-linear"></span>
    </>
  );
  return (
    <>
      {props.external ? (
        <a className={classNames} href={props.href} target="_blank">
          {e}
        </a>
      ) : (
        <Link href={props.href} className={classNames}>{e}</Link>
      )}
    </>
  );
}
