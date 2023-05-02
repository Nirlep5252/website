import Head from "next/head";

interface Props {
  title: string;
  icon?: string;
}

export default function SEO(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} key="title" />
      <link rel="icon" href={props.icon} />
    </Head>
  );
}
