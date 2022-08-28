import runContentfulExport, { Options } from "contentful-export";
import dotenv from "dotenv";

dotenv.config();

// this will get the token from a .env file or from the commandline
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || process.argv[2];
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || process.argv[3];
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || process.argv[4];

if (!MANAGEMENT_TOKEN) {
  throw new Error("Management token was not defined");
}

if (!SPACE_ID) {
  throw new Error("Space id was not defined");
}

if (!ENV_ID) {
  throw new Error("Env id was not defined");
}

const options: Options = {
  spaceId: SPACE_ID,
  environmentId: ENV_ID,
  managementToken: MANAGEMENT_TOKEN,
  exportDir: __dirname,
  contentFile: "export.json",
  downloadAssets: true,
};

runContentfulExport(options).then(() => {
  console.log("Data exported successfully");
}).catch((error) => {
  console.log('Error exporting content', error);
});
