(function (global, $) {
	'use strict';
	var list = $('section div.reducer div.list:not(:only-child)'),
		header = $('section div.list_header_block div.list'),
		field = 'none',
		direction = 'asc';

	header.find('.list_elem_col_head')
		.wrapInner('<a href="#"></a>')
		.find('a')
		.click(userActionClickSort);

	function userActionClickSort() {
		var newField,
			pattern = 'list_elem_col list_elem_col_head list_elem_';
		if ($(this).parent().attr('class').indexOf(pattern) != -1) {
			newField = $(this).parent().attr('class').substr(pattern.length);
			changeSort(newField);
		}
		return false;
	}

	function changeSort(newField) {
		if (newField == field) {
			// кликнули повторно по полю, значит нужно сменить направление сортировки
			direction = direction == 'asc' ? 'desc' : 'asc';
		} else {
			field = newField;
			direction = 'asc';
		}
		sort(field, direction);
	}

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
		if (field != 'title') {
			value = parseInt($(elem).find('.list_elem_' + field).find('span').text(), 10)
		} else {
			value = $(elem).find('.list_elem_' + field).find('a').text();
		}
		return value;
	}
	function sort(newField, type) {
		field = newField;
		if (type == 'asc') {
			list.children('.list_row').sort(sortAscByAttribute).appendTo(list);
		} else if (type == 'desc') {
			list.children('.list_row').sort(sortDescByAttribute).appendTo(list);
		}
	}
})(window, jQuery);