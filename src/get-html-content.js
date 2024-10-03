import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import showdown from "showdown";
import config from "../config.js";

const converter = new showdown.Converter();
converter.setOption('ghCompatibleHeaderId', true);

export default function getHtmlContent(dir, lang){
    const files = readdirSync(dir);
    const contentFile = files.find(fileName => fileName === `content_${lang}.md`) || 'content.md';
    return converter.makeHtml(readFileSync(join(dir, contentFile), config.ENCODING));
}