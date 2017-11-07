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
  if (!_title) _title = "[NAME]";
  if (!_url) _url = "[URL ex. https://www.google.com/search?=%s]";
  var temp =
    '<td><input class="table-text" type="text" name="title" value="' + _title + '" /></td>'
    + '<td><input class="table-text" type="text" name="url" value="' + _url + '" /></td>'
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
  var data;
  if (window.localStorage && (data = JSON.parse(window.localStorage.data))) {
    //console.log('***load data***');
    var html = json2html(data);
    //console.log(html);
    var tableRef = document.getElementById('table');
    var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    tableRef.removeChild(tbodyRef);
    tableRef.insertAdjacentHTML('afterbegin', html);
  } else {
    for (var ix = 0; ix < default_options.length; ix++) {
      addRow(default_options[ix][0], default_options[ix][1]);
    }
  }
}