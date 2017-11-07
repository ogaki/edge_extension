var default_options = [
    ['google', 'https://www.google.com/search?q=%s'],
    ['bing', 'https://www.bing.com/search?q=%s'],
    ['duckduckgo', 'https://www.duckduckgo.com/?q=%s']];


function onCreated() {
    if (browser.runtime.lastError) {
        console.log('Error: ${browser.runtime.lastError}');
    } else {
        console.log("Item created successfully");
    }
}

//browser.runtime.onInstalled.addListener(function () {
var data = window.localStorage.getItem('data');
var options = default_options;
if (data) {
    //convert json to array
}
var _title;
for (var ix = 0; ix < options.length; ix++) {
    _title = options[ix][0];
    browser.contextMenus.create({
        id: '' + ix,
        title: _title,
        contexts: ['selection'],
        type: "normal",
        onclick: onClickContextMenu
    }, onCreated);
}

function onClickContextMenu(info, tab) {
    var ix = parseInt(info.menuItemId);
    var _url = options[ix][1];
    var __url = _url.replace('%s', info.selectionText);
    browser.tabs.create({ url: __url, index: tab.index + 1 });
}
