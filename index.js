require("dotenv").config();
const fetch = require("node-fetch");
const admZip = require("adm-zip");
const localesDir = `${process.cwd()}/${process.env.LOCALES_DIR}`;
const PROJECT = process.env.CROWDIN_PROJECT;
const KEY = process.env.CROWDIN_KEY;
const url = "https://api.crowdin.com/api/project";
const builtUrl = `${url}/${PROJECT}/export?key=${KEY}`;
const downloadUrl = `${url}/${PROJECT}/download/all.zip?key=${KEY}`;

async function main() {
  console.log("Creating latest build...");
  await fetch(builtUrl);

  console.log("Downloading latest build...");
  const body = await fetch(downloadUrl);
  const buffer = await body.buffer();
  const zip = new admZip(buffer);

  console.log("Updating local files...");
  zip.extractAllTo(localesDir + "/", true);
}

try {
  main();
} catch (error) {
  console.log("Something went wrong.");
  console.log(error);
}
