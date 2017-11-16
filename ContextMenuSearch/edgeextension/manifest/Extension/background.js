var options;

//browser.runtime.onInstalled.addListener(function() {
//    console.log(details.reason);
    init();
//});
  
function init() {
    console.log("***background.js init***");
    //var options;
    if (localStorage.data) {
        options = JSON.parse(localStorage.getItem('data'));
    } else {
        console.log("no localstorage.data - set default");
        options = default_options;
        var json = defaultOptJSON();
        localStorage.removeItem('data');
        localStorage.setItem('data', json);
    }
    console.log(options);
    createContextMenu();
}


function defaultOptJSON() {
    var opt = '[';
    for (var i = 0; i < default_options.length; i++) {
        opt += '["' + default_options[i][0]
            + '","' + default_options[i][1]
            + '","' + default_options[i][2]
            + '"],';
    }
    opt = opt.substring(0, opt.length - 1) + ']';
    return opt;
}


function update(optJSON) {
    browser.contextMenus.removeAll();
    options = JSON.parse(optJSON);
    localStorage.removeItem('data');
    localStorage.setItem('data', optJSON);
    createContextMenu();
}

function onCreated() {
    if (browser.runtime.lastError) {
        console.error(browser.runtime.lastError);
    } else {
        console.log("Item created successfully");
    }
}

function createContextMenu() {
    console.log("***background.js createContextMenu***");
    var _chk;
    for (var i = 0; i < options.length; i++) {
        _chk = options[i][0];
        if (_chk == 'ON') {
            // _contextMenu(i);
            _title = options[i][1];
            console.log("contextMenu:" + _title);
            browser.contextMenus.create({
                id: '' + i,
                title: _title + browser.i18n.getMessage("title"),
                contexts: ['selection']
            }, onCreated);
        }
    }
}

browser.contextMenus.onClicked.addListener(function (info, tab) {
    var ix = parseInt(info.menuItemId);
    var url = options[ix][2];
    var __url = url.replace('%s', info.selectionText);
    browser.tabs.create({ url: __url, index: tab.index + 1 });
})