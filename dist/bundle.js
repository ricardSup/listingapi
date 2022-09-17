(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

async function getJson(filename) {

	var resp = await fetch('/Har/' + filename + '.info.har');

	if (resp.status == 200) {
		var json = await resp.json();
		return json;
	}
	throw new Error(resp.status);
}

async function getListJson() {
	var fileList = ['javascript'];
	var listexclude = ['analytic', 'yandex', 'gstatic'];
	var tableRef = document.getElementById('tblUrl').getElementsByTagName('tbody')[0];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = fileList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var filename = _step.value;

			var result = await getJson(filename);
			var title = result.log.pages[0].title;

			var _loop = function _loop() {
				var url = result.log.entries[i].request.url;
				newRow = tableRef.insertRow(tableRef.rows.length);

				if (listexclude.every(function (x) {
					return url.indexOf(x) === -1;
				})) {
					newCell = newRow.insertCell(0);
					newText = document.createTextNode(title);

					newCell.appendChild(newText);

					newCell = newRow.insertCell(1);
					newText = document.createTextNode(url);

					newCell.appendChild(newText);
				}
			};

			for (var i = 0; i < result.log.entries.length; i++) {
				var newRow;
				var newCell;
				var newText;
				var newCell;
				var newText;

				_loop();
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}

getListJson();

},{}]},{},[1]);
