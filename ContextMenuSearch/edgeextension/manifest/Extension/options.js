var default_options = [
  ['google', 'https://www.google.com/search?q=%s'],
  ['bing', 'https://www.bing.com/search?q=%s'],
  ['duckduckgo', 'https://www.duckduckgo.com/?q=%s']];

function addRow(title, url) {
  console.log("***addRow***");
  var tableRef = document.getElementById('table');
  //console.log("rows=" + tableRef.rows.length);
  var newRow = tableRef.insertRow(tableRef.rows.length);
  var _title = String(title);
  var _url = String(url);
  var del_btn = tableRef.getElementsByClassName('table-del-btn');
  var btn_id = [];
  if (del_btn.length == 0) {
    btn_id[0] = 0;
  } else {
    var stack = [];
    for (var ix = 0; ix < del_btn.length; ix++) {
      if (del_btn[ix].id.startsWith('btn_')) {
        var nm = del_btn[ix].id.substr(4);
        stack.push(parseInt(nm));
      }
    }
    btn_id = stack.reverse();
    console.log(btn_id);
  }
  var rowNumber = btn_id[0] + 1;
  var temp =
    '<td><input class="table-title" type="text" name="title" value="' + _title + '" /></td>'
    + '<td><input class="table-url" type="text" name="url" value="' + _url + '" /></td>'
    + '<td><button class="table-del-btn" id="btn_' + rowNumber + '">-' + rowNumber
    + '</button></td>';
  newRow.insertAdjacentHTML('afterbegin', temp);
  newRow.setAttribute("id", "rowId=" + rowNumber);
  var btn_ = document.getElementById('btn_' + rowNumber);
  if (btn_) {
    btn_.addEventListener("click", function () {
      var btnId = String(btn_.getAttribute("id"));
      var rowId = btnId.replace('btn_', 'rowId=');
      delRow(rowId);
    });
  }
}

function delRow(rowId) {
  console.log("delRow:" + rowId);
  var tableRef = document.getElementById('table'); //.getElementsByTagName('tbody')[0];
  var rowRef = document.getElementById(rowId); //'rowId=' + rowId);
  tableRef.deleteRow(rowRef.rowIndex);
}

function save() {
  var tableRef = document.getElementById('table').getElementsByTagName('TBODY')[0];
  var json = html2json(tableRef.innerHTML);
  console.log('***save data***');
  console.log(JSON.stringify(json));
  window.localStorage.setItem('data', JSON.stringify(json));
  browser.runtime.getBackgroundPage(bgpage);
}

function bgpage(page) {
  page.removeContextMenu();
  page.createContextMenu();
}

function load() {
  console.log('***load data***');
  var data;
  if (window.localStorage.data) {
    data = JSON.parse(window.localStorage.data);
    var html = json2html(data);
    //console.log(html);
    //remove_table_row();
    var tableRef = document.getElementById('table'); 
    var rowRef = document.getElementsByTagName('TBODY')[0];
    tableRef.removeChild(rowRef);
    tableRef.insertAdjacentHTML('afterbegin', html);
  } else {
    //remove_table_row();
    load_defaults();
  }
}

function remove_table_row() {
  console.log("remove_table_row");
  var tableRef = document.getElementById('table');
  var rowRef = document.getElementById('table').getElementsByTagName('TBODY')[0];
  var stack = [];
  var elm = rowRef.firstElementChild;
  while (elm) {
    //console.log("element=" + elm.tagName);
    if (elm.tagName=='TR'){ 
      //console.log("***"+elm.id);
      if (elm.id.startsWith('rowId=')){
        stack.push(elm);
      }
    }
    elm = elm.nextSibling;
  }
  while((elm = stack.pop())) {
    elm.parentNode.removeChild(elm);
    console.log("---"+elm.id);
  }
}

function load_defaults() {
  var _title;
  var _url;
  for (var ix = 0; ix < default_options.length; ix++) {
    _title = default_options[ix][0];
    _url = default_options[ix][1];
    addRow(_title, _url);
  }
}

function restore() {
  console.log("***restore***");
  if (window.localStorage.data) {
    window.localStorage.removeItem('data');
  }
  remove_table_row();
  load_defaults();
}

function init() {
  var btn1 = document.getElementById('add-row-btn');
  btn1.addEventListener("click", function () {
    addRow('', '')
  });
  var btn2 = document.getElementById('save-btn');
  btn2.addEventListener("click", save);
  var btn3 = document.getElementById('restore-btn');
  btn3.addEventListener("click", restore);
}
