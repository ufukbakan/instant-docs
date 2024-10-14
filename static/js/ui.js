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
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("focus", () => {
        getElements().searchResultContainer.classList.remove("hide");
    });
    searchBar.addEventListener("blur", (e) => {
        if(e.relatedTarget.id !== 'search-bar' && !elements.searchResultContainer.contains(e.relatedTarget)){
            elements.searchResultContainer.classList.add('hide');
        }
    });
    
    const expandButtons = document.querySelectorAll('.expand-button');
    expandButtons.forEach(button => {
        button.addEventListener('change', function(){
            const parentList = this.parentElement.parentElement.parentElement;
            parentList.classList.toggle('expanded');
        });
    });

    document.querySelectorAll('nav a').forEach(a => {
        if(a.href === location.href){
            expandAllParentLists(a);
        }
    });

    /**
     * @param {HTMLElement} node 
     */
    function expandAllParentLists(node){
        if (node == undefined) return;
        if (node.tagName === 'LI'){
            node.classList.add('expanded');
        }
        return expandAllParentLists(node.parentElement);
    }


}(this, this.document));
