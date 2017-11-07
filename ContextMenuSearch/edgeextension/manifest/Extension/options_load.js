/*
var addListener = function (elm, type, func) {
    if (!elm) { return false; }
    if (elm.addEventListener) {
        elm.addEventListener(type, func, false);
    } else if (elm.attachEvent) {
        elm.attachEvent('on' + type, func);
    } else {
        return false;
    }
    return true;
};
*/
var init = function () {
    load();
    var btn1 = document.getElementById('add-row-btn');
    btn1.addEventListener("click",addRow('??','??'));
    var btn2 = document.getElementById('save-btn');
    btn2.addEventListener("click",save);
};

//addListener(window, "load", init);
window.addEventListener("load", init);