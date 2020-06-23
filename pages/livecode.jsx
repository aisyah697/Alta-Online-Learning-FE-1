import React from "react";
import Head from "next/head";
import SubjectDrawer from "../components/SubjectDrawer";

export default function Subject() {
  return (
    <React.Fragment>
      <Head>
        <title>Exam | Alta Online Learning</title>
      </Head>
      <SubjectDrawer />
    </React.Fragment>
  );
}
