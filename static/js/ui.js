(function (window, document) {
    function getElements() {
        return {
            layout: document.getElementById('layout'),
            menu: document.getElementById('menu'),
            menuLink: document.getElementById('menuLink'),
            searchResultContainer: document.getElementById('search-result-container')
        };
    }
    const elements = getElements();
    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/);
        var length = classes.length;
        var i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }
    function toggleAll() {
        var active = 'active';

        toggleClass(elements.layout, active);
        toggleClass(elements.menu, active);
        toggleClass(elements.menuLink, active);
    }
    /**
     * @param {MouseEvent} e 
     */
    function handleEvent(e) {        
        if (e.target.id === elements.menuLink.id) {
            toggleAll();
            e.preventDefault();
        } else if (elements.menu.classList.contains('active')) {
            toggleAll();
        }

        if(e.target.id !== 'search-bar' && !elements.searchResultContainer.contains(e.target)){
            elements.searchResultContainer.classList.add('hide');
        }
    }
    document.addEventListener('click', handleEvent);

    const debounceTimers = {};
    const searchContext = {
        input: '',
        results: [],
    }
    function debounceByKey(key, ms = 750){
        return (f) => (...args) => {
            clearTimeout(debounceTimers[key]);
            debounceTimers[key] = setTimeout(() => f(...args), ms);
        }
    }

    window.lang = document.getElementsByTagName("html")[0].lang;
    const cb = debounceByKey("searchInput")(e => console.log(e.target.value));
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("focus", () => {
        getElements().searchResultContainer.classList.remove("hide");
    });
    searchBar.addEventListener("blur", (e) => {
        if(e.relatedTarget.id !== 'search-bar' && !elements.searchResultContainer.contains(e.relatedTarget)){
            elements.searchResultContainer.classList.add('hide');
        }
    });

    document.getElementById("search-bar").addEventListener("input", (e) => {
        cb(e);
    });
}(this, this.document));
