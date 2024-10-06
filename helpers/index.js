import config from "../config.js";

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
