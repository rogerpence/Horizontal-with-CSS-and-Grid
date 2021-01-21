function TabsManager4(tabsOwnerSelector)
{
    this.tabsOwnerSelector = tabsOwnerSelector;
    this.assignClickHandlers();
    this.selectInitialTab();
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
};

TabsManager4.prototype.enableTab = function(tabId) {
    let currentTabElement = this.getTabElementByTabId(tabId);
    currentTabElement.removeAttribute('data-disabled');
}

TabsManager4.prototype.disableTab = function(tabId) {
    let currentTabElement = this.getTabElementByTabId(tabId);
    currentTabElement.setAttribute('data-disabled','');
}

TabsManager4.prototype.selectInitialTab = function() 
{
    let defaultTabElement;

    let tabs = Array.from(document.querySelectorAll(`${this.tabsOwnerSelector} > div.tab-container > div`));
    defaultTabElement = tabs[0];
    tabs.forEach((element) => {
        if (element.hasAttribute('data-selected')) {
            defaultTabElement = element;
        }
        this.unselectCurrentTab(element.getAttribute('data-tab'));
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
    let currentTabElement = this.getTabElementByTabId(tabId);
    currentTabElement.removeAttribute('data-selected');
    this.hideTabContent(tabId);
}

TabsManager4.prototype.getTabElementByTabId = function(tabId)
{
    const tabElement = document.querySelector(`${this.tabsOwnerSelector} > div.tab-container > div[data-tab="${tabId}"]`);
    return tabElement;
};

TabsManager4.prototype.showTabContent = function(tabId)
{
    let tabContentElement = document.querySelector(`${this.tabsOwnerSelector} section.${tabId}`);
    tabContentElement.style.display = 'block';
};

TabsManager4.prototype.hideTabContent = function(tabId)
{
    let tabContentElement = document.querySelector(`${this.tabsOwnerSelector} section.${tabId}`);
    tabContentElement.style.display = 'none';
};

TabsManager4.prototype.selectTab = function(tabId)
{
    this.unselectAllTabs();

    const tabElement = this.getTabElementByTabId(tabId);
    tabElement.setAttribute('data-selected', '');

    this.showTabContent(tabId);
};




const tm4 = new TabsManager4('div.container');
tm4.enableTab('tab-3');
tm4.disableTab('tab-4');

const tm5 = new TabsManager4('div.other-container');
