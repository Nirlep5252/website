import { CodeBlock } from "./ui/CodeBlock";
import { type MDXComponents as MDXComponentsType } from "mdx/types";
import { type ReactNode } from "react";

interface PreProps {
  children: {
    props?: {
      children?: string;
      className?: string;
    };
  } & ReactNode;
}

const MDXComponents: MDXComponentsType = {
  pre: ({ children }: PreProps) => {
    const code = children?.props?.children ?? "";
    const className = children?.props?.className ?? "";
    const language = className.replace("language-", "");

    if (className.startsWith("language-")) {
      return <CodeBlock language={language}>{code}</CodeBlock>;
    }
    return <pre>{children}</pre>;
  },
};

export default MDXComponents;
