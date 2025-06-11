import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ weight: ["400"], subsets: ["latin"] });

const LigtherTheme = ({
  Header,
  Sidebar,
  Footer,
  children,
}: {
  Header?: FC;
  Sidebar?: FC;
  Footer?: FC;
  children: ReactNode;
}) => {


  return (
    <>
      <a
        href="#main-content"
        className="absolute left-0 top-0 bg-accent text-white py-2 px-4 z-50 transform -translate-y-full focus:translate-y-0 transition"
      >
        Skip to main content
      </a>
      <div className={` ${styles.LightTheme} ${firaSans.className} relative`}>
        {Header && <Header />}
        <div className="content-wrapper">
          {Sidebar && <Sidebar />}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        {Footer && <Footer />}
      </div>
    </>
  );
};

export default LigtherTheme;
