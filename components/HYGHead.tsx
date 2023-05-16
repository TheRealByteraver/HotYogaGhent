import Head from "next/head";

const HYGHead = (props: { title: string }) => {
  return (
    <Head>
    <title>{props.title}</title>
    <meta
      name="description"
      content="Welcome to the website of Hot Yoga Ghent"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>    
  );
}

export default HYGHead;