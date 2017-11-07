var default_options = [
  ['google', 'https://www.google.com/search?q=%s'],
  ['bing', 'https://www.bing.com/search?q=%s'],
  ['duckduckgo', 'https://www.duckduckgo.com/?q=%s']];

var rowNumber = 0;

function addRow(_title, _url) {
  var tableRef = document.getElementById('table'); //.getElementsByTagName('tbody')[0];
  console.log("rows=" + tableRef.rows.length);
  var newRow = tableRef.insertRow(tableRef.rows.length);
  rowNumber++;
  var __title = String(_title);
  var __url = String(_url);
  //if (__title.trim.length == 0) __title = "[NAME]";
  //if (__url.trim.length == 0) __url = "[URL ex. https://www.google.com/search?=%s]";
  var temp =
    '<td><input class="table-title" type="text" name="title" value="' + __title + '" /></td>'
    + '<td><input class="table-url" type="text" name="url" value="' + __url + '" /></td>'
    + '<td><button class="table-button" id="btn_' + rowNumber + '">-'
    + rowNumber
    + '</button></td>';
  newRow.insertAdjacentHTML('afterbegin', temp);
  newRow.setAttribute("id", "rowId=" + rowNumber);
  var btn_ = document.getElementById('btn_' + rowNumber);
  if (btn_) {
    btn_.addEventListener("click", function() {
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
  var tableRef = document.getElementById('table');//.getElementsByTagName('tr')[1];
  var json = html2json(tableRef.innerHTML);
  console.log('***save data***');
  console.log(JSON.stringify(json));
  if (!!window.localStorage) {
    window.localStorage.data = JSON.stringify(json); // Convert the object to a string.
  }
}
function load() {
  console.log('***load data***');
  var data;
  if (window.localStorage.data) {
    data = JSON.parse(window.localStorage.data);
    var html = json2html(data);
    //console.log(html);
    var tableRef = document.getElementById('table');
    var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    tableRef.removeChild(tbodyRef);
    tableRef.insertAdjacentHTML('afterbegin', html);
  } else {
    var _title;
    var _url;
    for (var ix = 0; ix < default_options.length; ix++) {
      _title = default_options[ix][0];
      _url = default_options[ix][1];
      addRow(_title, _url);
    }
  }
}