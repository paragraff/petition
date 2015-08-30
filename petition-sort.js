(function (global, $) {
	'use strict';
	var list = $('section div.reducer div.list:not(:only-child)'),
		header = $('section div.list_header_block div.list'),
		sort = 'none';

	function sortAscByAttribute(a, b) {
		var result,
			voteA = getValue(a),
			voteB = getValue(b);
		if (voteA == voteB) {
			result = 0;
		} else if (voteA > voteB) {
			result = 1;
		} else {
			result = -1
		}
		return result;
	}

	function sortDescByAttribute(a, b) {
		return sortAscByAttribute(b, a);
	}

	function getValue(elem) {
		var value = 0;
		if (sort != 'title') {
			value = parseInt($(elem).find('.list_elem_' + sort).find('span').text(), 10)
		} else {
			value = $(elem).find('.list_elem_' + sort).find('a').text();
		}
		return value;
	}
	global.sort = function (field, type) {
		sort = field;
		if (type == 'asc') {
			list.children('.list_row').sort(sortAscByAttribute).appendTo(list);
		} else if (type == 'desc') {
			list.children('.list_row').sort(sortDescByAttribute).appendTo(list);
		}
	}
})(window, jQuery);