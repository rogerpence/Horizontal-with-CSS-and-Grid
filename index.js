function TabsManager4(tabsOwnerSelector)
{
    this.tabsOwnerSelector = tabsOwnerSelector;
    this.currentTabId = null;
    this.assignClickHandlers();
    this.selectDefaultTab();
}

TabsManager4.prototype.assignClickHandlers = function()
{
    let tabs = Array.from(document.querySelectorAll(`${this.tabsOwnerSelector} > div.tab-container > div`));

    let tabSelected = false;

    tabs.forEach(element => {       
        element.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-disabled')) {
                return;
            }

            let tabId = e.target.getAttribute('data-tab');
            this.selectTab(tabId);
        });
    });
    
    // this.selectInitialTab();
};

TabsManager4.prototype.selectInitialTab = function() 
{
    let tabs = Array.from(document.querySelectorAll(`${this.tabsOwnerSelector} > div.tab-container > div`));
    let tabSelected = false;

    tabs.forEach(element => {
        if (element.hasAttribute('data-selected')) {
            tabSelected = true;
            this.selectTab(element.getAttribute('data-tab'));
        }
    });

    if (!tabSelected) {
        let firstTabElement = document.querySelector(`${this.tabsOwnerSelector} > div.tab-container > div:first-child`);
        this.selectTab(firstTabElement.getAttribute('data-tab'));
    }
}   

TabsManager4.prototype.enableTab = function(tabId) {
    let currentTabElement = this.getTabByDataTabAttribute(tabId);
    currentTabElement.removeAttribute('data-disabled');
}

TabsManager4.prototype.disableTab = function(tabId) {
    let currentTabElement = this.getTabByDataTabAttribute(tabId);
    currentTabElement.setAttribute('data-disabled','');
}

TabsManager4.prototype.selectDefaultTab = function() 
{
    let defaultTabElement;

    let tabs = Array.from(document.querySelectorAll(`${this.tabsOwnerSelector} > div.tab-container > div`));
    defaultTabElement = tabs[0];
    tabs.forEach((element, index) => {
        this.unselectCurrentTab(element.getAttribute('data-tab'));
        if (element.hasAttribute('data-selected')) {
            console.log(`selected element is ${element.getAttribute('data-tab')}`);
            defaultTabElement = element;
        }
    });

    this.selectTab(defaultTabElement.getAttribute('data-tab'));
}

TabsManager4.prototype.unselectAllTabs = function(tabId) 
{
    let tabs = Array.from(document.querySelectorAll(`${this.tabsOwnerSelector} > div.tab-container > div`));
    tabs.forEach(element => {
        this.unselectCurrentTab(element.getAttribute('data-tab'));
    });
}

TabsManager4.prototype.unselectCurrentTab = function(tabId)
{
    if (! this.currentTabId) {
        return;
    }

    let currentTabElement = this.getTabByDataTabAttribute(this.currentTabId);
    currentTabElement.removeAttribute('data-selected');

    let tabContentId = currentTabElement.getAttribute('data-tab');
    this.setTabContentElementDisplay(tabContentId, 'none');
}

TabsManager4.prototype.getTabByDataTabAttribute = function(tabId)
{
    const tabElement = document.querySelector(`${this.tabsOwnerSelector} > div.tab-container > div[data-tab="${tabId}"]`);
    return tabElement;
};

TabsManager4.prototype.setTabContentElementDisplay = function(tabId, display)
{
    let tabInfoElement = document.querySelector(`${this.tabsOwnerSelector} section.${tabId}`);
    tabInfoElement.style.display = display;
};

TabsManager4.prototype.selectTab = function(tabId)
{
    this.unselectAllTabs();
    // this.unselectCurrentTab();
    this.currentTabId = tabId;

    const tabElement = this.getTabByDataTabAttribute(tabId);
    tabElement.setAttribute('data-selected', '');

    this.setTabContentElementDisplay(tabId, 'block');
};


const tm4 = new TabsManager4('div.container');
tm4.enableTab('tab-3');
tm4.disableTab('tab-4');

const tm5 = new TabsManager4('div.other-container');
