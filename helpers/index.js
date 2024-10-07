import config from "../config.js";
import showdown from "showdown";
const converter = new showdown.Converter();
converter.setOption('ghCompatibleHeaderId', true);

export function metadata({
    title = "",
    description = "",
    keywords = [],
    image = "",
    icon = "",
    lang = config.DEFAULT_LANG,
    generateTOC = true,
  } = {}) {
  return { title, description, keywords, image, icon, lang, generateTOC };
}

export function markdownToHtml(text){
  return converter.makeHtml(text);
}