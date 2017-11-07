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
  if (!_title || _title.trim.length == 0) _title = "[NAME]";
  if (!_url || _url.trim.length == 0) _url = "[URL ex. https://www.google.com/search?=%s]";
  var temp =
    '<td><input class="table-title" type="text" name="title" value="' + _title + '" /></td>'
    + '<td><input class="table-url" type="text" name="url" value="' + _url + '" /></td>'
    + '<td><input class="table-button" type="button" onclick="delRow(' + rowNumber
    + ');" value="' //+ rowNumber
    + '-" /></td>';
  newRow.insertAdjacentHTML('afterbegin', temp);
  newRow.setAttribute("id", "rowId=" + rowNumber);
  //console.log("rowIndex=" + newRow.rowIndex);
}
function delRow(rowId) {
  //console.log("delRow:" + rowId);
  var tableRef = document.getElementById('table'); //.getElementsByTagName('tbody')[0];
  var rowRef = document.getElementById('rowId=' + rowId);
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