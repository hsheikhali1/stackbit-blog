import { createClient } from "contentful";
import dotenv from "dotenv";

dotenv.config();

const TYPE_PAGE = "page";

const isDev = process.env.NODE_ENV === "development";

if (!process.env.CONTENTFUL_PREVIEW_TOKEN) {
  throw new Error("Contentful preview token was not defined");
}

if (!process.env.CONTENTFUL_DELIVERY_TOKEN) {
  throw new Error("Contentful delivery token was not defined");
}

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error("Contentful space id was not defined");
}

export async function getEntries(
  type: string,
  queryParams?: Record<string, string>
) {
  const client = createClient({
    accessToken: isDev
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_DELIVERY_TOKEN as string),
    space: process.env.CONTENTFUL_SPACE_ID as string,
    host: isDev ? "preview.contentful.com" : "cdn.contentful.com",
  });

  return client
    .getEntries({
      content_type: type,
      ...queryParams,
      include: 10,
    })
    .then((response) => response.items.map(mapEntry));
}

function mapEntry(entry: any) {
  return {
    _id: entry.sys?.id,
    _type: entry.sys?.contentType?.sys.id || entry.sys?.type,
    fields: Object.entries(entry.fields).reduce(
      (acc: Record<string, any>, [key, value]) => {
        acc[key] = parseField(value);
        return acc;
      },
      {}
    ),
  };
}

function parseField(value: any) {
  if (typeof value === "object" && value.sys) {
    return mapEntry(value);
  }
  if (Array.isArray(value)) {
    return value.map(mapEntry);
  }

  return value;
}

export async function getPage(slug: string) {
  return getEntries(TYPE_PAGE, {
    "fields.slug": slug,
  }).then((items) => (items.length > 0 ? items[0] : null));
}

export async function getAllPageSlugs(): Promise<string[]> {
  return getEntries(TYPE_PAGE).then((pages) =>
    pages.map((page) => page.fields.slug)
  );
}
