import config from "../config.js";
import { onMenuPages } from "../index.js";

export default function generateNavigation(lang) {
  /**
   * @param {Array<{
   * url: string;
   * metas: Record<string, object>;
   * }>} pages 
   * @param {string} parentUrl 
   */
  function buildMenu(pages, parentUrl = '') {
    let menu = '';

    pages
      .filter(page => page.url.startsWith(parentUrl) && page.url.replace(parentUrl, '').split('/').length === 2) // Get child pages
      .forEach(page => {
        const meta = page.metas[lang] ?? page.metas[config.DEFAULT_LANG];
        const title = meta.title || page.url.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); // Create title from URL
        let li = `<li class="pure-menu-item"><a class="pure-menu-link" href="${page.url}">${title}</a>`;

        // Find if there are subpages and recursively build the submenu
        const subPages = onMenuPages.filter(subPage => subPage.url.startsWith(`${page.url}/`));
        if (subPages.length > 0) {
          li += '<ul>'
          li += buildMenu(subPages, page.url); // Add sub-menu inside the <li> if there are subpages
          li += "</ul>"
        }

        li += '</li>';
        menu += li;
      });
    return menu;
  }

  // Get only top-level pages (without slashes beyond the root)
  const topLevelPages = onMenuPages.filter(page => page.url.split('/').length === 2);
  return buildMenu(topLevelPages);
}