//var results = [];

function init() {
    console.log("***background.js init***");
    var options;
    if (!window.localStorage.data) {
    }
    createContextMenu();
}

function removeContextMenu() {
    browser.contextMenus.removeAll();
}

function createContextMenu() {
    console.log("***create contextmenu***");
    var options;
    if (window.localStorage.data) {
        options = JSON.parse(window.localStorage.getItem('data'));
    } else{
        console.log('no localstorage');
        return;
    }
    console.log(options);
    // if (!options || options.length == 0) {
    //     options = default_options;
    // }
    var _chk, _title;
    for (var ix = 0; ix < options.length; ix++) {
        _chk = options[ix][0];
        if (_chk == 'ON') {
            _title = options[ix][1];
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
        var _url = options[ix][2];
        var __url = _url.replace('%s', info.selectionText);
        browser.tabs.create({ url: __url, index: tab.index + 1 });
    }
}