import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home | Alta Online Learning</title>
      </Head>

      <main>
        <NavigationBar />
        <Footer />
      </main>
    </React.Fragment>
  );
}
