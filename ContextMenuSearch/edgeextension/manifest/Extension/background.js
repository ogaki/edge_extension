var title = browser.i18n.getMessage("title");
var title_google = browser.i18n.getMessage("title_google");
var title_bing = browser.i18n.getMessage("title_bing");
var title_duckduckgo = browser.i18n.getMessage("title_duckduckgo");

function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

//browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
        id: 'menu_search_google',
        title: title_google,
        contexts: ['selection'],
        type: "normal",
        onclick: (info, tab) => {
            let url =
                'https://www.google.com/search?q=' + info.selectionText;
            browser.tabs.create({ url: url, index: tab.index + 1 });
        }
    }, onCreated);
    browser.contextMenus.create({
        id: 'menu_search_bing',
        title: title_bing,
        contexts: ['selection'],
        type: "normal",
        onclick: (info, tab) => {
            let url =
                'https://www.bing.com/search?q=' + info.selectionText;
            browser.tabs.create({ url: url, index: tab.index + 1 });
        }
    }, onCreated);
    browser.contextMenus.create({
        id: 'menu_search_duckduckgo',
        title: title_duckduckgo,
        contexts: ['selection'],
        type: "normal",
        onclick: (info, tab) => {
            let url =
                'https://duckduckgo.com/?q=' + info.selectionText;
            browser.tabs.create({ url: url, index: tab.index + 1 });
        }
    }, onCreated);
//});
