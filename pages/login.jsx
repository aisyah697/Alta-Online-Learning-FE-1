import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Login from "../components/Login";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home | Alta Online Learning</title>
      </Head>

      <main>
        <NavigationBar />
        <Login />
      </main>
    </React.Fragment>
  );
}
