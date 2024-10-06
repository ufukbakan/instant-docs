// @ts-check
import express from "express";
import { readdirSync, statSync } from "fs";
import { join, relative, resolve, sep } from "path";
import generatePage from "./src/generate-page.js";
import getHtmlContent from "./src/get-html-content.js";
import { metadata } from "./helpers/index.js";
import detectLanguage from "./middlewares/detect-language.js";
import config from "./config.js";

export const app = express();

const {
  PORT
} = config;

app.use(detectLanguage);
app.use('/', express.static('./static'));

async function readDirAndSetRoutes({parent = '/', dir = './pages/on-menu'} = {}){
  const dirs = readdirSync(dir);
  const promises = dirs.map(async (element) => {
    /** @type {Array<{url: string, metas: Array<Object>}>} */ const pages = [];
    const absolute = resolve(dir, element);
    if(statSync(absolute).isDirectory()){
      const subPages = await readDirAndSetRoutes({ parent: join(parent, element), dir: join(dir, element)});
      pages.push(...subPages);
    } else {
      if(element.startsWith('content') && !pages.some(page => page.url === absolute)){
        const url = parent.split(sep).join('/');
        const metas = await getMetadatas(dir);
        pages.push({ url, metas });
        app.get(url, (_req, res) => {
          const { content, lang } = getHtmlContent(dir, res.locals.detectedLanguage);
          const meta = metas.find(meta => meta.lang === lang) || metas[0];
          res.contentType('html').send(generatePage({ content, meta, lang }));
        });
      }
    }
    return pages;
  });
  const results = await Promise.all(promises);
  return results.reduce((acc, current) => ([...acc, ...current]), []);
}

export const onMenuPages = await readDirAndSetRoutes();
export const offMenuPages = await readDirAndSetRoutes({dir: './pages/off-menu'});

console.log({
  onMenuPages,
  offMenuPages
})

async function getMetadatas(dir = '/'){
  const files = readdirSync(dir);
  const metaFiles = files.filter(fileName => fileName.startsWith('meta') && fileName.endsWith('.js'));
  if(metaFiles.length === 0){
    return [metadata()];
  }
  const relativeDirs = metaFiles.map(metaFile => './'.concat(relative(import.meta.dirname, resolve(dir, metaFile))));
  const metaModules = await Promise.all(relativeDirs.map(async metaDir => await import(metaDir)));
  return metaModules.map(m => m.default);
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));