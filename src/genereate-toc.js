import { load } from "cheerio";

export default function generateTableOfContents(html){
    const $ = load(html);
    let toc = '<ul/>\n';
    $('h1[id]').each(function(){
        const text = $(this).text();
        const id = $(this).attr('id');
        toc += `  <li><a href="#${id}">${text}</a></li>\n`;
    });
    toc += '</ul>';
    return toc;
}