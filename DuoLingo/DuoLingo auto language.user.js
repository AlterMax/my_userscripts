// ==UserScript==
// @name DuoLingo auto language
// @author AlterMax
// @version 0.1 prealpha
// @description Auto change language in input fields
// @include http*duolingo.com/skill/en*
// @run-at document-end
// ==/UserScript==


function get_key(key, lng)
{
	var en_str = "qwertyuiop[]asdfghjkl;'zxcvbnm,.";
	var ru_str = "йцукенгшщзхъфывапролджэячсмитьбю";


	if (lng == 'ru' && en_str.indexOf(key) !== -1)
	{
		return ru_str.charAt(en_str.indexOf(key));
	} else if (lng == 'en' && ru_str.indexOf(key) !== -1)
	{
		return en_str.charAt(ru_str.indexOf(key));
	}
	else return key;
}


function keydown_filter(e){

	if ((e.keyCode > 47 && e.keyCode < 91) || (e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 186 || e.keyCode == 222 || e.keyCode == 188 || e.keyCode == 190)) //a-z  []  ;' ,.
	{
		// определим требуемый язык поля ввода
		var lng = e.target.lang;
		if (lng !=='ru' && lng !== 'en')
		{
			if (e.target.placeholder.indexOf('англий') != -1) lng = 'en';
			else if ((e.target.placeholder.indexOf('русск') != -1)) lng = 'ru';
			else
			{
				console.log('не удалось определить язык поля ввода !!!');
				return;
			}
		}

		e.preventDefault();

		var symbol = get_key(e.key.toLowerCase(), lng);
		if (e.shiftKey) symbol = symbol.toUpperCase();

		document.execCommand("insertText", false, symbol);
	}
}

function add_onkeydown()
{
	var textareas = document.getElementsByTagName("textarea");
	if (textareas.length > 0 ) {
		for (let i = 0; i < textareas.length; i++)
		{
			if (textareas[i].name !== 'hooked')
			{
				textareas[i].onkeydown = keydown_filter;
				textareas[i].name = 'hooked_' + i;
			}
		}
	}

	var input = document.getElementsByTagName("input");
	if (input.length > 0 ) {
		for (let i = 0; i < input.length; i++)
		{
			if (input[i].name !== 'hooked')
			{
				input[i].onkeydown = keydown_filter;
				input[i].name = 'hooked_' + i;
			}
		}
	}
}

var interval = setInterval(add_onkeydown, 300);
