import { onMenuPages } from "../index.js";

export default function generateNavigation(lang){
    return onMenuPages.map(({url, metas}) => {
        const meta = metas.find(meta => meta.lang === lang) || metas[0];
        const title = meta.title || new URL(url).pathname.replace('/', '');
        return `<li><a href="${url}">${title}</a></li>`
    }).join('');
}