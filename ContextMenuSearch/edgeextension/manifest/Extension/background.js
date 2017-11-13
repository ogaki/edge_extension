//var results = [];

function init() {
    console.log("***background.js init***");
    createContextMenu();
}

function removeContextMenu() {
    browser.contextMenus.removeAll();
}

function createContextMenu() {
    console.log("***create contextmenu***");
    var options;
    if (localStorage.data) {
        options = JSON.parse(localStorage.getItem('data'));
    } else if (sessionStorage.data) {
        options = JSON.parse(sessionStorage.getItem('data'));
        localStorage.removeItem('data');
        localStorage.setItem('data', options);
    } else {
        var opt = '[';
        for (let i = 0; i < default_options.length; i++) {
            opt += '["' + default_options[i][0]
                + '","' + default_options[i][1]
                + '","' + default_options[i][2]
                + '"],';
        }
        opt = opt.substring(0, opt.length - 1) + ']';
        options = opt; //JSON.parse(opt);
        sessionStorage.setItem('data', options);
        localStorage.removeItem('data');
        localStorage.setItem('data', options);
    }
    console.log(options);

    var _chk, _title;
    for (var ix = 0; ix < options.length; ix++) {
        _chk = options[ix][0];
        if (_chk == 'ON') {
            _title = options[ix][1];
            console.log("contextmenu:" + _title);
            browser.contextMenus.create({
                id: '' + ix,
                title: _title + browser.i18n.getMessage("title"), // + "%s",
                contexts: ['selection'],
                type: "normal",
                //onclick: onClickContextMenu
                onclick: function (info, tab) {
                    var ix = parseInt(info.menuItemId);
                    var _url = options[ix][2];
                    var __url = _url.replace('%s', info.selectionText);
                    browser.tabs.create({ url: __url, index: tab.index + 1 });
                }
            });
        }
    }
    /*     function onClickContextMenu(info, tab) {
            var ix = parseInt(info.menuItemId);
            var _url = options[ix][2];
            var __url = _url.replace('%s', info.selectionText);
            browser.tabs.create({ url: __url, index: tab.index + 1 });
        }
     */
}