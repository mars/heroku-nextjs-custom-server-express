import Document, { Html, Head, Main, NextScript } from "next/document";

/*
HTML Document that captures `NEXT_APP_`-prefixed server-side 
environment variables into a global JavaScript `env` object.
*/
class EnvDocument extends Document {
  static async getInitialProps() {
    return { env: this.getEnv() };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `env = ${JSON.stringify(this.props.env)};`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static getEnv() {
    let env = {};
    if (process && process.env) {
      env = Object.entries(process.env)
        .filter(e => e[0].match(/^NEXT_APP_/))
        .reduce((accum, [k, v]) => {
          accum[k] = v;
          return accum;
        }, {});
    }
    return env;
  }
}

export default EnvDocument;
