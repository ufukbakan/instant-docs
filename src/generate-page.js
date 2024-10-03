import { readFileSync } from "fs";
import { resolve } from "path";
import generateTableOfContents from "./genereate-toc.js";
import generateNavigation from "./generate-nav.js";
import config from "../config.js";

export default function generatePage({ content = '', meta = {}, lang = 'en' } = {}){
    const templateHtml = readFileSync(resolve(import.meta.dirname, 'template.html'), { encoding: config.ENCODING });
    const htmlWithContentOnly = templateHtml.replace('%content%', content);
    const toc = generateTableOfContents(htmlWithContentOnly);
    const html = htmlWithContentOnly
        .replace('%encoding%', config.ENCODING)
        .replace('%page_title%', meta.title)
        .replace('%table_of_contents%', toc)
        .replace('%nav%', generateNavigation(lang));
    return html;
}