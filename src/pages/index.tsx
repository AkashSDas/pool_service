import Head from "next/head";
import React from "react";
import ContactUs from "../components/contact_us";
import Info from "../components/info";
import PaymentForm from "../components/payment_form";

const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pool Service</title>
      </Head>

      <main>
        <div className="background"></div>
        <div className="foreground">
          <h1>Pool Service</h1>

          <Info text="🐳 We provide pool services all over the world" />

          <section className="content">
            <ContactUs />
            <PaymentForm />
          </section>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
