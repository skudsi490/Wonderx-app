// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="modal-root"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
