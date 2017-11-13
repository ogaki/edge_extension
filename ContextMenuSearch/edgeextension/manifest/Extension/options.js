function addRow(chk, title, url) {
  console.log("***addRow: " + chk + ' ' + title + ' ' + url);
  var tableRef = document.getElementById('table');
  var newRow = tableRef.insertRow(tableRef.rows.length);
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
    '<td><input class="table-chk-box" type="checkbox" id="chk_' + rowNumber + '" value="' + String(chk) + '" ##check /></td>'
    + '<td><input class="table-title" type="text" name="title" value="' + String(title) + '" /></td>'
    + '<td><input class="table-url" type="text" name="url" value="' + String(url) + '" /></td>'
    + '<td><button class="table-del-btn" id="btn_' + rowNumber + '">-' + rowNumber
    + '</button></td>';
  if (String(chk) == 'ON') {
    temp = temp.replace('##check', 'checked');
  } else {
    temp = temp.replace('##check', '');
  }
  newRow.insertAdjacentHTML('afterbegin', temp);
  newRow.setAttribute("id", "rowId=" + rowNumber);
  var del_btn = document.getElementById('btn_' + rowNumber);
  if (del_btn) {
    del_btn.addEventListener("click", function () {
      var btnId = String(del_btn.getAttribute("id"));
      var rowId = btnId.replace('btn_', 'rowId=');
      delRow(rowId);
    });
  }
  var chk_box = document.getElementById('chk_' + rowNumber);
  if (chk_box) {
    chk_box.addEventListener("click", function () {
      var btnId = String(chk_box.getAttribute("id"));
      console.log("checkbox:" + btnId);
      if (chk_box.getAttribute('value') == 'OFF') {
        chk_box.setAttribute('value', 'ON');
        console.log("ON");
      } else {
        chk_box.setAttribute('value', 'OFF');
        console.log("OFF");
      }
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
  console.log('***save data***');
  var rowRef = document.getElementById('table').getElementsByTagName('TR');
  var cell_1, cell_2, cell_3;
  var opt = [];
  for (var i = 0; i < rowRef.length; i++) {
    cell_1 = rowRef[i].getElementsByClassName('table-chk-box');
    cell_2 = rowRef[i].getElementsByClassName('table-title');
    cell_3 = rowRef[i].getElementsByClassName('table-url');
    if (cell_1[0] && cell_1[0].value) { opt.push(cell_1[0].value); }
    if (cell_2[0] && cell_2[0].value) { opt.push(cell_2[0].value); }
    if (cell_3[0] && cell_3[0].value) { opt.push(cell_3[0].value); }
  }
  var data = '[';
  for (var i = 0; i < opt.length; i+=3) {
    data += '["' + opt[i] + '","'+ opt[i+1] + '","'+ opt[i+2] + '"],'
  }
  data = data.substr(0, data.length - 1) + ']';
  console.log(data);
  localStorage.removeItem('data');
  localStorage.setItem('data', data);
  browser.runtime.getBackgroundPage(bgpage);
}

function bgpage(page) {
  var data;
  if (localStorage.data) {
    data = JSON.parse(localStorage.getItem('data'));
  }
  page.update(data);
}

function load() {
  console.log('***load data***');
  if (localStorage.data) {
    var data = JSON.parse(localStorage.getItem('data'));
    var _chk, _title, _url;
    for (var ix = 0; ix < data.length; ix++) {
      _chk = data[ix][0];
      _title = data[ix][1];
      _url = data[ix][2];
      addRow(_chk, _title, _url);
    }
  } else {
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
    if (elm.tagName == 'TR') {
      //console.log("***"+elm.id);
      if (elm.id.startsWith('rowId=')) {
        stack.push(elm);
      }
    }
    elm = elm.nextSibling;
  }
  while ((elm = stack.pop())) {
    elm.parentNode.removeChild(elm);
    console.log("---" + elm.id);
  }
}

function load_defaults() {
  var _chk;
  var _title;
  var _url;
  for (var ix = 0; ix < default_options.length; ix++) {
    _chk = default_options[ix][0]
    _title = default_options[ix][1];
    _url = default_options[ix][2];
    addRow(_chk, _title, _url);
  }
}

function restore() {
  console.log("***restore***");
  if (localStorage.data) {
    localStorage.removeItem('data');
  }
  remove_table_row();
  load_defaults();
}

function init() {
  var btn1 = document.getElementById('add-row-btn');
  btn1.addEventListener("click", function () {
    addRow('ON', '', '')
  });
  var btn2 = document.getElementById('save-btn');
  btn2.addEventListener("click", save);
  var btn3 = document.getElementById('restore-btn');
  btn3.addEventListener("click", restore);
}
