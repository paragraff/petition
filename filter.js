/**
 * @license
 * Fuse - Lightweight fuzzy-search
 *
 * Copyright (c) 2012 Kirollos Risk <kirollos@gmail.com>.
 * All Rights Reserved. Apache Software License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(t){function e(t,n){this.list=t,this.options=n=n||{};var i,o,s,r;for(i=0,r=["sort","includeScore","shouldSort"],o=r.length;o>i;i++)s=r[i],this.options[s]=s in n?n[s]:e.defaultOptions[s];for(i=0,r=["searchFn","sortFn","keys","getFn"],o=r.length;o>i;i++)s=r[i],this.options[s]=n[s]||e.defaultOptions[s]}var n=function(t,e){if(e=e||{},this.options=e,this.options.location=e.location||n.defaultOptions.location,this.options.distance="distance"in e?e.distance:n.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:n.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||n.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen>this.options.maxPatternLength)throw new Error("Pattern length is too long");this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet()};n.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},n.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},n.prototype._bitapScore=function(t,e){var n=t/this.patternLen,i=Math.abs(this.options.location-e);return this.options.distance?n+i/this.options.distance:i?1:n},n.prototype.search=function(t){if(t=this.options.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0};var e,n,i,o,s,r,a,h,p,c=t.length,l=this.options.location,f=this.options.threshold,u=t.indexOf(this.pattern,l),d=this.patternLen+c,g=1,m=[];for(-1!=u&&(f=Math.min(this._bitapScore(0,u),f),u=t.lastIndexOf(this.pattern,l+this.patternLen),-1!=u&&(f=Math.min(this._bitapScore(0,u),f))),u=-1,e=0;e<this.patternLen;e++){for(i=0,o=d;o>i;)this._bitapScore(e,l+o)<=f?i=o:d=o,o=Math.floor((d-i)/2+i);for(d=o,s=Math.max(1,l-o+1),r=Math.min(l+o,c)+this.patternLen,a=Array(r+2),a[r+1]=(1<<e)-1,n=r;n>=s;n--)if(p=this.patternAlphabet[t.charAt(n-1)],a[n]=0===e?(a[n+1]<<1|1)&p:(a[n+1]<<1|1)&p|((h[n+1]|h[n])<<1|1)|h[n+1],a[n]&this.matchmask&&(g=this._bitapScore(e,n-1),f>=g)){if(f=g,u=n-1,m.push(u),!(u>l))break;s=Math.max(1,2*l-u)}if(this._bitapScore(e+1,l)>f)break;h=a}return{isMatch:u>=0,score:g}};var i=function(t,e,n){var s,r,a;if(e){a=e.indexOf("."),-1!==a?(s=e.slice(0,a),r=e.slice(a+1)):s=e;var h=t[s];if(h)if(r||"string"!=typeof h&&"number"!=typeof h)if(o.isArray(h))for(var p=0,c=h.length;c>p;p++)i(h[p],r,n);else r&&i(h,r,n);else n.push(h)}else n.push(t);return n},o={deepValue:function(t,e){return i(t,e,[])},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)}};e.defaultOptions={id:null,caseSensitive:!1,includeScore:!1,shouldSort:!0,searchFn:n,sortFn:function(t,e){return t.score-e.score},getFn:o.deepValue,keys:[]},e.prototype.set=function(t){return this.list=t,t},e.prototype.search=function(t){var e,n,i,s,r=new this.options.searchFn(t,this.options),a=this.list,h=a.length,p=this.options,c=this.options.keys,l=c.length,f=[],u={},d=[],g=function(t,e,n){if(void 0!==t&&null!==t)if("string"==typeof t)i=r.search(t),i.isMatch&&(s=u[n],s?s.score=Math.min(s.score,i.score):(u[n]={item:e,score:i.score},f.push(u[n])));else if(o.isArray(t))for(var a=0;a<t.length;a++)g(t[a],e,n)};if("string"==typeof a[0])for(var m=0;h>m;m++)g(a[m],m,m);else for(var m=0;h>m;m++)for(n=a[m],e=0;l>e;e++)g(p.getFn(n,c[e]),n,m);p.shouldSort&&f.sort(p.sortFn);for(var y=p.includeScore?function(t){return f[t]}:function(t){return f[t].item},v=p.id?function(t){f[t].item=p.getFn(f[t].item,p.id)[0]}:function(){},m=0,b=f.length;b>m;m++)v(m),d.push(y(m));return d},"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):t.Fuse=e}(this);

(function (global, $) {
	'use strict';

	var list = $('section div.reducer div.list:not(:only-child)'),
		listItems = list.children('.list_row'),
		headerTitle = $('section div.list_header_block div.list .list_elem_title'),
		petitions = getDataFromDOM(listItems),
		options = {
			id: "key", // на выходе получим массив из свойств elem каждой петиции
			caseSensitive: false,
			includeScore: false,
			shouldSort: true,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			keys: ["title"] // ищем по свойству title
		},
		searchEngine = new Fuse(petitions, options),
		searchTimeout;

	// добавляем поле для ввода фильтра
	$(
		'<input class="txt_input vat" type="text"' +
		' value="" placeholder="Фільтр електроних петицій по назві">'
	).css({
		'vertical-align': 'baseline',
		width: '400px',
		margin: '0 30px',
		height: '30px'
	}).appendTo(headerTitle)
	// ищем не дожидаясь Enter
	.keyup(function () {
		clearTimeout(searchTimeout);
		searchTimeout = (function (text) {
			return setTimeout(function () {
				search(text);
			}, 400);
		})($(this).val());
	});

	function search(text) {
		var resultSearch;
		if (text == '') {
			listItems.css('display', 'table-row');
		} else {
			resultSearch = searchEngine.search(text);
			listItems.css('display', 'none');
			resultSearch.forEach(function (petition) {
				// отнимаем единицу из-за бага (см. функцию getDataFromDOM)
				petitions[petition - 1].elem.appendTo(list).css('display', 'table-row');
			});
		}
	}

	function getDataFromDOM(domElems) {
		var petitions = [], key, jqueryElement;

		domElems.each(function (index) {
			jqueryElement = $(this);
			petitions.push({
				key: index + 1, // обходим баг поискового движка из-за некорректной работы с нулем
				title: jqueryElement.find('.list_elem_title a').text(),
				elem: jqueryElement
			});
		});
		return petitions;
	}

})(window, jQuery);