/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
// panggil file "style.module.css"
import style from "./styles/style.module.css";

// panggil file tailwind
import "tailwindcss/tailwind.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "View Data Karya",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* tambahkan favicon */}
        <link
          rel="shortcut icon"
          href="../images/favicon.png"
          type="image/x-icon"
        />
        {/*  tambahkan cdn fontawesome*/}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>

      <body className={style.layout}>
        <header className={`${style.header}`}>
          <img src="../images/laut.png" alt="Logo" />
        </header>

        {/* <div class="abc def hij"></div> */}
        <section className={`${style.content} ${style.content_bg}`}>
          {children}
        </section>

        <footer className={style.footer}>&copy; 2024 | SIRSAK TEAM </footer>
      </body>
    </html>
  );
}
