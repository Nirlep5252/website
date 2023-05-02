import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="selection:bg-red-600 selection:bg-opacity-70">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
