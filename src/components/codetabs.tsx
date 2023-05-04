import React from "react";

export default function CodeTabs(props: {
  children: React.ReactNode;
  langs: string[];
}) {
  console.log(props.langs);

  ("use client");
  const [active, setActive] = React.useState(0);
  const codes = React.Children.toArray(props.children);

  console.log(codes);

  ("use server");
  return (
    <>
      <div className="code-tabs-container">
        <div className="code-tabs flex glassmorphism w-fit rounded-full">
          {props.langs.map((lang) => {
            console.log(props.langs)
            return (
              <>
                <div onClick={() => {
                  setActive(props.langs.indexOf(lang));
                }} className={`hover-glassmorphism border cursor-pointer py-1.5 px-3 rounded-full ${props.langs[active] === lang ? "glassmorphism border-gray-200" : ""}`}>
                  {lang}
                </div>
              </>
            );
          })}
        </div>
        <div className="code my-4">{codes[active]}</div>
      </div>
    </>
  );
}
