import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
        <link rel="stylesheet" href="/styles.css" />
		
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}