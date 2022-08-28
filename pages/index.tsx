import { GetStaticProps } from "next";
import { getPage } from "./api/contentful";
import { DynamicComponent } from "../src/components/DynamicComponent";
import type * as types from "../src/types";

const Page = (props: types.Page) => {
  return (
    <DynamicComponent {...props} />
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
    const page = await getPage('/');
    const pageType = page?._type as string

    return {
      props: {
        _type: pageType[0].toUpperCase() + pageType.substring(1),
        page,
      }
    };
  };
