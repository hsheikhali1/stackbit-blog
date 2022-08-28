import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import type * as types from "../src/types";

import { DynamicComponent } from "../src/components/DynamicComponent";
import { getAllPageSlugs, getPage } from "./api/contentful";

export type Props = {
  page: types.Page & {
    fields: types.Page;
  };
};

const Page: React.FC<Props> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.fields.title}</title>
        <meta name="viewport" content="wid=device-width, initial-scale=1" />
      </Head>
      example baby
      {page.fields.sections?.map((section, index) => (
        <DynamicComponent key={index} {...section} />
      ))}
    </>
  );
};

export default Page;

export const getStaticPaths = async () => {
  const slugs = await getAllPageSlugs();
  console.log(slugs);

  const paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug.split("/"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[];
  const page = await getPage(slug.join("/"));

  return {
    props: {
      page,
    },
  };
};
