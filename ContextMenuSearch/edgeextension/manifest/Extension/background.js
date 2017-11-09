//(function (global) {

var default_options = [
    ['google', 'https://www.google.com/search?q=%s'],
    ['bing', 'https://www.bing.com/search?q=%s'],
    ['duckduckgo', 'https://www.duckduckgo.com/?q=%s']];
/*
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
};
*/
function createContextMenu() {
    var data = window.localStorage.data;
    console.log("data:" + data);
    var options = default_options;
    if (data) {
        //convert json to array
        console.log("***localStorage.getItem***");
        var json = JSON.parse(data);
        var html = json2html(json);
        console.log(html);
    };
    console.log("***create contextmenu***");
    var _title;
    for (var ix = 0; ix < options.length; ix++) {
        _title = options[ix][0];
        browser.contextMenus.create({
            id: '' + ix,
            title: _title,
            contexts: ['selection'],
            type: "normal",
            onclick: onClickContextMenu
        });
    };

    function onClickContextMenu(info, tab) {
        var ix = parseInt(info.menuItemId);
        var _url = options[ix][1];
        var __url = _url.replace('%s', info.selectionText);
        browser.tabs.create({ url: __url, index: tab.index + 1 });
    };
}