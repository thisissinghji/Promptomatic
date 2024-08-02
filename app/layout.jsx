import Nav from "@components/Nav";
import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptomatic",
  description:
    "A page where people can share their prompts so that others can use them for inspiration.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
