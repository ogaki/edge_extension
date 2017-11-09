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
var results = [];
function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property);
            } else {
                //console.log(property + "   " + obj[property]);
                //if (property == 'class') {
                //    if (obj[property] == 'table-title'
                //        || obj[property] == 'table-url') {
                //    }
                //} else 
                if (property == 'value') {
                    results.push(obj[property]);
                }
            }
        }
    }
}

function createContextMenu() {
    var data = window.localStorage.data;
    console.log("data:" + data);
    var options = [];
    if (data) {
        //convert json to array
        console.log("***localStorage.getItem***");
        var json = JSON.parse(data);
        //var html = json2html(json);
        iterate(json, '');
        console.log(results);
        for(var ix=0; ix < results.length/2; ix+=2) {
            options.push([results[ix], results[ix+1]]);
            console.log(options);
        }
    };
    console.log("***create contextmenu***");
    if (options.length == 0) {
        options = default_options;
    }

    //TODO: contextMenus.removeAll

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