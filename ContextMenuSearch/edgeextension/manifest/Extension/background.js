var results = [];

function removeContextMenu(){
    browser.contextMenus.removeAll();
}

function createContextMenu() {
    console.log("***create contextmenu***");
    var data;
    var options = [];
    if ((data = window.localStorage.data)) {
        options = data;
    }
    console.log(options);
    if (options.length == 0) {
        options = default_options;
    }
    var _title;
    for (var ix = 0; ix < options.length; ix++) {
        _title = options[ix][0];
        console.log("contextmenu:" + _title);
        browser.contextMenus.create({
            id: '' + ix,
            title: _title,
            contexts: ['selection'],
            type: "normal",
            onclick: onClickContextMenu
        });
    }
}

function onClickContextMenu(info, tab) {
    var ix = parseInt(info.menuItemId);
    var _url = options[ix][1];
    var __url = _url.replace('%s', info.selectionText);
    browser.tabs.create({ url: __url, index: tab.index + 1 });
}