import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const SubjectDrawer = dynamic(() => import('../../../../../components/subject/SubjectDrawer'))

const Subject = () => {
    return (
        <div>
            <Head>
                <title>Subject | Alta Online Learning</title>
            </Head>
            <SubjectDrawer />
        </div>
    );
}

export default Subject;