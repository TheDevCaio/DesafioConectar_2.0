import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <style>{`
            #global-loader {
              position: fixed;
              top: 0; left: 0;
              width: 100vw;
              height: 100vh;
              background: #f6f1eb;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              transition: opacity 0.4s ease;
            }

            .pudim {
              width: 100px;
              height: 100px;
              background: radial-gradient(circle at center, #f7c95b 40%, #d59b27 100%);
              border-radius: 50% 50% 40% 40% / 60% 60% 30% 30%;
              animation: wobble 1.3s infinite ease-in-out;
              box-shadow: 0 0 25px rgba(0,0,0,0.1);
            }

            @keyframes wobble {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(2deg); }
              50% { transform: rotate(-2deg); }
              75% { transform: rotate(1deg); }
            }
          `}</style>
        </Head>
        <body>
          <div id="global-loader">
            <div className="pudim"></div>
          </div>

          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('load', () => {
                  const loader = document.getElementById('global-loader');
                  if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 400);
                  }
                });
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}