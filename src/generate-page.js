import { readFileSync } from "fs";
import { resolve } from "path";
import generateTableOfContents from "./genereate-toc.js";
import generateNavigation from "./generate-nav.js";
import config from "../config.js";

export default function generatePage({ content = '', meta = {}, lang = config.DEFAULT_LANG } = {}){
    const templateHtml = readFileSync(resolve(import.meta.dirname, 'template.html'), { encoding: config.ENCODING });
    const htmlWithContentOnly = templateHtml.replace('%content%', content);
    const toc = meta.generateTOC ? generateTableOfContents(htmlWithContentOnly, lang) : "";
    const html = htmlWithContentOnly
        .replaceAll('%lang%', lang)
        .replaceAll('%encoding%', config.ENCODING)
        .replaceAll('%page_title%', meta.title)
        .replaceAll('%table_of_contents%', toc)
        .replaceAll('%nav%', generateNavigation(lang));
    return html;
}