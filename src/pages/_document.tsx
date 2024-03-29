import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Fira+Code:wght@300;400;500;600;700&family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300;400;500;600;700&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="https://raw.githubusercontent.com/Nirlep5252/website-old/master/public/icon.png" />
      </Head>
      <body className="selection:bg-white selection:text-black selection:bg-opacity-70">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
