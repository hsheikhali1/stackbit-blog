import Head from "next/head";
import { DynamicComponent } from "../DynamicComponent";

interface PageProps {
  _type: string;
  page: {
      _type: string;
      _id: string;
      fields: any;
    };
}

const Page = (props: PageProps) => {
  if (!props.page) {
    return null;
  }

  const { page: { _id, fields } } = props;

  return (
    <>
      <Head>
        <title>{fields.title}</title>
      </Head>
      <main data-sb-object-id={_id}>
        {fields.sections?.map((section: Record<string, any>, index: number) => {
          return (<DynamicComponent _type={section.type} key={`${section.type}-${index}`} {...section} />);
        })}
      </main>
    </>
  );
};

export type { PageProps };
export default Page;
