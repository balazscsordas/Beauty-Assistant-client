import { Html, Head, Main, NextScript } from 'next/document'

// This file is the basic layout for every other page

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property='custom' content='yolo' /> {/* Random shit */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
