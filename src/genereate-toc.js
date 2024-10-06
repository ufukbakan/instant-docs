import { load } from "cheerio";
import dictionary from "../dictionary.js";

export default function generateTableOfContents(html, lang){
    const $ = load(html);
    let toc = `<h2>${dictionary.toc[lang]}</h2><ul/>`;
    $('h1[id]').each(function(){
        const text = $(this).text();
        const id = $(this).attr('id');
        toc += `<li><a href="#${id}">${text}</a></li>`;
    });
    toc += '</ul>';
    return toc;
}