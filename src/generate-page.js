import { readFileSync } from "fs";
import { resolve } from "path";
import generateTableOfContents from "./genereate-toc.js";
import generateNavigation from "./generate-nav.js";
import config from "../config.js";
import getHeader from "./get-header.js";
import getFooter from "./get-footer.js";
import getLogo from "./get-logo.js";

export default function generatePage({ dir, content = '', meta = {}, lang = config.DEFAULT_LANG } = {}){
    const templateHtml = readFileSync(resolve(import.meta.dirname, 'template.html'), { encoding: config.ENCODING });
    const htmlWithContentOnly = templateHtml.replace('%content%', content);
    const logo = getLogo(dir, lang);
    const header = getHeader(dir, lang);
    const footer = getFooter(dir, lang);
    const toc = meta.generateTOC ? generateTableOfContents(htmlWithContentOnly, lang) : "";
    const html = htmlWithContentOnly
        .replaceAll('%logo%', logo)
        .replaceAll('%header%', header)
        .replaceAll('%lang%', lang)
        .replaceAll('%encoding%', config.ENCODING)
        .replaceAll('%page_title%', meta.title)
        .replaceAll('%table_of_contents%', toc)
        .replaceAll('%nav%', generateNavigation(lang))
        .replaceAll('%footer%', footer);
    return html;
}