(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Messages$ChangeLevel = {$: 'ChangeLevel'};
var $author$project$Types$Coordination = F2(
	function (w, h) {
		return {h: h, w: w};
	});
var $author$project$Types$NoDebugCollision = {$: 'NoDebugCollision'};
var $author$project$BasicTypes$Point = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $author$project$Messages$Prepare = {$: 'Prepare'};
var $author$project$Messages$Stopped = {$: 'Stopped'};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Model$noMusic = {id: '', repeat: false, src: '', t: 0, volume: 100};
var $author$project$Model$dummyModel = {
	ani: $author$project$Messages$Stopped,
	cache: _List_Nil,
	canvas: A2($author$project$Types$Coordination, 0, 0),
	debug: _List_fromArray(
		[$author$project$Types$NoDebugCollision]),
	fadeStates: _List_Nil,
	finished: 0,
	frame: A2($author$project$Types$Coordination, 0, 0),
	gameLevel: 0,
	gameStatus: $author$project$Messages$Prepare,
	god: false,
	inters: _List_Nil,
	keyDowns: _List_Nil,
	music: $author$project$Model$noMusic,
	ops: _List_Nil,
	t_attempts: 1,
	t_clock: 0,
	t_elapse: -25,
	t_rate: 25,
	unis: _List_Nil,
	v_step: 1 / 3,
	viewBox: A2($author$project$Types$Coordination, 0, 0),
	viewPos: A2($author$project$BasicTypes$Point, 0, 0),
	walls: _List_Nil
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function () {
	var model_ = _Utils_update(
		$author$project$Model$dummyModel,
		{gameLevel: 11, gameStatus: $author$project$Messages$ChangeLevel});
	return _Utils_Tuple2(model_, $elm$core$Platform$Cmd$none);
}();
var $author$project$Messages$Resize = F2(
	function (a, b) {
		return {$: 'Resize', a: a, b: b};
	});
var $author$project$Messages$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$html$Html$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $author$project$Messages$Arrow_Down = {$: 'Arrow_Down'};
var $author$project$Messages$Arrow_Left = {$: 'Arrow_Left'};
var $author$project$Messages$Arrow_Right = {$: 'Arrow_Right'};
var $author$project$Messages$Arrow_Up = {$: 'Arrow_Up'};
var $author$project$Messages$DebugSignal = {$: 'DebugSignal'};
var $author$project$Messages$ForcePass = {$: 'ForcePass'};
var $author$project$Messages$FullView = {$: 'FullView'};
var $author$project$Messages$KeyDown = function (a) {
	return {$: 'KeyDown', a: a};
};
var $author$project$Messages$KeyWild = F2(
	function (a, b) {
		return {$: 'KeyWild', a: a, b: b};
	});
var $author$project$Messages$Key_C = {$: 'Key_C'};
var $author$project$Messages$Key_E = {$: 'Key_E'};
var $author$project$Messages$Key_G = {$: 'Key_G'};
var $author$project$Messages$Key_R = {$: 'Key_R'};
var $author$project$Messages$Space = {$: 'Space'};
var $author$project$Main$keyDown = function (key_code) {
	switch (key_code) {
		case 37:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Left);
		case 38:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Up);
		case 39:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Right);
		case 40:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Down);
		case 32:
			return $author$project$Messages$KeyDown($author$project$Messages$Space);
		case 67:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_C);
		case 87:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Up);
		case 83:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Down);
		case 65:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Left);
		case 68:
			return $author$project$Messages$KeyDown($author$project$Messages$Arrow_Right);
		case 69:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_E);
		case 71:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_G);
		case 82:
			return $author$project$Messages$KeyDown($author$project$Messages$Key_R);
		case 73:
			return $author$project$Messages$FullView;
		case 79:
			return $author$project$Messages$ForcePass;
		case 85:
			return $author$project$Messages$DebugSignal;
		default:
			return A2($author$project$Messages$KeyWild, true, key_code);
	}
};
var $author$project$Messages$KeyUp = function (a) {
	return {$: 'KeyUp', a: a};
};
var $author$project$Messages$Key_P = {$: 'Key_P'};
var $author$project$Main$keyUp = function (key_code) {
	switch (key_code) {
		case 37:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Left);
		case 38:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Up);
		case 39:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Right);
		case 40:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Down);
		case 32:
			return $author$project$Messages$KeyUp($author$project$Messages$Space);
		case 80:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_P);
		case 67:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_C);
		case 87:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Up);
		case 83:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Down);
		case 65:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Left);
		case 68:
			return $author$project$Messages$KeyUp($author$project$Messages$Arrow_Right);
		case 69:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_E);
		case 82:
			return $author$project$Messages$KeyUp($author$project$Messages$Key_R);
		default:
			return A2($author$project$Messages$KeyWild, false, key_code);
	}
};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$subscriptions = function (model) {
	var tick = function () {
		var _v1 = model.gameStatus;
		switch (_v1.$) {
			case 'Prepare':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			case 'Paused':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			case 'Pass':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			case 'End':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			case 'Running':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			case 'ChangeLevel':
				return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
			default:
				return $elm$core$Platform$Sub$none;
		}
	}();
	var tick_ = function () {
		var _v0 = model.ani;
		if (_v0.$ === 'Doing') {
			return $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Messages$Tick);
		} else {
			return tick;
		}
	}();
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				tick_,
				$elm$browser$Browser$Events$onKeyUp(
				A2($elm$json$Json$Decode$map, $author$project$Main$keyUp, $elm$html$Html$Events$keyCode)),
				$elm$browser$Browser$Events$onKeyDown(
				A2($elm$json$Json$Decode$map, $author$project$Main$keyDown, $elm$html$Html$Events$keyCode)),
				$elm$browser$Browser$Events$onResize($author$project$Messages$Resize)
			]));
};
var $author$project$Messages$Before = {$: 'Before'};
var $author$project$Types$ForceDebug = {$: 'ForceDebug'};
var $author$project$Messages$GetViewport = function (a) {
	return {$: 'GetViewport', a: a};
};
var $author$project$Messages$Paused = {$: 'Paused'};
var $author$project$Types$ViewBox = function (a) {
	return {$: 'ViewBox', a: a};
};
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Music$changeVolume = _Platform_outgoingPort(
	'changeVolume',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$float(b)
				]));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $author$project$L0_MainMenu$Init$reInit = function (model) {
	return model;
};
var $author$project$Types$FadeBoth = {$: 'FadeBoth'};
var $author$project$Types$Fadein = {$: 'Fadein'};
var $author$project$Types$SingularFunc = function (a) {
	return {$: 'SingularFunc', a: a};
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$State$fadeInAndOut = function (fadeState) {
	var t = fadeState.t;
	var val = (t < 0.3) ? (t / 0.3) : (((t >= 0.3) && (t <= 0.7)) ? 1 : ((1.0 - t) / 0.3));
	return (t < 1) ? _Utils_update(
		fadeState,
		{
			value: (val > 0) ? val : 0
		}) : fadeState;
};
var $author$project$State$genFadeIn = F2(
	function (_break, interval) {
		var fadeIn_ = function (fadeState) {
			var t = fadeState.t;
			var val = (_Utils_cmp(t, _break) < 0) ? 0 : (((_Utils_cmp(t, _break) > -1) && (_Utils_cmp(t, _break + interval) < 1)) ? ((t - _break) / interval) : 1);
			return _Utils_update(
				fadeState,
				{value: val});
		};
		return fadeIn_;
	});
var $author$project$L0_Start$Init$reInit = function (model) {
	var states = _List_fromArray(
		[
			{
			dt: 0.006,
			index: 0,
			job: $author$project$Types$FadeBoth,
			loop: false,
			name: 'fadeInAndOut',
			state_function: $author$project$Types$SingularFunc($author$project$State$fadeInAndOut),
			t: 0,
			value: 0
		},
			{
			dt: 0.008,
			index: 0,
			job: $author$project$Types$Fadein,
			loop: true,
			name: 'fadeIn',
			state_function: $author$project$Types$SingularFunc(
				A2($author$project$State$genFadeIn, 0.1, 1)),
			t: -1.2,
			value: 0
		}
		]);
	return _Utils_update(
		model,
		{
			ani: $author$project$Messages$Before,
			canvas: {h: 750, w: 1000},
			fadeStates: states,
			finished: 0,
			gameLevel: 10,
			gameStatus: $author$project$Messages$Prepare,
			god: false
		});
};
var $author$project$BasicTypes$L_ = {$: 'L_'};
var $author$project$Types$NoCollision = {$: 'NoCollision'};
var $author$project$Types$Static = {$: 'Static'};
var $author$project$BasicTypes$Vector = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $author$project$Types$addInteractive = F3(
	function (f_active, f_passive, uni) {
		return _Utils_update(
			uni,
			{
				i_active: f_active(uni.coll),
				i_passive: f_passive(uni.coll)
			});
	});
var $author$project$Types$addVisual = F6(
	function (layer, _v0, offset, src, opacity, uni) {
		var w = _v0.a;
		var h = _v0.b;
		return _Utils_update(
			uni,
			{h: h, layer: layer, offset: offset, opacity: opacity, src: src, w: w});
	});
var $author$project$Types$Cat = function (a) {
	return {$: 'Cat', a: a};
};
var $author$project$Types$Stand = {$: 'Stand'};
var $author$project$Objects$someCat_ = {
	a_max: A2($author$project$BasicTypes$Vector, 10, 0),
	status: $author$project$Types$Stand,
	v_jump: A2($author$project$BasicTypes$Vector, 0, -28),
	v_max: A2($author$project$BasicTypes$Vector, 20, 50)
};
var $author$project$Objects$changeCat_ = F4(
	function (v_max, a_max, v_jump, cat) {
		var cat_ = function () {
			var _v0 = cat.uni;
			if (_v0.$ === 'Cat') {
				return {a_max: a_max, status: $author$project$Types$Stand, v_jump: v_jump, v_max: v_max};
			} else {
				return $author$project$Objects$someCat_;
			}
		}();
		return _Utils_update(
			cat,
			{
				uni: $author$project$Types$Cat(cat_)
			});
	});
var $author$project$State$defaultFadeInState = _List_fromArray(
	[
		{
		dt: 0.01,
		index: 0,
		job: $author$project$Types$Fadein,
		loop: true,
		name: 'fadeIn',
		state_function: $author$project$Types$SingularFunc(
			A2($author$project$State$genFadeIn, 0.1, 1)),
		t: 0,
		value: 0
	}
	]);
var $author$project$BasicTypes$easyPoly = F4(
	function (x1, y1, x2, y2) {
		return _List_fromArray(
			[
				A2($author$project$BasicTypes$Point, x1, y1),
				A2($author$project$BasicTypes$Point, x2, y1),
				A2($author$project$BasicTypes$Point, x2, y2),
				A2($author$project$BasicTypes$Point, x1, y2)
			]);
	});
var $author$project$Types$Collision = {$: 'Collision'};
var $author$project$Types$NoGravity = {$: 'NoGravity'};
var $author$project$Types$Still = {$: 'Still'};
var $author$project$BasicTypes$dummyVector = A2($author$project$BasicTypes$Point, 0, 0);
var $author$project$Types$addPhysics = F4(
	function (pos, coll, solidity, uni) {
		return _Utils_update(
			uni,
			{a: $author$project$BasicTypes$dummyVector, coll: coll, i_active: coll, i_passive: coll, pos: pos, solidity: solidity, v: $author$project$BasicTypes$dummyVector});
	});
var $author$project$Types$addStatus = F4(
	function (gravityStatus, moveStatus, collisionStatus, uni) {
		return _Utils_update(
			uni,
			{collisionStatus: collisionStatus, gravityStatus: gravityStatus, moveStatus: moveStatus});
	});
var $author$project$BasicTypes$noPoly = function (_v0) {
	return _List_Nil;
};
var $author$project$Types$Air = {$: 'Air'};
var $author$project$Types$Moving = {$: 'Moving'};
var $author$project$Type_Visual$NoImage = {$: 'NoImage'};
var $author$project$BasicTypes$dummyPoint = A2($author$project$BasicTypes$Point, 0, 0);
var $author$project$BasicTypes$zeroPoint = $author$project$BasicTypes$dummyPoint;
var $author$project$Types$someUni = F3(
	function (name, index, uniType) {
		return {a: $author$project$BasicTypes$dummyVector, coll: _List_Nil, collisionStatus: $author$project$Types$Collision, gravityStatus: $author$project$Types$Air, h: 0, i_active: _List_Nil, i_passive: _List_Nil, imageType: $author$project$Type_Visual$NoImage, index: index, layer: -1, moveStatus: $author$project$Types$Moving, name: name, offset: $author$project$BasicTypes$zeroPoint, opacity: 1, pos: $author$project$BasicTypes$dummyPoint, rot: 0, solidity: -1, src: '', step: 1, turn: $author$project$BasicTypes$L_, uni: uniType, v: $author$project$BasicTypes$dummyVector, w: 0};
	});
var $author$project$Objects$someWall = F2(
	function (pos, poly) {
		return A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			$author$project$BasicTypes$noPoly,
			A4(
				$author$project$Types$addStatus,
				$author$project$Types$NoGravity,
				$author$project$Types$Still,
				$author$project$Types$Collision,
				A4(
					$author$project$Types$addPhysics,
					pos,
					poly,
					0,
					A3($author$project$Types$someUni, 'wall', -1, $author$project$Types$Static))));
	});
var $author$project$Objects$fixedWall = function (poly) {
	return A2($author$project$Objects$someWall, $author$project$BasicTypes$zeroPoint, poly);
};
var $author$project$Model$Any = function (a) {
	return {$: 'Any', a: a};
};
var $author$project$Model$Func = function (a) {
	return {$: 'Func', a: a};
};
var $author$project$Types$Girl = function (a) {
	return {$: 'Girl', a: a};
};
var $author$project$Types$Ground = {$: 'Ground'};
var $author$project$Types$Hug = {$: 'Hug'};
var $author$project$Types$Hugged = {$: 'Hugged'};
var $author$project$Types$Jump = {$: 'Jump'};
var $author$project$Types$Name = F2(
	function (a, b) {
		return {$: 'Name', a: a, b: b};
	});
var $author$project$Types$Stay = {$: 'Stay'};
var $author$project$BasicTypes$combine = F2(
	function (a, b) {
		return {x: b.x + a.x, y: b.y + a.y};
	});
var $author$project$ModelTools$filterOutNameString = function (name) {
	return $elm$core$List$filter(
		function (u) {
			return !_Utils_eq(u.name, name);
		});
};
var $author$project$Types$ErrorUni = {$: 'ErrorUni'};
var $author$project$Types$dummyUni = A3($author$project$Types$someUni, '', 0, $author$project$Types$ErrorUni);
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$ModelTools$findNameString = function (name) {
	return function (u) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Types$dummyUni,
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (u_) {
						return _Utils_eq(u_.name, name);
					},
					u)));
	};
};
var $author$project$ModelTools$divCat = function (unis) {
	return _Utils_Tuple2(
		A2($author$project$ModelTools$findNameString, 'cat', unis),
		A2($author$project$ModelTools$filterOutNameString, 'cat', unis));
};
var $author$project$ModelTools$divGirl = function (unis) {
	return _Utils_Tuple2(
		A2($author$project$ModelTools$findNameString, 'girl', unis),
		A2($author$project$ModelTools$filterOutNameString, 'girl', unis));
};
var $author$project$Model$Operation = F4(
	function (name, func, t, filter) {
		return {filter: filter, func: func, name: name, t: t};
	});
var $author$project$Model$noFunc = $author$project$Model$Func(
	F2(
		function (_v0, m) {
			return m;
		}));
var $author$project$Operation$dummyOperation = A4(
	$author$project$Model$Operation,
	A2($author$project$Types$Name, '', -1),
	$author$project$Model$noFunc,
	-1,
	$author$project$Model$Any(''));
var $author$project$ModelTools$getCat_ = function (unis) {
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var _v0 = cat.uni;
	if (_v0.$ === 'Cat') {
		var cat_ = _v0.a;
		return cat_;
	} else {
		return $author$project$Objects$someCat_;
	}
};
var $author$project$Objects$someGirl_ = {
	a_max: A2($author$project$BasicTypes$Vector, 12, 0),
	status: $author$project$Types$Stay,
	v_climb: A2($author$project$BasicTypes$Vector, 0, 8),
	v_max: A2($author$project$BasicTypes$Vector, 20, 50)
};
var $author$project$ModelTools$getGirl_ = function (unis) {
	var girl = A2($author$project$ModelTools$findNameString, 'girl', unis);
	var _v0 = girl.uni;
	if (_v0.$ === 'Girl') {
		var girl_ = _v0.a;
		return girl_;
	} else {
		return $author$project$Objects$someGirl_;
	}
};
var $author$project$Type_Physics$indexList = F2(
	function (index, list) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, obj) {
							return _Utils_eq(i, index) ? $elm$core$Maybe$Just(obj) : $elm$core$Maybe$Nothing;
						}),
					list)));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Type_Physics$cyclePoly = F2(
	function (index, list) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$BasicTypes$dummyPoint,
			A2(
				$author$project$Type_Physics$indexList,
				A2(
					$elm$core$Basics$modBy,
					$elm$core$List$length(list),
					index),
				list));
	});
var $author$project$Type_Physics$Line = F2(
	function (p, q) {
		return {p: p, q: q};
	});
var $author$project$Type_Physics$Equation = F3(
	function (a, b, c) {
		return {a: a, b: b, c: c};
	});
var $author$project$Type_Physics$line2eq = function (line) {
	var y2 = line.q.y;
	var y1 = line.p.y;
	var x2 = line.q.x;
	var x1 = line.p.x;
	return A3($author$project$Type_Physics$Equation, y2 - y1, x1 - x2, (x2 * y1) - (y2 * x1));
};
var $author$project$BasicTypes$sgn = function (f) {
	return (f > 0) ? 1 : ((f < 0) ? (-1) : 0);
};
var $author$project$Type_Physics$yieldEqSgn = F2(
	function (_v0, _v1) {
		var x = _v0.x;
		var y = _v0.y;
		var a = _v1.a;
		var b = _v1.b;
		var c = _v1.c;
		return $author$project$BasicTypes$sgn(((a * x) + (b * y)) + c);
	});
var $author$project$Type_Physics$pointByTri = F2(
	function (tar, poly) {
		var _v0 = function () {
			if ((poly.b && poly.b.b) && poly.b.b.b) {
				var e1 = poly.a;
				var _v2 = poly.b;
				var e2 = _v2.a;
				var _v3 = _v2.b;
				var e3 = _v3.a;
				return _Utils_Tuple3(e1, e2, e3);
			} else {
				return _Utils_Tuple3($author$project$BasicTypes$dummyPoint, $author$project$BasicTypes$dummyPoint, $author$project$BasicTypes$dummyPoint);
			}
		}();
		var p = _v0.a;
		var q = _v0.b;
		var r = _v0.c;
		var a = A2(
			$author$project$Type_Physics$yieldEqSgn,
			tar,
			$author$project$Type_Physics$line2eq(
				A2($author$project$Type_Physics$Line, p, q)));
		var b = A2(
			$author$project$Type_Physics$yieldEqSgn,
			tar,
			$author$project$Type_Physics$line2eq(
				A2($author$project$Type_Physics$Line, q, r)));
		return (a < 0) && (b < 0);
	});
var $author$project$Type_Physics$pointInPoly = F2(
	function (tar, poly) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (bool, _final) {
					return _final && bool;
				}),
			true,
			A2(
				$elm$core$List$map,
				function (po) {
					return A2($author$project$Type_Physics$pointByTri, tar, po);
				},
				A2(
					$elm$core$List$map,
					function (lst) {
						return A2(
							$elm$core$List$map,
							function (i) {
								return A2($author$project$Type_Physics$cyclePoly, i, poly);
							},
							lst);
					},
					A2(
						$elm$core$List$map,
						function (x) {
							return _List_fromArray(
								[x, x + 1, x + 2]);
						},
						A2(
							$elm$core$List$range,
							1,
							$elm$core$List$length(poly))))));
	});
var $author$project$Type_Physics$hitPolys = F2(
	function (po1, po2) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (p, _final) {
					return _final || A2($author$project$Type_Physics$pointInPoly, p, po1);
				}),
			false,
			po2) || A3(
			$elm$core$List$foldl,
			F2(
				function (p, _final) {
					return _final || A2($author$project$Type_Physics$pointInPoly, p, po2);
				}),
			false,
			po1);
	});
var $author$project$Operation$keyIn = F2(
	function (keyType, keyDowns) {
		return A2($elm$core$List$member, keyType, keyDowns);
	});
var $author$project$BasicTypes$movePoly = F2(
	function (delta, poly) {
		return A2(
			$elm$core$List$map,
			function (p) {
				return A2($author$project$BasicTypes$combine, delta, p);
			},
			poly);
	});
var $author$project$Type_Physics$moveObjPoly = F2(
	function (which, uni) {
		return A2(
			$author$project$BasicTypes$movePoly,
			uni.pos,
			which(uni));
	});
var $author$project$Operation$removeName = F2(
	function (name, ops) {
		return A2(
			$elm$core$List$filter,
			function (o) {
				return !_Utils_eq(o.name, name);
			},
			ops);
	});
var $author$project$Operation$refreshName = F2(
	function (op, ops) {
		return A2(
			$elm$core$List$cons,
			op,
			A2($author$project$Operation$removeName, op.name, ops));
	});
var $author$project$ModelTools$removeSerialList = F2(
	function (_v0, list) {
		var index = _v0.index;
		var name = _v0.name;
		return A2(
			$elm$core$List$filter,
			function (obj) {
				return (!_Utils_eq(obj.index, index)) || (!_Utils_eq(obj.name, name));
			},
			list);
	});
var $author$project$ModelTools$refreshSerialList = F2(
	function (serial, list) {
		return function (l) {
			return _Utils_ap(
				_List_fromArray(
					[serial]),
				l);
		}(
			A2($author$project$ModelTools$removeSerialList, serial, list));
	});
var $author$project$ModelTools$refreshUnis = F2(
	function (uni, unis) {
		return A2($author$project$ModelTools$refreshSerialList, uni, unis);
	});
var $author$project$Types$AnyCat = {$: 'AnyCat'};
var $author$project$Types$AnyGirl = {$: 'AnyGirl'};
var $author$project$Model$Cat_F = function (a) {
	return {$: 'Cat_F', a: a};
};
var $author$project$Model$Girl_F = function (a) {
	return {$: 'Girl_F', a: a};
};
var $author$project$Operation$removeFilter = F2(
	function (filter, ops) {
		return _Utils_eq(
			filter,
			$author$project$Model$Cat_F($author$project$Types$AnyCat)) ? A2(
			$elm$core$List$filter,
			function (o) {
				var _v0 = o.filter;
				if (_v0.$ === 'Cat_F') {
					return false;
				} else {
					return true;
				}
			},
			ops) : (_Utils_eq(
			filter,
			$author$project$Model$Girl_F($author$project$Types$AnyGirl)) ? A2(
			$elm$core$List$filter,
			function (o) {
				var _v1 = o.filter;
				if (_v1.$ === 'Girl_F') {
					return false;
				} else {
					return true;
				}
			},
			ops) : A2(
			$elm$core$List$filter,
			function (o) {
				return !_Utils_eq(o.filter, filter);
			},
			ops));
	});
var $author$project$BasicTypes$zeroVector = $author$project$BasicTypes$dummyVector;
function $author$project$Flow$cyclic$renderHugCheck() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('hugCheck'),
			func: $author$project$Flow$cyclic$hugCheck(),
			name: A2($author$project$Types$Name, 'hugCheck', -1),
			t: -1
		});
}
function $author$project$Flow$cyclic$hugCheck() {
	return $author$project$Model$Func(
		F2(
			function (hugOp, model) {
				var newOp = (!(A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, model.keyDowns) || (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, model.keyDowns) || (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, model.keyDowns) || A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Down, model.keyDowns))))) ? _Utils_update(
					hugOp,
					{t: 0}) : hugOp;
				var girl_ = $author$project$ModelTools$getGirl_(model.unis);
				var cat_ = $author$project$ModelTools$getCat_(model.unis);
				var _v2 = $author$project$ModelTools$divCat(model.unis);
				var cat = _v2.a;
				var res = _v2.b;
				var _v3 = $author$project$ModelTools$divGirl(res);
				var girl = _v3.a;
				var rest = _v3.b;
				var newCat = _Utils_update(
					cat,
					{moveStatus: $author$project$Types$Still, pos: girl.pos});
				return (((!A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, model.keyDowns)) || _Utils_eq(newOp.t, -1)) && ((A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, model.keyDowns) || (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, model.keyDowns) || (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, model.keyDowns) || A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Down, model.keyDowns)))) && (!newOp.t))) ? function (unis_) {
					return _Utils_update(
						model,
						{
							ops: A2(
								$elm$core$List$cons,
								$author$project$Flow$cyclic$renderHugOff(),
								A2($author$project$Operation$removeFilter, hugOp.filter, model.ops)),
							unis: unis_
						});
				}(
					A2(
						$elm$core$List$cons,
						_Utils_update(
							cat,
							{
								collisionStatus: $author$project$Types$Collision,
								gravityStatus: $author$project$Types$Ground,
								moveStatus: $author$project$Types$Moving,
								uni: $author$project$Types$Cat(
									_Utils_update(
										cat_,
										{status: $author$project$Types$Jump})),
								v: A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, model.keyDowns) ? A2($author$project$BasicTypes$combine, cat.v, cat_.v_jump) : cat.v
							}),
						A2(
							$elm$core$List$cons,
							_Utils_update(
								girl,
								{
									uni: $author$project$Types$Girl(
										_Utils_update(
											girl_,
											{status: $author$project$Types$Stay}))
								}),
							rest))) : _Utils_update(
					model,
					{
						ops: A2($author$project$Operation$refreshName, newOp, model.ops),
						unis: A2(
							$author$project$ModelTools$refreshUnis,
							newCat,
							A2(
								$author$project$ModelTools$refreshUnis,
								_Utils_update(
									girl,
									{v: $author$project$BasicTypes$zeroVector}),
								model.unis))
					});
			}));
}
function $author$project$Flow$cyclic$renderHugOff() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('hugOff'),
			func: $author$project$Flow$cyclic$hugOff(),
			name: A2($author$project$Types$Name, 'hugOff', -1),
			t: 0
		});
}
function $author$project$Flow$cyclic$hugOff() {
	return $author$project$Model$Func(
		F2(
			function (hugOp, model) {
				var newHugOp = _Utils_update(
					hugOp,
					{t: hugOp.t + 0.02});
				return (newHugOp.t > 1) ? _Utils_update(
					model,
					{
						ops: A2(
							$elm$core$List$cons,
							$author$project$Flow$cyclic$renderToHug(),
							A2($author$project$Operation$removeFilter, hugOp.filter, model.ops))
					}) : _Utils_update(
					model,
					{
						ops: A2($author$project$Operation$refreshName, newHugOp, model.ops)
					});
			}));
}
function $author$project$Flow$cyclic$renderToHug() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('toHug'),
			func: $author$project$Flow$cyclic$toHug(),
			name: A2($author$project$Types$Name, 'toHug', -1),
			t: -1
		});
}
function $author$project$Flow$cyclic$toHug() {
	return $author$project$Model$Func(
		F2(
			function (hugOp, model) {
				var girl_ = $author$project$ModelTools$getGirl_(model.unis);
				var cat_ = $author$project$ModelTools$getCat_(model.unis);
				var _v0 = $author$project$ModelTools$divCat(model.unis);
				var cat = _v0.a;
				var res = _v0.b;
				var cat_p = A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_passive;
					},
					cat);
				var _v1 = $author$project$ModelTools$divGirl(res);
				var girl = _v1.a;
				var rest = _v1.b;
				var girl_p = A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_passive;
					},
					girl);
				return A2($author$project$Type_Physics$hitPolys, cat_p, girl_p) ? function (unis_) {
					return _Utils_update(
						model,
						{
							keyDowns: model.keyDowns,
							ops: A2(
								$elm$core$List$cons,
								$author$project$Flow$cyclic$renderHugCheck(),
								A2($author$project$Operation$removeFilter, hugOp.filter, model.ops)),
							unis: unis_
						});
				}(
					A2(
						$elm$core$List$cons,
						_Utils_update(
							cat,
							{
								collisionStatus: $author$project$Types$NoCollision,
								gravityStatus: $author$project$Types$NoGravity,
								moveStatus: $author$project$Types$Still,
								pos: girl.pos,
								uni: $author$project$Types$Cat(
									_Utils_update(
										cat_,
										{status: $author$project$Types$Hugged}))
							}),
						A2(
							$elm$core$List$cons,
							_Utils_update(
								girl,
								{
									uni: $author$project$Types$Girl(
										_Utils_update(
											girl_,
											{status: $author$project$Types$Hug}))
								}),
							rest))) : model;
			}));
}
try {
	var $author$project$Flow$renderHugCheck = $author$project$Flow$cyclic$renderHugCheck();
	$author$project$Flow$cyclic$renderHugCheck = function () {
		return $author$project$Flow$renderHugCheck;
	};
	var $author$project$Flow$hugCheck = $author$project$Flow$cyclic$hugCheck();
	$author$project$Flow$cyclic$hugCheck = function () {
		return $author$project$Flow$hugCheck;
	};
	var $author$project$Flow$renderHugOff = $author$project$Flow$cyclic$renderHugOff();
	$author$project$Flow$cyclic$renderHugOff = function () {
		return $author$project$Flow$renderHugOff;
	};
	var $author$project$Flow$hugOff = $author$project$Flow$cyclic$hugOff();
	$author$project$Flow$cyclic$hugOff = function () {
		return $author$project$Flow$hugOff;
	};
	var $author$project$Flow$renderToHug = $author$project$Flow$cyclic$renderToHug();
	$author$project$Flow$cyclic$renderToHug = function () {
		return $author$project$Flow$renderToHug;
	};
	var $author$project$Flow$toHug = $author$project$Flow$cyclic$toHug();
	$author$project$Flow$cyclic$toHug = function () {
		return $author$project$Flow$toHug;
	};
} catch ($) {
	throw 'Some top-level definitions from `Flow` are causing infinite recursion:\n\n  ┌─────┐\n  │    renderHugCheck\n  │     ↓\n  │    hugCheck\n  │     ↓\n  │    renderHugOff\n  │     ↓\n  │    hugOff\n  │     ↓\n  │    renderToHug\n  │     ↓\n  │    toHug\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Flow$getHugOps = _List_fromArray(
	[$author$project$Flow$renderToHug]);
var $author$project$Model$reEffect = F3(
	function (fadeStates, music, model) {
		return _Utils_update(
			model,
			{fadeStates: fadeStates, music: music});
	});
var $author$project$Model$reFrame = F5(
	function (frame, viewBox, viewPos, v_step, model) {
		return _Utils_update(
			model,
			{frame: frame, v_step: v_step, viewBox: viewBox, viewPos: viewPos});
	});
var $author$project$Model$reModel = F5(
	function (unis, walls, inters, ops, model) {
		return _Utils_update(
			model,
			{ani: $author$project$Messages$Before, cache: _List_Nil, gameStatus: $author$project$Messages$Prepare, inters: inters, keyDowns: _List_Nil, ops: ops, t_clock: 0, t_elapse: 0, unis: unis, walls: walls});
	});
var $author$project$Types$removeStatus = function (uni) {
	return _Utils_update(
		uni,
		{collisionStatus: $author$project$Types$NoCollision, gravityStatus: $author$project$Types$NoGravity, moveStatus: $author$project$Types$Still});
};
var $author$project$Types$Box = {$: 'Box'};
var $author$project$BasicTypes$scalePoly = F2(
	function (_v0, poly) {
		var px = _v0.a;
		var py = _v0.b;
		return A2(
			$elm$core$List$map,
			function (p) {
				return A2($author$project$BasicTypes$Point, p.x * px, p.y * py);
			},
			poly);
	});
var $author$project$Objects$someBox = F3(
	function (index, pos, coll) {
		return A4(
			$author$project$Types$addStatus,
			$author$project$Types$Ground,
			$author$project$Types$Moving,
			$author$project$Types$Collision,
			A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				$author$project$BasicTypes$scalePoly(
					_Utils_Tuple2(1.2, 1.2)),
				A4(
					$author$project$Types$addPhysics,
					pos,
					coll,
					0,
					A3($author$project$Types$someUni, 'box', index, $author$project$Types$Box))));
	});
var $author$project$BasicTypes$solidPoly = F4(
	function (x1, y1, x2, y2) {
		return _List_fromArray(
			[
				A2($author$project$BasicTypes$Point, x1, y1),
				A2($author$project$BasicTypes$Point, (x1 + x2) / 2, y1),
				A2($author$project$BasicTypes$Point, x2, y1),
				A2($author$project$BasicTypes$Point, x2, (y1 + y2) / 2),
				A2($author$project$BasicTypes$Point, x2, y2),
				A2($author$project$BasicTypes$Point, (x2 + x1) / 2, y2),
				A2($author$project$BasicTypes$Point, x1, y2),
				A2($author$project$BasicTypes$Point, x1, (y2 + y1) / 2)
			]);
	});
var $author$project$Objects$someCat = F2(
	function (pos, ratio) {
		return A6(
			$author$project$Types$addVisual,
			5,
			_Utils_Tuple2(480 * ratio, 360 * ratio),
			$author$project$BasicTypes$zeroPoint,
			'./cat/standing 1.png',
			1,
			A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$scalePoly(
					_Utils_Tuple2(1.2, 0.4)),
				$author$project$BasicTypes$scalePoly(
					_Utils_Tuple2(0.2, 0.2)),
				A4(
					$author$project$Types$addPhysics,
					pos,
					A2(
						$author$project$BasicTypes$scalePoly,
						_Utils_Tuple2(ratio, ratio),
						A4($author$project$BasicTypes$solidPoly, -140, -100, 140, 110)),
					2,
					A3(
						$author$project$Types$someUni,
						'cat',
						0,
						$author$project$Types$Cat($author$project$Objects$someCat_)))));
	});
var $author$project$Objects$someGirl = F2(
	function (pos, ratio) {
		return A6(
			$author$project$Types$addVisual,
			4,
			_Utils_Tuple2(800 * ratio, 1600 * ratio),
			A2($author$project$BasicTypes$Point, 0, 0),
			'./girl/staying 1.png',
			1,
			A3(
				$author$project$Types$addInteractive,
				function (po) {
					return A2(
						$author$project$BasicTypes$movePoly,
						A2($author$project$BasicTypes$Point, 0, -30),
						A2(
							$author$project$BasicTypes$scalePoly,
							_Utils_Tuple2(1.4, 0.85),
							po));
				},
				function (po) {
					return A2(
						$author$project$BasicTypes$movePoly,
						A2($author$project$BasicTypes$Point, 0, -10),
						A2(
							$author$project$BasicTypes$scalePoly,
							_Utils_Tuple2(0.2, 0.3),
							po));
				},
				A4(
					$author$project$Types$addPhysics,
					pos,
					A2(
						$author$project$BasicTypes$scalePoly,
						_Utils_Tuple2(ratio, ratio),
						A4($author$project$BasicTypes$easyPoly, -170, -400, 170, 500)),
					1,
					A3(
						$author$project$Types$someUni,
						'girl',
						0,
						$author$project$Types$Girl($author$project$Objects$someGirl_)))));
	});
var $author$project$Operation$pushModelUnis = F2(
	function (model, unis) {
		return _Utils_update(
			model,
			{unis: unis});
	});
var $author$project$Operation$someGravity = function (gravity) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('gravity'),
			func: $author$project$Model$Func(
				F2(
					function (_v0, m) {
						return A2(
							$author$project$Operation$pushModelUnis,
							m,
							A2(
								$elm$core$List$map,
								function (u) {
									return (!_Utils_eq(u.gravityStatus, $author$project$Types$NoGravity)) ? _Utils_update(
										u,
										{
											a: A2($author$project$BasicTypes$combine, u.a, gravity)
										}) : u;
								},
								m.unis));
					})),
			name: A2($author$project$Types$Name, 'gravity', 0)
		});
};
var $author$project$Types$Ladder = function (a) {
	return {$: 'Ladder', a: a};
};
var $author$project$Objects$someLadder = F7(
	function (index, pos, end, dt, from, to, coll) {
		return A4(
			$author$project$Types$addStatus,
			$author$project$Types$NoGravity,
			$author$project$Types$Still,
			$author$project$Types$Collision,
			A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				function (po) {
					return A2(
						$author$project$BasicTypes$movePoly,
						A2($author$project$BasicTypes$Vector, 0, -100),
						A2(
							$author$project$BasicTypes$scalePoly,
							_Utils_Tuple2(2, 0.25),
							po));
				},
				A4(
					$author$project$Types$addPhysics,
					pos,
					coll,
					3,
					A3(
						$author$project$Types$someUni,
						'ladder',
						index,
						$author$project$Types$Ladder(
							{dt: dt, end: end, from: from, start: pos, status: $author$project$Messages$Before, to: to})))));
	});
var $author$project$Model$someMusic = F2(
	function (src, volume) {
		return _Utils_update(
			$author$project$Model$noMusic,
			{id: src, repeat: true, src: src, volume: volume});
	});
var $author$project$BasicTypes$reversePoly = F4(
	function (x1, y1, x2, y2) {
		return _List_fromArray(
			[
				A2($author$project$BasicTypes$Point, x1, y1),
				A2($author$project$BasicTypes$Point, x1, y2),
				A2($author$project$BasicTypes$Point, x2, y2),
				A2($author$project$BasicTypes$Point, x2, y1)
			]);
	});
var $author$project$Objects$someOutWall = F2(
	function (coordination, src) {
		return A6(
			$author$project$Types$addVisual,
			0,
			_Utils_Tuple2(coordination.w, coordination.h),
			A2($author$project$BasicTypes$Vector, coordination.w / 2, coordination.h / 2),
			src,
			1,
			A4(
				$author$project$Types$addStatus,
				$author$project$Types$NoGravity,
				$author$project$Types$Still,
				$author$project$Types$Collision,
				A3(
					$author$project$Types$addInteractive,
					$author$project$BasicTypes$noPoly,
					$author$project$BasicTypes$noPoly,
					A4(
						$author$project$Types$addPhysics,
						$author$project$BasicTypes$zeroPoint,
						A4($author$project$BasicTypes$reversePoly, 0, 0, coordination.w, coordination.h),
						0,
						A3($author$project$Types$someUni, 'outWall', -1, $author$project$Types$Static)))));
	});
var $author$project$L1_Livingroom$Init$reInit = function (model) {
	var ladder = A6(
		$author$project$Types$addVisual,
		3,
		_Utils_Tuple2(403, 1195),
		A2($author$project$BasicTypes$Point, -71.91, -33.91),
		'./L1_scene/ladder3.png',
		1,
		function (u) {
			return _Utils_update(
				u,
				{collisionStatus: $author$project$Types$NoCollision});
		}(
			A7(
				$author$project$Objects$someLadder,
				1,
				A2($author$project$BasicTypes$Point, 500, 1200),
				A2($author$project$BasicTypes$Point, 384, 1950),
				0.005,
				A2($author$project$BasicTypes$Point, 210, 1957),
				A2($author$project$BasicTypes$Point, 260, 510),
				A4($author$project$BasicTypes$easyPoly, -65, -550, 65, 500))));
	var item = function (uni) {
		return A6(
			$author$project$Types$addVisual,
			2,
			_Utils_Tuple2(308 * 1.2, 228 * 1.2),
			$author$project$BasicTypes$zeroVector,
			'./L1_scene/item.png',
			1,
			A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				function (_v0) {
					return A4($author$project$BasicTypes$easyPoly, -25, -35, 25, 35);
				},
				$author$project$Types$removeStatus(
					_Utils_update(
						uni,
						{
							pos: A2($author$project$BasicTypes$Point, 2400, 435)
						}))));
	}(
		A3($author$project$Types$someUni, 'item', 0, $author$project$Types$Static));
	var gravity = $author$project$Operation$someGravity(
		A2($author$project$BasicTypes$Vector, 0, 2));
	var ops = _Utils_ap(
		_List_fromArray(
			[gravity]),
		$author$project$Flow$getHugOps);
	var girl = A2(
		$author$project$Objects$someGirl,
		A2($author$project$BasicTypes$Point, 1000, 1950),
		1);
	var frame = A2($author$project$Types$Coordination, 4515, 2458);
	var grass = $author$project$Types$removeStatus(
		A6(
			$author$project$Types$addVisual,
			10,
			_Utils_Tuple2(frame.w, frame.h),
			A2($author$project$BasicTypes$Vector, (frame.w / 2) - 14, frame.h - 294),
			'./L1_scene/grass.png',
			1,
			A3($author$project$Types$someUni, 'grass', 0, $author$project$Types$Static)));
	var midWalls = _List_fromArray(
		[
			$author$project$Objects$fixedWall(
			A4($author$project$BasicTypes$easyPoly, -10, 0, 0, frame.h)),
			$author$project$Objects$fixedWall(
			A4($author$project$BasicTypes$easyPoly, frame.w, 0, frame.w + 10, frame.h)),
			$author$project$Objects$fixedWall(
			A4($author$project$BasicTypes$easyPoly, -10, frame.h, frame.w + 10, frame.h + 10)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, (frame.w / 2) - 170, (frame.h / 2) - 140),
			A4($author$project$BasicTypes$easyPoly, -1800, -20, 1600, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 3785, 1370),
			A4($author$project$BasicTypes$easyPoly, -175, -25, 175, 25)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 4075, 1635),
			A4($author$project$BasicTypes$easyPoly, -155, -25, 140, 25)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 4350, 1920),
			A4($author$project$BasicTypes$easyPoly, -175, -25, 175, 25)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 2395, 555),
			A4($author$project$BasicTypes$easyPoly, -175, -25, 175, 25))
		]);
	var outWall = A2($author$project$Objects$someOutWall, frame, './L1_scene/scene.png');
	var cat = A4(
		$author$project$Objects$changeCat_,
		A2($author$project$BasicTypes$Vector, 15, 50),
		A2($author$project$BasicTypes$Vector, 5, 0),
		A2($author$project$BasicTypes$Vector, 0, -40),
		function (u) {
			return _Utils_update(
				u,
				{turn: $author$project$BasicTypes$L_});
		}(
			A2(
				$author$project$Objects$someCat,
				A2($author$project$BasicTypes$Point, 1900, 2330),
				1)));
	var box = A6(
		$author$project$Types$addVisual,
		9,
		_Utils_Tuple2(430 / 1.01, 386 / 1.01),
		A2($author$project$BasicTypes$Point, 67, -85),
		'./L1_scene/box.png',
		1,
		A3(
			$author$project$Objects$someBox,
			1,
			A2($author$project$BasicTypes$Point, 1400, 2351),
			A4($author$project$BasicTypes$easyPoly, -100, -198, 230, 100)));
	var unis = _Utils_ap(
		_List_fromArray(
			[cat, girl, box, outWall, grass, ladder, item]),
		midWalls);
	var model_ = A3(
		$author$project$Model$reEffect,
		$author$project$State$defaultFadeInState,
		A2($author$project$Model$someMusic, './music/L1.mp3', 1),
		A5(
			$author$project$Model$reFrame,
			frame,
			frame,
			$author$project$BasicTypes$zeroPoint,
			1 / 4,
			A5($author$project$Model$reModel, unis, _List_Nil, _List_Nil, ops, model)));
	return model_;
};
var $author$project$Types$Board = function (a) {
	return {$: 'Board', a: a};
};
var $author$project$Messages$Doing = {$: 'Doing'};
var $author$project$L2_Bedroom$Flow$objA = 40;
var $author$project$L2_Bedroom$Flow$someObject = F3(
	function (index, pos, coll) {
		return function (u) {
			return $author$project$Types$removeStatus(
				_Utils_update(
					u,
					{index: index, name: 'object'}));
		}(
			A2($author$project$Objects$someWall, pos, coll));
	});
var $author$project$L2_Bedroom$Flow$blocker = A3(
	$author$project$L2_Bedroom$Flow$someObject,
	100,
	A2($author$project$BasicTypes$Point, 1200, 1700),
	A4($author$project$BasicTypes$easyPoly, -$author$project$L2_Bedroom$Flow$objA, -$author$project$L2_Bedroom$Flow$objA, $author$project$L2_Bedroom$Flow$objA, $author$project$L2_Bedroom$Flow$objA));
var $author$project$Try$forceCatOrder = F2(
	function (order, cat) {
		var _v0 = cat.uni;
		if (_v0.$ === 'Cat') {
			var cat_ = _v0.a;
			return function (c_) {
				return _Utils_update(
					cat,
					{
						uni: $author$project$Types$Cat(c_)
					});
			}(
				_Utils_update(
					cat_,
					{status: order}));
		} else {
			return cat;
		}
	});
var $author$project$ModelTools$getCat = function (unis) {
	return A2($author$project$ModelTools$findNameString, 'cat', unis);
};
var $author$project$ModelTools$getGirl = function (unis) {
	return A2($author$project$ModelTools$findNameString, 'girl', unis);
};
var $author$project$Operation$getName = F2(
	function (name, ops) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Operation$dummyOperation,
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (o) {
						return _Utils_eq(o.name, name);
					},
					ops)));
	});
var $author$project$ModelTools$removeUnis = F2(
	function (_v0, list) {
		var index = _v0.index;
		var name = _v0.name;
		return A2(
			$elm$core$List$filter,
			function (obj) {
				return (!_Utils_eq(obj.index, index)) || (!_Utils_eq(obj.name, name));
			},
			list);
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$BasicTypes$rotate = F2(
	function (rot, degree) {
		var theta = (degree * $elm$core$Basics$pi) / 180;
		var b1 = $elm$core$Basics$sin(theta);
		var a2 = -b1;
		var a1 = $elm$core$Basics$cos(theta);
		var b2 = a1;
		var rot_ = A2($author$project$BasicTypes$Point, (a1 * rot.x) + (b1 * rot.y), (a2 * rot.x) + (b2 * rot.y));
		return rot_;
	});
var $author$project$Type_Physics$rotateUni = F2(
	function (degree, uni) {
		return _Utils_update(
			uni,
			{
				coll: A2(
					$elm$core$List$map,
					function (p) {
						return A2($author$project$BasicTypes$rotate, p, degree);
					},
					uni.coll),
				i_active: A2(
					$elm$core$List$map,
					function (p) {
						return A2($author$project$BasicTypes$rotate, p, degree);
					},
					uni.i_active),
				i_passive: A2(
					$elm$core$List$map,
					function (p) {
						return A2($author$project$BasicTypes$rotate, p, degree);
					},
					uni.i_passive)
			});
	});
var $author$project$L2_Bedroom$Flow$blowDown = $author$project$Model$Func(
	F2(
		function (op, model) {
			var girl_ = $author$project$ModelTools$getGirl_(model.unis);
			var girl = $author$project$ModelTools$getGirl(model.unis);
			var blow = A2($author$project$ModelTools$findNameString, 'blowDown', model.unis);
			if (op.t >= 1) {
				return _Utils_update(
					model,
					{
						ops: A2(
							$author$project$Operation$refreshName,
							_Utils_update(
								op,
								{t: 0}),
							model.ops),
						unis: A2($author$project$ModelTools$removeUnis, $author$project$L2_Bedroom$Flow$blocker, model.unis)
					});
			} else {
				if (op.t > 0) {
					return _Utils_update(
						model,
						{
							ops: A2(
								$author$project$Operation$refreshName,
								_Utils_update(
									op,
									{t: op.t + 0.02}),
								model.ops)
						});
				} else {
					if (A2(
						$author$project$Type_Physics$pointInPoly,
						girl.pos,
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							blow))) {
						var newGirl = A2(
							$author$project$Type_Physics$rotateUni,
							90,
							_Utils_update(
								girl,
								{
									collisionStatus: $author$project$Types$Collision,
									h: girl.w,
									offset: A2(
										$author$project$BasicTypes$combine,
										A2($author$project$BasicTypes$Vector, 0, -20),
										girl.offset),
									uni: $author$project$Types$Girl(
										_Utils_update(
											girl_,
											{status: $author$project$Types$Stay})),
									v: A2($author$project$BasicTypes$Vector, 0, 20),
									w: girl.h
								}));
						var boardOp = function (o) {
							return _Utils_update(
								o,
								{t: o.t + 0.02});
						}(
							A2(
								$author$project$Operation$getName,
								A2($author$project$Types$Name, 'boardTeleport', 0),
								model.ops));
						return function (m) {
							var cat = $author$project$ModelTools$getCat(m.unis);
							var newCat = function (c) {
								return _Utils_update(
									c,
									{a: $author$project$BasicTypes$zeroVector, v: $author$project$BasicTypes$zeroVector});
							}(
								A2($author$project$Try$forceCatOrder, $author$project$Types$Stand, cat));
							return _Utils_update(
								m,
								{
									unis: A2($author$project$ModelTools$refreshUnis, newCat, m.unis)
								});
						}(
							_Utils_update(
								model,
								{
									ops: A2(
										$author$project$Operation$removeName,
										A2($author$project$Types$Name, 'fly', 0),
										A2(
											$author$project$Operation$refreshName,
											_Utils_update(
												op,
												{t: op.t + 0.02}),
											A2($author$project$Operation$refreshName, boardOp, model.ops))),
									unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
								}));
					} else {
						return model;
					}
				}
			}
		}));
var $author$project$L2_Bedroom$Flow$renderBlowDown = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('blowDown'),
		func: $author$project$L2_Bedroom$Flow$blowDown,
		name: A2($author$project$Types$Name, 'blowDown', 0),
		t: 0
	});
var $author$project$Types$Fly = {$: 'Fly'};
var $author$project$Types$Sit = {$: 'Sit'};
var $author$project$ModelTools$filterNameString = function (name) {
	return $elm$core$List$filter(
		function (u) {
			return _Utils_eq(u.name, name);
		});
};
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$BasicTypes$distance = F2(
	function (p1, p2) {
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, p1.x - p2.x, 2) + A2($elm$core$Basics$pow, p1.y - p2.y, 2));
	});
var $author$project$BasicTypes$norm = $author$project$BasicTypes$distance(
	A2($author$project$BasicTypes$Point, 0, 0));
var $author$project$BasicTypes$scale = F2(
	function (t, v) {
		return A2($author$project$BasicTypes$Point, t * v.x, t * v.y);
	});
var $author$project$BasicTypes$normalize = function (p) {
	return A2(
		$author$project$BasicTypes$scale,
		1 / $author$project$BasicTypes$norm(p),
		p);
};
var $author$project$BasicTypes$vector = F2(
	function (a, b) {
		return {x: b.x - a.x, y: b.y - a.y};
	});
var $author$project$L2_Bedroom$Flow$fly = $author$project$Model$Func(
	F2(
		function (op, model) {
			var objects = A2($author$project$ModelTools$filterNameString, 'object', model.unis);
			var isKey = function (k) {
				return A2($author$project$Operation$keyIn, k, model.keyDowns);
			};
			var girl = A2($author$project$ModelTools$findNameString, 'girl', model.unis);
			var push = A3(
				$elm$core$List$foldl,
				F2(
					function (obj, pu) {
						return A2(
							$author$project$Type_Physics$hitPolys,
							A2(
								$author$project$Type_Physics$moveObjPoly,
								function ($) {
									return $.coll;
								},
								girl),
							A2(
								$author$project$Type_Physics$moveObjPoly,
								function ($) {
									return $.coll;
								},
								obj)) ? A2(
							$author$project$BasicTypes$combine,
							pu,
							A2(
								$author$project$BasicTypes$scale,
								1.001 * $author$project$BasicTypes$norm(girl.v),
								$author$project$BasicTypes$normalize(
									A2($author$project$BasicTypes$vector, obj.pos, girl.pos)))) : pu;
					}),
				$author$project$BasicTypes$zeroVector,
				objects);
			var isHit = $author$project$BasicTypes$norm(push) > 0;
			return function (m) {
				var cat = $author$project$ModelTools$getCat(m.unis);
				var newCat = function (c) {
					return _Utils_update(
						c,
						{a: $author$project$BasicTypes$zeroVector, v: $author$project$BasicTypes$zeroVector});
				}(
					A2($author$project$Try$forceCatOrder, $author$project$Types$Sit, cat));
				return _Utils_update(
					m,
					{
						unis: A2($author$project$ModelTools$refreshUnis, newCat, m.unis)
					});
			}(
				function () {
					if (_Utils_eq(op.t, -1) && isHit) {
						var newGirl = _Utils_update(
							girl,
							{
								pos: A2($author$project$BasicTypes$combine, girl.pos, push),
								v: $author$project$BasicTypes$zeroVector
							});
						return _Utils_update(
							model,
							{
								ops: A2(
									$author$project$Operation$refreshName,
									_Utils_update(
										op,
										{t: 0}),
									model.ops),
								unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
							});
					} else {
						if (!op.t) {
							var speed = 20;
							var newGirl = function (dir) {
								return _Utils_update(
									girl,
									{v: dir});
							}(
								isKey($author$project$Messages$Arrow_Up) ? A2($author$project$BasicTypes$Vector, 0, -speed) : (isKey($author$project$Messages$Arrow_Down) ? A2($author$project$BasicTypes$Vector, 0, speed) : (isKey($author$project$Messages$Arrow_Left) ? A2($author$project$BasicTypes$Vector, -speed, 0) : (isKey($author$project$Messages$Arrow_Right) ? A2($author$project$BasicTypes$Vector, speed, 0) : $author$project$BasicTypes$zeroVector))));
							return _Utils_update(
								model,
								{
									ops: A2(
										$author$project$Operation$refreshName,
										_Utils_update(
											op,
											{
												t: _Utils_eq(newGirl.v, $author$project$BasicTypes$zeroVector) ? 0 : (-1)
											}),
										model.ops),
									unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
								});
						} else {
							return model;
						}
					}
				}());
		}));
var $author$project$L2_Bedroom$Flow$renderFly = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('fly'),
		func: $author$project$L2_Bedroom$Flow$fly,
		name: A2($author$project$Types$Name, 'fly', 0),
		t: -1
	});
var $author$project$L2_Bedroom$Flow$blowUp = $author$project$Model$Func(
	F2(
		function (op, model) {
			var girl_ = $author$project$ModelTools$getGirl_(model.unis);
			var girl = $author$project$ModelTools$getGirl(model.unis);
			var blow = A2($author$project$ModelTools$findNameString, 'blowUp', model.unis);
			if (op.t >= 1) {
				return _Utils_update(
					model,
					{
						ops: A2(
							$author$project$Operation$refreshName,
							_Utils_update(
								op,
								{t: 0}),
							model.ops),
						unis: A2($elm$core$List$cons, $author$project$L2_Bedroom$Flow$blocker, model.unis)
					});
			} else {
				if (op.t > 0) {
					return _Utils_update(
						model,
						{
							ops: A2(
								$author$project$Operation$refreshName,
								_Utils_update(
									op,
									{t: op.t + 0.02}),
								model.ops)
						});
				} else {
					if (A2(
						$author$project$Type_Physics$pointInPoly,
						girl.pos,
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							blow))) {
						var newGirl = A2(
							$author$project$Type_Physics$rotateUni,
							-90,
							_Utils_update(
								girl,
								{
									collisionStatus: $author$project$Types$NoCollision,
									h: girl.w,
									offset: A2(
										$author$project$BasicTypes$combine,
										A2($author$project$BasicTypes$Vector, 0, 20),
										girl.offset),
									pos: A2(
										$author$project$BasicTypes$combine,
										A2($author$project$BasicTypes$Vector, 20, 0),
										girl.pos),
									uni: $author$project$Types$Girl(
										_Utils_update(
											girl_,
											{status: $author$project$Types$Fly})),
									v: A2($author$project$BasicTypes$Vector, 0, -42),
									w: girl.h
								}));
						return _Utils_update(
							model,
							{
								ops: A2(
									$elm$core$List$cons,
									$author$project$L2_Bedroom$Flow$renderFly,
									A2(
										$author$project$Operation$refreshName,
										_Utils_update(
											op,
											{t: op.t + 0.02}),
										model.ops)),
								unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
							});
					} else {
						return model;
					}
				}
			}
		}));
var $author$project$L2_Bedroom$Flow$renderBlowUp = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('blowUp'),
		func: $author$project$L2_Bedroom$Flow$blowUp,
		name: A2($author$project$Types$Name, 'blowUp', 0),
		t: 0
	});
var $author$project$L2_Bedroom$Flow$getBlowOps = _List_fromArray(
	[$author$project$L2_Bedroom$Flow$renderBlowUp, $author$project$L2_Bedroom$Flow$renderBlowDown]);
var $author$project$BasicTypes$dot = F2(
	function (v1, v2) {
		return (v1.x * v2.x) + (v1.y * v2.y);
	});
var $author$project$Objects$dummyBoard_ = {dt: 0.05, status: $author$project$Messages$Before, teleport: $author$project$BasicTypes$zeroVector};
var $author$project$L2_Bedroom$Flow$boardTeleport = $author$project$Model$Func(
	F2(
		function (op, model) {
			var girl = $author$project$ModelTools$getGirl(model.unis);
			var boards = A2($author$project$ModelTools$filterNameString, 'board', model.unis);
			var board_Board_ = function (board) {
				var _v2 = board.uni;
				if (_v2.$ === 'Board') {
					var board_ = _v2.a;
					return board_;
				} else {
					return $author$project$Objects$dummyBoard_;
				}
			};
			var forwardGirl = F2(
				function (board, gi_) {
					var dir = board_Board_(board).teleport;
					return (_Utils_eq(
						board_Board_(board).status,
						$author$project$Messages$Doing) && (A2(
						$author$project$Type_Physics$pointInPoly,
						gi_.pos,
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							board)) && (A2($author$project$BasicTypes$dot, gi_.v, dir) <= 0))) ? _Utils_Tuple2(
						_Utils_update(
							gi_,
							{
								pos: A2($author$project$BasicTypes$combine, gi_.pos, dir)
							}),
						true) : _Utils_Tuple2(gi_, false);
				});
			var _v0 = A3(
				$elm$core$List$foldl,
				F2(
					function (board, _v1) {
						var gi_ = _v1.a;
						var done = _v1.b;
						return done ? _Utils_Tuple2(gi_, done) : A2(forwardGirl, board, gi_);
					}),
				_Utils_Tuple2(girl, false),
				boards);
			var newGirl = _v0.a;
			var isTeleport = _v0.b;
			return (op.t >= 1) ? _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: 0}),
						model.ops)
				}) : ((op.t > 0) ? _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: op.t + 0.08}),
						model.ops)
				}) : (isTeleport ? _Utils_update(
				model,
				{
					unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
				}) : model));
		}));
var $author$project$L2_Bedroom$Flow$renderBoardTeleport = function (index) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('boardTeleport'),
			func: $author$project$L2_Bedroom$Flow$boardTeleport,
			name: A2($author$project$Types$Name, 'boardTeleport', index),
			t: 0
		});
};
var $author$project$L2_Bedroom$Flow$getBoardOps = _List_fromArray(
	[
		$author$project$L2_Bedroom$Flow$renderBoardTeleport(0)
	]);
var $author$project$L2_Bedroom$Flow$getBoxUp = _List_fromArray(
	[
		_Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('boxUp'),
			func: $author$project$Model$Func(
				F2(
					function (op, model) {
						var girl = $author$project$ModelTools$getGirl(model.unis);
						var box = A2($author$project$ModelTools$findNameString, 'box', model.unis);
						return A2(
							$author$project$Type_Physics$pointInPoly,
							girl.pos,
							A2(
								$author$project$BasicTypes$movePoly,
								A2($author$project$BasicTypes$Vector, 0, -300),
								A2(
									$author$project$Type_Physics$moveObjPoly,
									function ($) {
										return $.i_passive;
									},
									box))) ? _Utils_update(
							model,
							{
								ops: A2(
									$author$project$Operation$refreshName,
									_Utils_update(
										op,
										{t: op.t + 1}),
									model.ops),
								unis: A2(
									$author$project$ModelTools$refreshUnis,
									_Utils_update(
										girl,
										{
											a: A2(
												$author$project$BasicTypes$combine,
												girl.a,
												A2($author$project$BasicTypes$Vector, 0, -2))
										}),
									model.unis)
							}) : model;
					})),
			name: A2($author$project$Types$Name, 'boxUp', 0),
			t: 0
		})
	]);
var $author$project$Messages$After = {$: 'After'};
var $author$project$Messages$Pass = {$: 'Pass'};
var $author$project$L2_Bedroom$Flow$itemTouched = $author$project$Model$Func(
	F2(
		function (op, model) {
			var item = A2($author$project$ModelTools$findNameString, 'item', model.unis);
			var isGround = _Utils_eq(item.gravityStatus, $author$project$Types$Ground);
			var girl = $author$project$ModelTools$getGirl(model.unis);
			var cat = $author$project$ModelTools$getCat(model.unis);
			return isGround ? (((A2($author$project$BasicTypes$distance, item.pos, cat.pos) < 200) && ((A2($author$project$BasicTypes$distance, item.pos, girl.pos) < 400) && A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns))) ? _Utils_update(
				model,
				{ani: $author$project$Messages$After, gameStatus: $author$project$Messages$Pass}) : model) : ((A2(
				$author$project$Type_Physics$pointInPoly,
				girl.pos,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_passive;
					},
					item)) && A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns)) ? _Utils_update(
				model,
				{
					unis: A2(
						$author$project$ModelTools$refreshUnis,
						_Utils_update(
							item,
							{collisionStatus: $author$project$Types$Collision, gravityStatus: $author$project$Types$Air, moveStatus: $author$project$Types$Moving}),
						model.unis)
				}) : model);
		}));
var $author$project$L2_Bedroom$Flow$renderItemTouched = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('item'),
		func: $author$project$L2_Bedroom$Flow$itemTouched,
		name: A2($author$project$Types$Name, 'itemTouched', -1),
		t: 0
	});
var $author$project$Objects$sideWalls = function (coordination) {
	return _List_fromArray(
		[
			$author$project$Objects$fixedWall(
			A4($author$project$BasicTypes$easyPoly, -10, 0, 0, coordination.h)),
			$author$project$Objects$fixedWall(
			A4($author$project$BasicTypes$easyPoly, coordination.w, 0, coordination.w + 10, coordination.h))
		]);
};
var $author$project$L2_Bedroom$Init$reInit = function (model) {
	var someObject = F3(
		function (index, pos, coll) {
			return function (u) {
				return $author$project$Types$removeStatus(
					_Utils_update(
						u,
						{index: index, name: 'object'}));
			}(
				A2($author$project$Objects$someWall, pos, coll));
		});
	var someBoard = F4(
		function (index, tele, pos, coll) {
			return A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				$elm$core$Basics$identity,
				A4(
					$author$project$Types$addStatus,
					$author$project$Types$NoGravity,
					$author$project$Types$Still,
					$author$project$Types$NoCollision,
					A4(
						$author$project$Types$addPhysics,
						pos,
						coll,
						3,
						A3(
							$author$project$Types$someUni,
							'board',
							index,
							$author$project$Types$Board(
								{dt: 0.05, status: $author$project$Messages$Doing, teleport: tele})))));
		});
	var objA = 40;
	var objects = _List_fromArray(
		[
			A3(
			someObject,
			0,
			A2($author$project$BasicTypes$Point, 640, 620),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			1,
			A2($author$project$BasicTypes$Point, 820, 1370),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			2,
			A2($author$project$BasicTypes$Point, 1200, 230),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			3,
			A2($author$project$BasicTypes$Point, 1610, 365),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			4,
			A2($author$project$BasicTypes$Point, 1985, 515),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			5,
			A2($author$project$BasicTypes$Point, 2410, 1020),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			6,
			A2($author$project$BasicTypes$Point, 2670, 1560),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			6,
			A2($author$project$BasicTypes$Point, 2670, 200),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			7,
			A2($author$project$BasicTypes$Point, 3000, 850),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			8,
			A2($author$project$BasicTypes$Point, 3270, 620),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA)),
			A3(
			someObject,
			9,
			A2($author$project$BasicTypes$Point, 3510, 1370),
			A4($author$project$BasicTypes$easyPoly, -objA, -objA, objA, objA))
		]);
	var gravity = $author$project$Operation$someGravity(
		A2($author$project$BasicTypes$Vector, 0, 2));
	var girl = function (g) {
		return _Utils_update(
			g,
			{
				coll: A4($author$project$BasicTypes$easyPoly, -80, -240, 80, 240),
				i_active: A4($author$project$BasicTypes$easyPoly, -110, -160, 110, 160),
				uni: $author$project$Types$Girl(
					{
						a_max: A2($author$project$BasicTypes$Vector, 12, 0),
						status: $author$project$Types$Stay,
						v_climb: A2($author$project$BasicTypes$Vector, 0, 6),
						v_max: A2($author$project$BasicTypes$Vector, 30, 100)
					})
			});
	}(
		A2(
			$author$project$Objects$someGirl,
			A2($author$project$BasicTypes$Point, 300, 2090),
			0.5));
	var frame = A2($author$project$Types$Coordination, 3816, 2532);
	var item = A6(
		$author$project$Types$addVisual,
		3,
		_Utils_Tuple2(574 / 2, 354 / 2),
		$author$project$BasicTypes$zeroVector,
		'./L2_scene/item.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			$author$project$BasicTypes$scalePoly(
				_Utils_Tuple2(2, 2)),
			$author$project$Types$removeStatus(
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, (frame.w / 2) + 320, frame.h / 2),
					A4($author$project$BasicTypes$easyPoly, -100, -100, 100, 20),
					10,
					A3($author$project$Types$someUni, 'item', 0, $author$project$Types$Static)))));
	var midWalls = _List_fromArray(
		[
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, frame.w / 2, frame.h - 155),
			A4($author$project$BasicTypes$easyPoly, -1250, -40, (frame.w / 2) - 60, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 0, frame.h - 155),
			A4($author$project$BasicTypes$easyPoly, -500, -40, 470, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 450, frame.h - 20),
			A4($author$project$BasicTypes$easyPoly, -500, -20, 475, 20)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 2260, frame.h - 300),
			A4($author$project$BasicTypes$easyPoly, -210, -90, 180, 110))
		]);
	var outWalls = _Utils_ap(
		_List_fromArray(
			[
				A2($author$project$Objects$someOutWall, frame, './L2_scene/scene.png')
			]),
		$author$project$Objects$sideWalls(frame));
	var floatArea = A4($author$project$BasicTypes$easyPoly, frame.w * 0.16, 0, (frame.w * 11) / 12, frame.h * 0.7);
	var floater = _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('floater'),
			func: $author$project$Model$Func(
				F2(
					function (_v2, mo) {
						return A2(
							$author$project$Operation$pushModelUnis,
							mo,
							A2(
								$author$project$ModelTools$refreshUnis,
								function (u) {
									return ((!_Utils_eq(u.gravityStatus, $author$project$Types$NoGravity)) && A2($author$project$Type_Physics$pointInPoly, u.pos, floatArea)) ? _Utils_update(
										u,
										{
											a: A2(
												$author$project$BasicTypes$combine,
												u.a,
												A2($author$project$BasicTypes$Vector, 0, -2))
										}) : u;
								}(
									A2($author$project$ModelTools$findNameString, 'girl', mo.unis)),
								mo.unis));
					})),
			name: A2($author$project$Types$Name, 'floater', 0)
		});
	var ops = _Utils_ap(
		_List_fromArray(
			[gravity, floater, $author$project$L2_Bedroom$Flow$renderItemTouched]),
		_Utils_ap(
			$author$project$Flow$getHugOps,
			_Utils_ap(
				$author$project$L2_Bedroom$Flow$getBoardOps,
				_Utils_ap($author$project$L2_Bedroom$Flow$getBlowOps, $author$project$L2_Bedroom$Flow$getBoxUp))));
	var cat = function (c) {
		return _Utils_update(
			c,
			{
				i_active: A4($author$project$BasicTypes$easyPoly, -122, -40, 122, 40),
				uni: $author$project$Types$Cat(
					{
						a_max: A2($author$project$BasicTypes$Vector, 15, 0),
						status: $author$project$Types$Stand,
						v_jump: A2($author$project$BasicTypes$Vector, 0, -35),
						v_max: A2($author$project$BasicTypes$Vector, 15, 100)
					})
			});
	}(
		A2(
			$author$project$Objects$someCat,
			A2($author$project$BasicTypes$Point, 850, 2250),
			0.7));
	var box2 = A6(
		$author$project$Types$addVisual,
		9,
		_Utils_Tuple2(134 * 3.8, 71 * 3.8),
		A2($author$project$BasicTypes$Point, 0, -40),
		'./L2_scene/box.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			$author$project$BasicTypes$scalePoly(
				_Utils_Tuple2(1.4, 1.2)),
			A3(
				$author$project$Objects$someBox,
				2,
				A2($author$project$BasicTypes$Point, 1200, 2261.1),
				A4($author$project$BasicTypes$easyPoly, -80, -80, 80, 72))));
	var boards = _List_fromArray(
		[
			A4(
			someBoard,
			1,
			A2($author$project$BasicTypes$Vector, 2420, 0),
			A2($author$project$BasicTypes$Point, 710, 936),
			A4($author$project$BasicTypes$easyPoly, -20, -800, 20, 800)),
			A4(
			someBoard,
			2,
			A2($author$project$BasicTypes$Vector, 0, 1420),
			A2($author$project$BasicTypes$Point, 2054, 200),
			A4($author$project$BasicTypes$easyPoly, -1444, -20, 1444, 20)),
			A4(
			someBoard,
			3,
			A2($author$project$BasicTypes$Vector, -2420, 0),
			A2($author$project$BasicTypes$Point, 3398, 936),
			A4($author$project$BasicTypes$easyPoly, -20, -800, 20, 800)),
			A4(
			someBoard,
			4,
			A2($author$project$BasicTypes$Vector, 0, -1420),
			A2($author$project$BasicTypes$Point, 2054, 1672),
			A4($author$project$BasicTypes$easyPoly, -1444, -20, 1444, 20))
		]);
	var blowUp = A3(
		$author$project$Types$addInteractive,
		$author$project$BasicTypes$noPoly,
		function (_v1) {
			return A4($author$project$BasicTypes$easyPoly, -20, -100, 20, 100);
		},
		A4(
			$author$project$Types$addStatus,
			$author$project$Types$NoGravity,
			$author$project$Types$Still,
			$author$project$Types$NoCollision,
			A4(
				$author$project$Types$addPhysics,
				A2($author$project$BasicTypes$Point, 1200, 2100),
				_List_Nil,
				3,
				A3($author$project$Types$someUni, 'blowUp', 0, $author$project$Types$Static))));
	var blowDown = A3(
		$author$project$Types$addInteractive,
		$author$project$BasicTypes$noPoly,
		function (_v0) {
			return A4($author$project$BasicTypes$easyPoly, -100, -50, 100, 50);
		},
		A4(
			$author$project$Types$addStatus,
			$author$project$Types$NoGravity,
			$author$project$Types$Still,
			$author$project$Types$NoCollision,
			A4(
				$author$project$Types$addPhysics,
				A2($author$project$BasicTypes$Point, 3240, 1660),
				_List_Nil,
				3,
				A3($author$project$Types$someUni, 'blowDown', 0, $author$project$Types$Static))));
	var unis = _Utils_ap(
		_List_fromArray(
			[cat, girl, box2, item, blowUp, blowDown]),
		_Utils_ap(
			outWalls,
			_Utils_ap(
				midWalls,
				_Utils_ap(boards, objects))));
	var model_ = A3(
		$author$project$Model$reEffect,
		$author$project$State$defaultFadeInState,
		A2($author$project$Model$someMusic, './music/L2.mp3', 1),
		A5(
			$author$project$Model$reFrame,
			frame,
			frame,
			$author$project$BasicTypes$zeroPoint,
			1 / 4,
			A5($author$project$Model$reModel, unis, _List_Nil, _List_Nil, ops, model)));
	return model_;
};
var $author$project$Types$Lift = {$: 'Lift'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$Objects$changeGirl_ = F4(
	function (v_max, a_max, v_climb, girl) {
		var girl_ = function () {
			var _v0 = girl.uni;
			if (_v0.$ === 'Girl') {
				return {a_max: a_max, status: $author$project$Types$Stay, v_climb: v_climb, v_max: v_max};
			} else {
				return $author$project$Objects$someGirl_;
			}
		}();
		return _Utils_update(
			girl,
			{
				uni: $author$project$Types$Girl(girl_)
			});
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Types$Bubble = function (a) {
	return {$: 'Bubble', a: a};
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Objects$dummyBubble_ = {coll: _List_Nil, h: 0, h_f: 0, h_i: 0, w: 0};
var $author$project$BasicTypes$ellipsePoly = F2(
	function (_v0, precision) {
		var a = _v0.a;
		var b = _v0.b;
		var unit = (2 * $elm$core$Basics$pi) / precision;
		return A2(
			$elm$core$List$map,
			function (rad) {
				return A2(
					$author$project$BasicTypes$Point,
					a * $elm$core$Basics$sin(rad),
					b * $elm$core$Basics$cos(rad));
			},
			A2(
				$elm$core$List$map,
				function (i) {
					return unit * (i - ((1 + precision) / 2));
				},
				A2($elm$core$List$range, 1, precision)));
	});
var $author$project$Try$forceGirlOrder = F2(
	function (order, girl) {
		var _v0 = girl.uni;
		if (_v0.$ === 'Girl') {
			var girl_ = _v0.a;
			return function (g_) {
				return _Utils_update(
					girl,
					{
						uni: $author$project$Types$Girl(g_)
					});
			}(
				_Utils_update(
					girl_,
					{status: order}));
		} else {
			return girl;
		}
	});
var $author$project$ModelTools$pickSerialList = F2(
	function (_v0, list) {
		var index = _v0.index;
		var name = _v0.name;
		return $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (obj) {
					return _Utils_eq(obj.index, index) && _Utils_eq(obj.name, name);
				},
				list));
	});
var $author$project$ModelTools$pickUnis = F2(
	function (_v0, unis) {
		var index = _v0.index;
		var name = _v0.name;
		return A2(
			$author$project$ModelTools$pickSerialList,
			_Utils_update(
				$author$project$Types$dummyUni,
				{index: index, name: name}),
			unis);
	});
function $author$project$L3_Bathroom$Flow$cyclic$renderBubbleGen() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('bubbleGen'),
			func: $author$project$L3_Bathroom$Flow$cyclic$bubbleGen(),
			name: A2($author$project$Types$Name, 'bubbleGen', 0),
			t: 0
		});
}
function $author$project$L3_Bathroom$Flow$cyclic$bubbleGen() {
	return $author$project$Model$Func(
		F2(
			function (op, model) {
				var t_ = A3($elm$core$Basics$clamp, 0, 1, op.t) + 0.01;
				var maybeBubble = A2(
					$author$project$ModelTools$pickUnis,
					{index: 0, name: 'bubble'},
					model.unis);
				var bubble_k = 1.5;
				var bubble_info = {
					coll: A2(
						$author$project$BasicTypes$ellipsePoly,
						_Utils_Tuple2(80 * bubble_k, 80 * bubble_k),
						6),
					h: (207 * bubble_k) * 1.1,
					h_f: 400,
					h_i: 1790,
					w: (198 * bubble_k) * 1.1
				};
				var someBubble = A6(
					$author$project$Types$addVisual,
					9,
					_Utils_Tuple2(0, 0),
					$author$project$BasicTypes$zeroPoint,
					'./L3_scene/bubble.png',
					0.9,
					$author$project$Types$removeStatus(
						A3(
							$author$project$Types$addInteractive,
							$author$project$BasicTypes$noPoly,
							$author$project$BasicTypes$scalePoly(
								_Utils_Tuple2(0.3, 0.3)),
							A4(
								$author$project$Types$addPhysics,
								A2($author$project$BasicTypes$Point, 650, bubble_info.h_i),
								bubble_info.coll,
								6,
								A3(
									$author$project$Types$someUni,
									'bubble',
									0,
									$author$project$Types$Bubble(bubble_info))))));
				var bubble = function () {
					if (maybeBubble.$ === 'Just') {
						var b = maybeBubble.a;
						var trans = $elm$core$Basics$sin((t_ * $elm$core$Basics$pi) / 2);
						return _Utils_update(
							b,
							{
								coll: A2(
									$author$project$BasicTypes$scalePoly,
									_Utils_Tuple2(trans, trans),
									bubble_info.coll),
								h: trans * bubble_info.h,
								i_passive: A2(
									$author$project$BasicTypes$scalePoly,
									_Utils_Tuple2(0.3, 0.3),
									A2(
										$author$project$BasicTypes$scalePoly,
										_Utils_Tuple2(trans, trans),
										bubble_info.coll)),
								w: trans * bubble_info.w
							});
					} else {
						return someBubble;
					}
				}();
				return function (m) {
					return (t_ >= 1) ? _Utils_update(
						m,
						{
							ops: A2(
								$elm$core$List$cons,
								$author$project$L3_Bathroom$Flow$cyclic$renderBubbleMove(),
								A2($author$project$Operation$removeName, op.name, model.ops))
						}) : _Utils_update(
						m,
						{
							ops: A2(
								$author$project$Operation$refreshName,
								_Utils_update(
									op,
									{t: t_}),
								model.ops)
						});
				}(
					function (unis) {
						return _Utils_update(
							model,
							{unis: unis});
					}(
						A2($author$project$ModelTools$refreshUnis, bubble, model.unis)));
			}));
}
function $author$project$L3_Bathroom$Flow$cyclic$renderBubbleMove() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('bubbleMove'),
			func: $author$project$L3_Bathroom$Flow$cyclic$bubbleMove(),
			name: A2($author$project$Types$Name, 'bubbleMove', 0),
			t: 0
		});
}
function $author$project$L3_Bathroom$Flow$cyclic$bubbleMove() {
	return $author$project$Model$Func(
		F2(
			function (op, model) {
				var girl = $author$project$ModelTools$getGirl(model.unis);
				var bubble = A2($author$project$ModelTools$findNameString, 'bubble', model.unis);
				var _v0 = function () {
					var _v1 = bubble.uni;
					if (_v1.$ === 'Bubble') {
						var b_ = _v1.a;
						return b_;
					} else {
						return $author$project$Objects$dummyBubble_;
					}
				}();
				var h_i = _v0.h_i;
				var h_f = _v0.h_f;
				var w = _v0.w;
				var h = _v0.h;
				var coll = _v0.coll;
				var t = (h_i - bubble.pos.y) / (h_i - h_f);
				if (t <= 1e-4) {
					return A2(
						$author$project$Type_Physics$hitPolys,
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							girl),
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							bubble)) ? function (unis) {
						return _Utils_update(
							model,
							{
								ops: A2(
									$author$project$Operation$refreshName,
									_Utils_update(
										op,
										{t: 1}),
									model.ops),
								unis: unis
							});
					}(
						A2(
							$author$project$ModelTools$refreshUnis,
							_Utils_update(
								bubble,
								{
									pos: A2(
										$author$project$BasicTypes$combine,
										bubble.pos,
										A2($author$project$BasicTypes$Vector, bubble.v.x, -10))
								}),
							A2(
								$author$project$ModelTools$refreshUnis,
								A2(
									$author$project$Try$forceGirlOrder,
									$author$project$Types$Stay,
									_Utils_update(
										girl,
										{collisionStatus: $author$project$Types$NoCollision, gravityStatus: $author$project$Types$NoGravity, moveStatus: $author$project$Types$Still, pos: bubble.pos})),
								model.unis))) : model;
				} else {
					if (t > 1) {
						return function (unis) {
							return _Utils_update(
								model,
								{
									ops: A2(
										$elm$core$List$cons,
										$author$project$L3_Bathroom$Flow$cyclic$renderBubbleGen(),
										A2($author$project$Operation$removeName, op.name, model.ops)),
									unis: unis
								});
						}(
							A2(
								$author$project$ModelTools$removeUnis,
								bubble,
								A2(
									$author$project$ModelTools$refreshUnis,
									A2(
										$author$project$Try$forceGirlOrder,
										$author$project$Types$Stay,
										_Utils_update(
											girl,
											{
												collisionStatus: $author$project$Types$Collision,
												gravityStatus: $author$project$Types$Air,
												moveStatus: $author$project$Types$Moving,
												pos: A2($author$project$BasicTypes$Point, 950, 250)
											})),
									model.unis)));
					} else {
						if ((1e-4 < t) && (t <= 1)) {
							var trans = 1;
							var hit = A3(
								$elm$core$List$foldl,
								F2(
									function (obj, hit_) {
										return hit_ || A2(
											$author$project$Type_Physics$hitPolys,
											A2(
												$author$project$Type_Physics$moveObjPoly,
												function ($) {
													return $.coll;
												},
												bubble),
											A2(
												$author$project$Type_Physics$moveObjPoly,
												function ($) {
													return $.coll;
												},
												obj));
									}),
								false,
								A2($author$project$ModelTools$filterNameString, 'branch', model.unis));
							return (!hit) ? function (unis) {
								return _Utils_update(
									model,
									{unis: unis});
							}(
								A2(
									$author$project$ModelTools$refreshUnis,
									_Utils_update(
										bubble,
										{
											coll: A2(
												$author$project$BasicTypes$scalePoly,
												_Utils_Tuple2(trans, trans),
												coll),
											h: trans * h,
											pos: A2(
												$author$project$BasicTypes$combine,
												bubble.pos,
												A2($author$project$BasicTypes$Vector, bubble.v.x, (-10) * (0.3 + t))),
											w: trans * w
										}),
									A2(
										$author$project$ModelTools$refreshUnis,
										_Utils_update(
											girl,
											{
												pos: A2(
													$author$project$BasicTypes$combine,
													bubble.pos,
													A2($author$project$BasicTypes$Vector, bubble.v.x, ((-10) * (0.3 + t)) - 15))
											}),
										model.unis))) : function (unis) {
								return _Utils_update(
									model,
									{
										ops: A2(
											$elm$core$List$cons,
											$author$project$L3_Bathroom$Flow$cyclic$renderBubbleGen(),
											A2($author$project$Operation$removeName, op.name, model.ops)),
										unis: unis
									});
							}(
								A2(
									$author$project$ModelTools$removeUnis,
									bubble,
									A2(
										$author$project$ModelTools$refreshUnis,
										A2(
											$author$project$Try$forceGirlOrder,
											$author$project$Types$Stay,
											_Utils_update(
												girl,
												{
													collisionStatus: $author$project$Types$Collision,
													gravityStatus: $author$project$Types$Air,
													moveStatus: $author$project$Types$Moving,
													v: A2($author$project$BasicTypes$Vector, 0, bubble.v.y)
												})),
										model.unis)));
						} else {
							return model;
						}
					}
				}
			}));
}
try {
	var $author$project$L3_Bathroom$Flow$renderBubbleGen = $author$project$L3_Bathroom$Flow$cyclic$renderBubbleGen();
	$author$project$L3_Bathroom$Flow$cyclic$renderBubbleGen = function () {
		return $author$project$L3_Bathroom$Flow$renderBubbleGen;
	};
	var $author$project$L3_Bathroom$Flow$bubbleGen = $author$project$L3_Bathroom$Flow$cyclic$bubbleGen();
	$author$project$L3_Bathroom$Flow$cyclic$bubbleGen = function () {
		return $author$project$L3_Bathroom$Flow$bubbleGen;
	};
	var $author$project$L3_Bathroom$Flow$renderBubbleMove = $author$project$L3_Bathroom$Flow$cyclic$renderBubbleMove();
	$author$project$L3_Bathroom$Flow$cyclic$renderBubbleMove = function () {
		return $author$project$L3_Bathroom$Flow$renderBubbleMove;
	};
	var $author$project$L3_Bathroom$Flow$bubbleMove = $author$project$L3_Bathroom$Flow$cyclic$bubbleMove();
	$author$project$L3_Bathroom$Flow$cyclic$bubbleMove = function () {
		return $author$project$L3_Bathroom$Flow$bubbleMove;
	};
} catch ($) {
	throw 'Some top-level definitions from `L3_Bathroom.Flow` are causing infinite recursion:\n\n  ┌─────┐\n  │    renderBubbleGen\n  │     ↓\n  │    bubbleGen\n  │     ↓\n  │    renderBubbleMove\n  │     ↓\n  │    bubbleMove\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$L3_Bathroom$Flow$moveLift = $author$project$Model$Func(
	F2(
		function (op, model) {
			var lift = A2($author$project$ModelTools$findNameString, 'lift', model.unis);
			var passive = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_passive;
				},
				lift);
			var keyE = A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns);
			var dt = 0.01;
			var cat = $author$project$ModelTools$getCat(model.unis);
			var t = (_Utils_eq(op.t, -1) || (_Utils_cmp(
				$elm$core$Basics$abs(op.t),
				dt / 100) < 1)) ? ((keyE && A2(
				$author$project$Type_Physics$hitPolys,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_active;
					},
					cat),
				passive)) ? (op.t + dt) : op.t) : ((op.t >= 1) ? (-1) : (op.t + dt));
			var pos = A2(
				$author$project$BasicTypes$combine,
				A2(
					$author$project$BasicTypes$scale,
					$elm$core$Basics$abs(t),
					A2($author$project$BasicTypes$Point, 2440, 1450)),
				A2(
					$author$project$BasicTypes$scale,
					1 - $elm$core$Basics$abs(t),
					A2($author$project$BasicTypes$Point, 2440, 1910)));
			var active = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_active;
				},
				lift);
			var posCat = (op.t < 0) ? cat.pos : ((A2($author$project$Type_Physics$pointInPoly, cat.pos, active) && (!(_Utils_eq(op.t, -1) || (_Utils_cmp(
				$elm$core$Basics$abs(op.t),
				dt / 100) < 1)))) ? A2(
				$author$project$BasicTypes$combine,
				cat.pos,
				A2(
					$author$project$BasicTypes$Vector,
					0,
					A3($elm$core$Basics$clamp, -100, (1.4 * dt) * (-460), cat.v.y))) : cat.pos);
			var newCat = _Utils_update(
				cat,
				{pos: posCat});
			return _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t}),
						model.ops),
					unis: A2(
						$author$project$ModelTools$refreshUnis,
						newCat,
						A2(
							$author$project$ModelTools$refreshUnis,
							_Utils_update(
								lift,
								{pos: pos}),
							model.unis))
				});
		}));
var $author$project$L3_Bathroom$Flow$renderMoveLift = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('moveLift'),
		func: $author$project$L3_Bathroom$Flow$moveLift,
		name: A2($author$project$Types$Name, 'moveLift', 0),
		t: 0
	});
var $author$project$Operation$searchName = F2(
	function (name, ops) {
		return A2(
			$elm$core$List$any,
			function (o) {
				return _Utils_eq(o.name, name);
			},
			ops);
	});
var $author$project$ModelTools$seizeSerialList = F3(
	function (serial, _default, serials) {
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A2($author$project$ModelTools$pickSerialList, serial, serials));
	});
var $author$project$ModelTools$seizeUnis = F2(
	function (_v0, unis) {
		var index = _v0.index;
		var name = _v0.name;
		return A3(
			$author$project$ModelTools$seizeSerialList,
			_Utils_update(
				$author$project$Types$dummyUni,
				{index: index, name: name}),
			$author$project$Types$dummyUni,
			unis);
	});
var $author$project$L3_Bathroom$Flow$shellControl = $author$project$Model$Func(
	F2(
		function (op, model) {
			var shell_R = A2(
				$author$project$ModelTools$seizeUnis,
				{index: 2, name: 'control'},
				model.unis);
			var shell_L = A2(
				$author$project$ModelTools$seizeUnis,
				{index: 1, name: 'control'},
				model.unis);
			var girl = $author$project$ModelTools$getGirl(model.unis);
			var dirSpeed = 3;
			var cat = $author$project$ModelTools$getCat(model.unis);
			var dir = A2(
				$author$project$Type_Physics$hitPolys,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_passive;
					},
					shell_L),
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_active;
					},
					cat)) ? A2($author$project$BasicTypes$Vector, -dirSpeed, 0) : (A2(
				$author$project$Type_Physics$hitPolys,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_passive;
					},
					shell_R),
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_active;
					},
					cat)) ? A2($author$project$BasicTypes$Vector, dirSpeed, 0) : A2($author$project$BasicTypes$Vector, 0, 0));
			var bubbleOp = A2(
				$author$project$Operation$getName,
				A2($author$project$Types$Name, 'bubbleMove', 0),
				model.ops);
			var doing = A2(
				$author$project$Operation$searchName,
				A2($author$project$Types$Name, 'bubbleMove', 0),
				model.ops) && (bubbleOp.t >= 1);
			var bubble = A2($author$project$ModelTools$findNameString, 'bubble', model.unis);
			var newBubble = _Utils_update(
				bubble,
				{
					pos: A2($author$project$BasicTypes$combine, dir, bubble.pos)
				});
			var hit = A3(
				$elm$core$List$foldl,
				F2(
					function (obj, hit_) {
						return hit_ || A2(
							$author$project$Type_Physics$hitPolys,
							A2(
								$author$project$Type_Physics$moveObjPoly,
								function ($) {
									return $.coll;
								},
								newBubble),
							A2(
								$author$project$Type_Physics$moveObjPoly,
								function ($) {
									return $.coll;
								},
								obj));
					}),
				false,
				A2($author$project$ModelTools$filterNameString, 'branch', model.unis));
			return doing ? ((!hit) ? _Utils_update(
				model,
				{
					unis: A2($author$project$ModelTools$refreshUnis, newBubble, model.unis)
				}) : function (unis) {
				return _Utils_update(
					model,
					{
						ops: A2(
							$elm$core$List$cons,
							$author$project$L3_Bathroom$Flow$renderBubbleGen,
							A2(
								$author$project$Operation$removeName,
								A2($author$project$Types$Name, 'bubbleMove', 0),
								model.ops)),
						unis: unis
					});
			}(
				A2(
					$author$project$ModelTools$removeUnis,
					bubble,
					A2(
						$author$project$ModelTools$refreshUnis,
						A2(
							$author$project$Try$forceGirlOrder,
							$author$project$Types$Stay,
							_Utils_update(
								girl,
								{
									collisionStatus: $author$project$Types$Collision,
									gravityStatus: $author$project$Types$Air,
									moveStatus: $author$project$Types$Moving,
									v: A2($author$project$BasicTypes$Vector, 0, bubble.v.y)
								})),
						model.unis)))) : model;
		}));
var $author$project$L3_Bathroom$Flow$renderShellControl = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('shellControl'),
		func: $author$project$L3_Bathroom$Flow$shellControl,
		name: A2($author$project$Types$Name, 'shellControl', 0),
		t: 0
	});
var $author$project$Objects$someOutWallPoly = F3(
	function (coordination, src, poly) {
		return A6(
			$author$project$Types$addVisual,
			0,
			_Utils_Tuple2(coordination.w, coordination.h),
			A2($author$project$BasicTypes$Vector, coordination.w / 2, coordination.h / 2),
			src,
			1,
			A4(
				$author$project$Types$addStatus,
				$author$project$Types$NoGravity,
				$author$project$Types$Still,
				$author$project$Types$Collision,
				A3(
					$author$project$Types$addInteractive,
					$author$project$BasicTypes$noPoly,
					$author$project$BasicTypes$noPoly,
					A4(
						$author$project$Types$addPhysics,
						$author$project$BasicTypes$zeroPoint,
						poly,
						0,
						A3($author$project$Types$someUni, 'outWall', -1, $author$project$Types$Static)))));
	});
var $author$project$L3_Bathroom$Init$reInit = function (model) {
	var someControl = F2(
		function (index, pos) {
			return A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				$elm$core$Basics$identity,
				$author$project$Types$removeStatus(
					A4(
						$author$project$Types$addPhysics,
						pos,
						A4($author$project$BasicTypes$easyPoly, -20, -10, 20, 30),
						-1,
						A3($author$project$Types$someUni, 'control', index, $author$project$Types$Static))));
		});
	var someBranch = F3(
		function (index, pos, poly) {
			return A3(
				$author$project$Types$addInteractive,
				$author$project$BasicTypes$noPoly,
				$author$project$BasicTypes$noPoly,
				$author$project$Types$removeStatus(
					A4(
						$author$project$Types$addPhysics,
						pos,
						poly,
						4,
						A3($author$project$Types$someUni, 'branch', index, $author$project$Types$Static))));
		});
	var lift = A6(
		$author$project$Types$addVisual,
		6,
		_Utils_Tuple2(317, 79),
		$author$project$BasicTypes$zeroVector,
		'./L3_scene/lift.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			A2(
				$elm$core$Basics$composeR,
				$author$project$BasicTypes$movePoly(
					A2($author$project$BasicTypes$Vector, 0, -50)),
				$author$project$BasicTypes$scalePoly(
					_Utils_Tuple2(1.2, 1))),
			$elm$core$Basics$always(
				A4($author$project$BasicTypes$easyPoly, 50, -100, 150, 0)),
			A4(
				$author$project$Types$addStatus,
				$author$project$Types$Air,
				$author$project$Types$Still,
				$author$project$Types$Collision,
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, 2440, 1910),
					A4($author$project$BasicTypes$easyPoly, -145, -13, 145, 20),
					2,
					A3($author$project$Types$someUni, 'lift', 0, $author$project$Types$Lift)))));
	var item = A6(
		$author$project$Types$addVisual,
		2,
		_Utils_Tuple2(574 / 2, 354 / 2),
		$author$project$BasicTypes$zeroPoint,
		'./L3_scene/item.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			function (_v0) {
				return A4($author$project$BasicTypes$easyPoly, -100, -100, 100, 100);
			},
			$author$project$Types$removeStatus(
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, 1500, 400),
					_List_Nil,
					-1,
					A3($author$project$Types$someUni, 'item', 0, $author$project$Types$Static)))));
	var gravity = $author$project$Operation$someGravity(
		A2($author$project$BasicTypes$Vector, 0, 2));
	var ops = _Utils_ap(
		_List_fromArray(
			[gravity, $author$project$L3_Bathroom$Flow$renderMoveLift, $author$project$L3_Bathroom$Flow$renderBubbleGen, $author$project$L3_Bathroom$Flow$renderShellControl]),
		$author$project$Flow$getHugOps);
	var girl = A4(
		$author$project$Objects$changeGirl_,
		A2($author$project$BasicTypes$Vector, 50, 100),
		A2($author$project$BasicTypes$Vector, 16, 0),
		A2($author$project$BasicTypes$Vector, 0, 6),
		A2(
			$author$project$Objects$someGirl,
			A2($author$project$BasicTypes$Point, 1300, 1760),
			0.24));
	var frame = A2($author$project$Types$Coordination, 1570 * 2, 1209 * 2);
	var walls = _List_fromArray(
		[
			A3(
			$author$project$Objects$someOutWallPoly,
			frame,
			'./L3_scene/scene.png',
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 2688.27, 206.18),
					A2($author$project$BasicTypes$Point, 1531.76, 206.18),
					A2($author$project$BasicTypes$Point, 1531.76, 112.08),
					A2($author$project$BasicTypes$Point, 569.74, 112.08),
					A2($author$project$BasicTypes$Point, 569.74, 495.02),
					A2($author$project$BasicTypes$Point, 242.84, 495.02),
					A2($author$project$BasicTypes$Point, 242.84, 2110.84),
					A2($author$project$BasicTypes$Point, 1811.96, 2110.84),
					A2($author$project$BasicTypes$Point, 1811.96, 2036.12),
					A2($author$project$BasicTypes$Point, 1905.36, 2036.12),
					A2($author$project$BasicTypes$Point, 1905.36, 1933.68),
					A2($author$project$BasicTypes$Point, 2587.52, 1933.68),
					A2($author$project$BasicTypes$Point, 2587.52, 1438.36),
					A2($author$project$BasicTypes$Point, 2688.27, 1438.36)
				])),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Vector, 0, -4),
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 1044.42, 495.02),
					A2($author$project$BasicTypes$Point, 2110.84, 495.02),
					A2($author$project$BasicTypes$Point, 2110.84, 1438.36),
					A2($author$project$BasicTypes$Point, 2297.64, 1438.36),
					A2($author$project$BasicTypes$Point, 2297.64, 1569.12),
					A2($author$project$BasicTypes$Point, 1044.42, 1569.12)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			A4($author$project$BasicTypes$easyPoly, 240, 1924, 1530, 1934)),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			A4($author$project$BasicTypes$easyPoly, 1530, 1569, 1540, 1924)),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			A4($author$project$BasicTypes$easyPoly, 230, 1700, 240, 1924)),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 2110.84, 560.4),
					A2($author$project$BasicTypes$Point, 2204.24, 560.4),
					A2($author$project$BasicTypes$Point, 2204.24, 653.8),
					A2($author$project$BasicTypes$Point, 2297.64, 653.8),
					A2($author$project$BasicTypes$Point, 2297.64, 747.2),
					A2($author$project$BasicTypes$Point, 2391.04, 747.2),
					A2($author$project$BasicTypes$Point, 2391.04, 840.6),
					A2($author$project$BasicTypes$Point, 2484.44, 840.6),
					A2($author$project$BasicTypes$Point, 2484.44, 945),
					A2($author$project$BasicTypes$Point, 2577.84, 945),
					A2($author$project$BasicTypes$Point, 2577.84, 980),
					A2($author$project$BasicTypes$Point, 2484.44, 980),
					A2($author$project$BasicTypes$Point, 2110.84, 610)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroVector,
			A4($author$project$BasicTypes$easyPoly, 2690, 1000, 2710, 1200)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Vector, 0, 35),
			A4($author$project$BasicTypes$easyPoly, 2381.7, 1120, 2688.27, 1150)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Vector, 0, 70),
			A4($author$project$BasicTypes$easyPoly, 2101.5, 1225, 2297.64, 1255)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 1140, 85),
			A4($author$project$BasicTypes$easyPoly, -10, -80, 10, 70)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 1530, 400),
			A4($author$project$BasicTypes$easyPoly, -10, -40, 10, 40))
		]);
	var controlPos = A2($author$project$BasicTypes$Point, 750, 2060);
	var controlImage = A6(
		$author$project$Types$addVisual,
		9,
		_Utils_Tuple2(460 * 1.1, 196 * 1.1),
		controlPos,
		'./L3_scene/control.png',
		0.9,
		$author$project$Types$removeStatus(
			A3($author$project$Types$someUni, 'controlImage', 0, $author$project$Types$Static)));
	var controlDiff = 150;
	var control_L = A2(
		someControl,
		1,
		A2(
			$author$project$BasicTypes$combine,
			A2($author$project$BasicTypes$Vector, -controlDiff, -10),
			controlPos));
	var control_R = A2(
		someControl,
		2,
		A2(
			$author$project$BasicTypes$combine,
			A2($author$project$BasicTypes$Vector, controlDiff, -10),
			controlPos));
	var cat = A4(
		$author$project$Objects$changeCat_,
		A2($author$project$BasicTypes$Vector, 16, 100),
		A2($author$project$BasicTypes$Vector, 8, 0),
		A2($author$project$BasicTypes$Vector, 0, -27),
		A2(
			$author$project$Objects$someCat,
			A2($author$project$BasicTypes$Point, 2050, 1890),
			0.35));
	var branches = _List_fromArray(
		[
			A3(
			someBranch,
			1,
			A2($author$project$BasicTypes$Point, 330, 1540),
			A4($author$project$BasicTypes$easyPoly, -70, -25, 70, 25)),
			A3(
			someBranch,
			2,
			A2($author$project$BasicTypes$Point, 860, 1270),
			A4($author$project$BasicTypes$easyPoly, -120, -40, 120, 40)),
			A3(
			someBranch,
			3,
			A2($author$project$BasicTypes$Point, 305, 1060),
			A4($author$project$BasicTypes$easyPoly, -60, -38, 60, 38)),
			A3(
			someBranch,
			4,
			A2($author$project$BasicTypes$Point, 924, 850),
			A4($author$project$BasicTypes$easyPoly, -120, -54, 120, 54)),
			function (br) {
			return _Utils_update(
				br,
				{collisionStatus: $author$project$Types$Collision, name: 'wall', solidity: 1});
		}(
			A3(
				someBranch,
				5,
				A2($author$project$BasicTypes$Point, 970, 540),
				A4($author$project$BasicTypes$easyPoly, -60, -54, 63, 54))),
			A3(
			someBranch,
			0,
			A2($author$project$BasicTypes$Point, 240, 1250),
			A4($author$project$BasicTypes$easyPoly, -20, -800, 20, 800)),
			A3(
			someBranch,
			0,
			A2($author$project$BasicTypes$Point, 400, 480),
			A4($author$project$BasicTypes$easyPoly, -170, -20, 170, 20)),
			A3(
			someBranch,
			0,
			A2($author$project$BasicTypes$Point, 1065, 1030),
			A4($author$project$BasicTypes$easyPoly, -20, -520, 20, 520))
		]);
	var box2 = A6(
		$author$project$Types$addVisual,
		9,
		_Utils_Tuple2(145 * 0.8, 139 * 0.8),
		$author$project$BasicTypes$zeroPoint,
		'./L3_scene/box2.png',
		1,
		A3(
			$author$project$Objects$someBox,
			2,
			A2($author$project$BasicTypes$Point, 2500, 1020.1),
			A2(
				$author$project$BasicTypes$scalePoly,
				_Utils_Tuple2(0.8, 0.8),
				A4($author$project$BasicTypes$easyPoly, -55, -48, 55, 48))));
	var unis = _Utils_ap(
		_List_fromArray(
			[cat, girl, box2, lift, item, control_L, control_R, controlImage]),
		_Utils_ap(walls, branches));
	var model_ = A3(
		$author$project$Model$reEffect,
		$author$project$State$defaultFadeInState,
		A2($author$project$Model$someMusic, './music/L3.mp3', 1),
		A5(
			$author$project$Model$reFrame,
			frame,
			frame,
			$author$project$BasicTypes$zeroPoint,
			1 / 2,
			A5($author$project$Model$reModel, unis, _List_Nil, _List_Nil, ops, model)));
	return model_;
};
var $author$project$Types$Item = {$: 'Item'};
var $author$project$L4_Storeroom$Flow$violinTouch = $author$project$Model$Func(
	F2(
		function (op, model) {
			var violin_ = A2($author$project$ModelTools$findNameString, 'violin', model.unis);
			var pressed = A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns);
			var passive = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_passive;
				},
				violin_);
			var dt = 0.1;
			var t_ = op.t + dt;
			var close = A2(
				$author$project$BasicTypes$distance,
				$author$project$ModelTools$getGirl(model.unis).pos,
				A2($author$project$ModelTools$findNameString, 'bow', model.unis).pos) < 400;
			var cat = $author$project$ModelTools$getCat(model.unis);
			var touched = A2(
				$author$project$Type_Physics$hitPolys,
				passive,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_active;
					},
					cat));
			return (touched && (pressed && close)) ? _Utils_update(
				model,
				{ani: $author$project$Messages$After, gameStatus: $author$project$Messages$Pass}) : model;
		}));
var $author$project$L4_Storeroom$Flow$renderViolin = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('violinTouch'),
		func: $author$project$L4_Storeroom$Flow$violinTouch,
		name: A2($author$project$Types$Name, 'violinTouch', 0),
		t: 0
	});
var $author$project$L4_Storeroom$Flow$violin = A6(
	$author$project$Types$addVisual,
	6,
	_Utils_Tuple2((577 / 5) * 4, (433 / 5) * 4),
	$author$project$BasicTypes$zeroPoint,
	'./L4_scene/violin.png',
	1,
	A3(
		$author$project$Types$addInteractive,
		$author$project$BasicTypes$noPoly,
		function (_v0) {
			return A4($author$project$BasicTypes$easyPoly, -120, -110, 120, 80);
		},
		$author$project$Types$removeStatus(
			A4(
				$author$project$Types$addPhysics,
				A2($author$project$BasicTypes$Point, 1770, 700),
				_List_Nil,
				-1,
				A3($author$project$Types$someUni, 'violin', 0, $author$project$Types$Item)))));
var $author$project$L4_Storeroom$Flow$bowTouch = $author$project$Model$Func(
	F2(
		function (op, model) {
			var pressed = A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns);
			var dt = 0.1;
			var t_ = op.t + dt;
			var cat = $author$project$ModelTools$getCat(model.unis);
			var bow = A2($author$project$ModelTools$findNameString, 'bow', model.unis);
			var passive = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_passive;
				},
				bow);
			var touched = A2(
				$author$project$Type_Physics$hitPolys,
				passive,
				A2(
					$author$project$Type_Physics$moveObjPoly,
					function ($) {
						return $.i_active;
					},
					cat));
			return ((op.t <= 0) && (touched && pressed)) ? _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t_}),
						model.ops),
					unis: A2(
						$author$project$ModelTools$refreshUnis,
						_Utils_update(
							bow,
							{
								gravityStatus: $author$project$Types$Air,
								moveStatus: $author$project$Types$Moving,
								src: './L4_scene/bow.png',
								v: A2($author$project$BasicTypes$Vector, 0, 17)
							}),
						model.unis)
				}) : (((0 < op.t) && (op.t < 1)) ? _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t_}),
						model.ops)
				}) : (((op.t >= 1) && (op.t < 7.2)) ? _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t_}),
						model.ops),
					unis: A2(
						$author$project$ModelTools$refreshUnis,
						_Utils_update(
							bow,
							{collisionStatus: $author$project$Types$Collision}),
						model.unis)
				}) : ((op.t >= 7.2) ? _Utils_update(
				model,
				{
					ops: A2(
						$elm$core$List$cons,
						$author$project$L4_Storeroom$Flow$renderViolin,
						A2($author$project$Operation$removeName, op.name, model.ops)),
					unis: A2(
						$elm$core$List$cons,
						$author$project$L4_Storeroom$Flow$violin,
						A2(
							$author$project$ModelTools$refreshUnis,
							_Utils_update(
								bow,
								{moveStatus: $author$project$Types$Still}),
							model.unis))
				}) : model)));
		}));
var $author$project$L4_Storeroom$Flow$renderBow = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('bow'),
		func: $author$project$L4_Storeroom$Flow$bowTouch,
		name: A2($author$project$Types$Name, 'bow', 0),
		t: 0
	});
var $author$project$Model$LiftLower = {$: 'LiftLower'};
var $author$project$Model$LiftUpper = {$: 'LiftUpper'};
var $author$project$Model$Lift_F = function (a) {
	return {$: 'Lift_F', a: a};
};
var $author$project$Model$To_LiftLower = {$: 'To_LiftLower'};
var $author$project$Model$To_LiftUpper = {$: 'To_LiftUpper'};
var $author$project$L4_Storeroom$Flow$crystals = $author$project$Model$Func(
	F2(
		function (op, model) {
			var waiting = A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, model.keyDowns);
			var liftC = A2(
				$author$project$Operation$getName,
				A2($author$project$Types$Name, 'liftControl', 0),
				model.ops);
			var crystalPoly2 = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_passive;
				},
				A2(
					$author$project$ModelTools$seizeUnis,
					{index: 2, name: 'crystal'},
					model.unis));
			var crystalPoly1 = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_passive;
				},
				A2(
					$author$project$ModelTools$seizeUnis,
					{index: 1, name: 'crystal'},
					model.unis));
			var catPoly = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_active;
				},
				$author$project$ModelTools$getCat(model.unis));
			var newLiftControl = (A2($author$project$Type_Physics$hitPolys, catPoly, crystalPoly1) && (waiting && (!_Utils_eq(
				liftC.filter,
				$author$project$Model$Lift_F($author$project$Model$LiftUpper))))) ? _Utils_update(
				liftC,
				{
					filter: $author$project$Model$Lift_F($author$project$Model$To_LiftUpper)
				}) : ((A2($author$project$Type_Physics$hitPolys, catPoly, crystalPoly2) && (waiting && (!_Utils_eq(
				liftC.filter,
				$author$project$Model$Lift_F($author$project$Model$LiftLower))))) ? _Utils_update(
				liftC,
				{
					filter: $author$project$Model$Lift_F($author$project$Model$To_LiftLower)
				}) : liftC);
			return _Utils_update(
				model,
				{
					ops: A2($author$project$Operation$refreshName, newLiftControl, model.ops)
				});
		}));
var $author$project$L4_Storeroom$Flow$renderCrystals = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('crystals'),
		func: $author$project$L4_Storeroom$Flow$crystals,
		name: A2($author$project$Types$Name, 'crystals', 0),
		t: 0
	});
var $author$project$Types$Walk = {$: 'Walk'};
var $author$project$L4_Storeroom$Flow$renderGirlLock = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('girlLock'),
		func: $author$project$Model$Func(
			F2(
				function (_v0, model) {
					return _Utils_update(
						model,
						{
							unis: A2(
								$author$project$ModelTools$refreshUnis,
								A2(
									$author$project$Try$forceGirlOrder,
									$author$project$Types$Stay,
									$author$project$ModelTools$getGirl(model.unis)),
								model.unis)
						});
				})),
		name: A2($author$project$Types$Name, 'girlLock', 0),
		t: 0
	});
var $author$project$L4_Storeroom$Flow$girlWander = function (start) {
	return $author$project$Model$Func(
		F2(
			function (op, model) {
				var t_ = A3($elm$core$Basics$clamp, 0, 1, op.t) + 0.021;
				var girl = $author$project$ModelTools$getGirl(model.unis);
				var newPos = girl.pos;
				return (t_ >= 1) ? _Utils_update(
					model,
					{
						ops: A2(
							$elm$core$List$cons,
							$author$project$L4_Storeroom$Flow$renderGirlLock,
							A2($author$project$Operation$removeName, op.name, model.ops)),
						unis: A2(
							$author$project$ModelTools$refreshUnis,
							A2(
								$author$project$Try$forceGirlOrder,
								$author$project$Types$Stay,
								_Utils_update(
									girl,
									{a: $author$project$BasicTypes$zeroVector, moveStatus: $author$project$Types$Still, v: $author$project$BasicTypes$zeroVector})),
							model.unis)
					}) : _Utils_update(
					model,
					{
						ops: A2(
							$author$project$Operation$refreshName,
							_Utils_update(
								op,
								{t: t_}),
							model.ops),
						unis: A2(
							$author$project$ModelTools$refreshUnis,
							A2(
								$author$project$Try$forceGirlOrder,
								$author$project$Types$Walk,
								_Utils_update(
									girl,
									{pos: newPos})),
							model.unis)
					});
			}));
};
var $author$project$L4_Storeroom$Flow$renderGirlWander = function (start) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('girlWander'),
			func: $author$project$L4_Storeroom$Flow$girlWander(start),
			name: A2($author$project$Types$Name, 'girlWander', 0),
			t: 0
		});
};
var $author$project$L4_Storeroom$Flow$girlLand = $author$project$Model$Func(
	F2(
		function (op, model) {
			var girl = $author$project$ModelTools$getGirl(model.unis);
			return (girl.pos.y > 1740) ? _Utils_update(
				model,
				{
					ops: A2(
						$elm$core$List$cons,
						$author$project$L4_Storeroom$Flow$renderGirlWander(girl.pos),
						A2($author$project$Operation$removeName, op.name, model.ops))
				}) : model;
		}));
var $author$project$L4_Storeroom$Flow$renderGirlLand = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('girlLand'),
		func: $author$project$L4_Storeroom$Flow$girlLand,
		name: A2($author$project$Types$Name, 'girlLand', 0),
		t: 0
	});
var $author$project$L4_Storeroom$Flow$liftControl = $author$project$Model$Func(
	F2(
		function (op, model) {
			var wait = 0.3;
			var lift2 = A2(
				$author$project$ModelTools$seizeUnis,
				{index: 2, name: 'lift'},
				model.unis);
			var lift1 = A2(
				$author$project$ModelTools$seizeUnis,
				{index: 1, name: 'lift'},
				model.unis);
			var dt = 0.01085;
			var t_ = ((op.t + dt) <= 1) ? (op.t + dt) : function (st) {
				return (A2(
					$elm$core$List$member,
					op.filter,
					_List_fromArray(
						[
							$author$project$Model$Lift_F($author$project$Model$To_LiftLower),
							$author$project$Model$Lift_F($author$project$Model$To_LiftUpper)
						])) && ($elm$core$Basics$abs(st) < 1e-4)) ? 0 : st;
			}(-1);
			var newOp = _Utils_update(
				op,
				{
					filter: (_Utils_eq(
						op.filter,
						$author$project$Model$Lift_F($author$project$Model$To_LiftLower)) && ($elm$core$Basics$abs(t_) < 1e-1)) ? $author$project$Model$Lift_F($author$project$Model$LiftLower) : ((_Utils_eq(
						op.filter,
						$author$project$Model$Lift_F($author$project$Model$To_LiftUpper)) && ($elm$core$Basics$abs(t_) < 1e-1)) ? $author$project$Model$Lift_F($author$project$Model$LiftUpper) : op.filter),
					t: t_
				});
			var t_h = A3(
				$elm$core$Basics$clamp,
				0,
				1,
				((1 + (2 * wait)) * $elm$core$Basics$abs(t_)) - wait);
			var newHeight = A2(
				$elm$core$List$member,
				op.filter,
				_List_fromArray(
					[
						$author$project$Model$Lift_F($author$project$Model$LiftLower),
						$author$project$Model$Lift_F($author$project$Model$To_LiftUpper)
					])) ? ((1510 * t_h) + (1196 * (1 - t_h))) : (A2(
				$elm$core$List$member,
				op.filter,
				_List_fromArray(
					[
						$author$project$Model$Lift_F($author$project$Model$LiftUpper),
						$author$project$Model$Lift_F($author$project$Model$To_LiftLower)
					])) ? ((874 * t_h) + (1196 * (1 - t_h))) : 0);
			var cat = $author$project$ModelTools$getCat(model.unis);
			var active2 = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_active;
				},
				lift2);
			var active1 = A2(
				$author$project$Type_Physics$moveObjPoly,
				function ($) {
					return $.i_active;
				},
				lift1);
			var posCat = ((A2($author$project$Type_Physics$pointInPoly, cat.pos, active1) || A2($author$project$Type_Physics$pointInPoly, cat.pos, active2)) && (!(_Utils_eq(op.t, -1) || (_Utils_cmp(
				$elm$core$Basics$abs(op.t),
				dt / 100) < 1)))) ? A2(
				$author$project$BasicTypes$combine,
				cat.pos,
				A2(
					$author$project$BasicTypes$Vector,
					0,
					A3($elm$core$Basics$clamp, -100, (3 * dt) * (-500), cat.v.y))) : cat.pos;
			var newCat = _Utils_update(
				cat,
				{pos: posCat});
			return function (unis) {
				return function (m) {
					return _Utils_update(
						m,
						{
							ops: A2($author$project$Operation$refreshName, newOp, m.ops)
						});
				}(
					_Utils_update(
						model,
						{unis: unis}));
			}(
				A2(
					$author$project$ModelTools$refreshUnis,
					newCat,
					A2(
						$author$project$ModelTools$refreshUnis,
						_Utils_update(
							lift2,
							{
								pos: A2($author$project$BasicTypes$Point, lift2.pos.x, newHeight)
							}),
						A2(
							$author$project$ModelTools$refreshUnis,
							_Utils_update(
								lift1,
								{
									pos: A2($author$project$BasicTypes$Point, lift1.pos.x, newHeight)
								}),
							model.unis))));
		}));
var $author$project$L4_Storeroom$Flow$renderLiftControl = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Lift_F($author$project$Model$LiftLower),
		func: $author$project$L4_Storeroom$Flow$liftControl,
		name: A2($author$project$Types$Name, 'liftControl', 0),
		t: 0
	});
var $author$project$L4_Storeroom$Init$reInit = function (model) {
	var tri_a = 80;
	var lowlandImage = A6(
		$author$project$Types$addVisual,
		6,
		_Utils_Tuple2(3598, (794 / 2517) * 3598),
		A2($author$project$BasicTypes$Vector, 3598 / 2, (((794 / 2517) * 3598) / 2) + 1100),
		'./L4_scene/lowland.png',
		1,
		$author$project$Types$removeStatus(
			A3($author$project$Types$someUni, 'lowlandImage', 0, $author$project$Types$Static)));
	var lift_a = 78;
	var someLift = F2(
		function (index, pos) {
			return A6(
				$author$project$Types$addVisual,
				2,
				_Utils_Tuple2(232, 232),
				$author$project$BasicTypes$zeroVector,
				'./L4_scene/lift.png',
				1,
				A3(
					$author$project$Types$addInteractive,
					function (_v1) {
						return A4($author$project$BasicTypes$easyPoly, -78, -115, 78, -50);
					},
					$author$project$BasicTypes$noPoly,
					A4(
						$author$project$Types$addStatus,
						$author$project$Types$NoGravity,
						$author$project$Types$Still,
						$author$project$Types$Collision,
						A4(
							$author$project$Types$addPhysics,
							pos,
							A4($author$project$BasicTypes$easyPoly, -lift_a, -lift_a, lift_a, lift_a),
							2,
							A3($author$project$Types$someUni, 'lift', index, $author$project$Types$Lift)))));
		});
	var lift2 = A2(
		someLift,
		2,
		A2($author$project$BasicTypes$Point, 2865, 1196));
	var lift1 = A2(
		someLift,
		1,
		A2($author$project$BasicTypes$Point, 740, 1196));
	var gravity = $author$project$Operation$someGravity(
		A2($author$project$BasicTypes$Vector, 0, 2));
	var ops = _Utils_ap(
		_List_fromArray(
			[gravity, $author$project$L4_Storeroom$Flow$renderLiftControl, $author$project$L4_Storeroom$Flow$renderCrystals, $author$project$L4_Storeroom$Flow$renderGirlLand, $author$project$L4_Storeroom$Flow$renderBow]),
		$author$project$Flow$getHugOps);
	var girl = A4(
		$author$project$Objects$changeGirl_,
		A2($author$project$BasicTypes$Vector, 20, 100),
		A2($author$project$BasicTypes$Vector, 4, 0),
		A2($author$project$BasicTypes$Vector, 0, 6),
		A2(
			$author$project$Objects$someGirl,
			A2($author$project$BasicTypes$Point, 150, 1390),
			0.35));
	var frame = A2($author$project$Types$Coordination, 3598, 2222);
	var walls = _List_fromArray(
		[
			A2($author$project$Objects$someOutWall, frame, './L4_scene/scene.png'),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 252, 950),
			A4($author$project$BasicTypes$easyPoly, -252, 0, 252, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 252, 1575),
			A4($author$project$BasicTypes$easyPoly, -252, 0, 252, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 0, 1475),
			A4($author$project$BasicTypes$easyPoly, -2, 0, 2, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 3348, 950),
			A4($author$project$BasicTypes$easyPoly, -252, 0, 252, 40)),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 3348, 1575),
			A4($author$project$BasicTypes$easyPoly, -252, 0, 252, 40)),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 822, 943),
					A2($author$project$BasicTypes$Point, 985, 943),
					A2($author$project$BasicTypes$Point, 985, 1113),
					A2($author$project$BasicTypes$Point, 1145, 1113),
					A2($author$project$BasicTypes$Point, 1145, 1267),
					A2($author$project$BasicTypes$Point, 1310, 1267),
					A2($author$project$BasicTypes$Point, 1310, 1430),
					A2($author$project$BasicTypes$Point, 2287, 1430),
					A2($author$project$BasicTypes$Point, 2287, 1267),
					A2($author$project$BasicTypes$Point, 2450, 1267),
					A2($author$project$BasicTypes$Point, 2450, 1113),
					A2($author$project$BasicTypes$Point, 2612, 1113),
					A2($author$project$BasicTypes$Point, 2612, 943),
					A2($author$project$BasicTypes$Point, 2785, 943),
					A2($author$project$BasicTypes$Point, 2785, 1576),
					A2($author$project$BasicTypes$Point, 822, 1576)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 1152, 800),
					A2($author$project$BasicTypes$Point, 2450, 800),
					A2($author$project$BasicTypes$Point, 2450, 950),
					A2($author$project$BasicTypes$Point, 2278, 950),
					A2($author$project$BasicTypes$Point, 2278, 1113),
					A2($author$project$BasicTypes$Point, 2124, 1113),
					A2($author$project$BasicTypes$Point, 2124, 950),
					A2($author$project$BasicTypes$Point, 1473, 950),
					A2($author$project$BasicTypes$Point, 1473, 1113),
					A2($author$project$BasicTypes$Point, 1310, 1113),
					A2($author$project$BasicTypes$Point, 1310, 950),
					A2($author$project$BasicTypes$Point, 1152, 950)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 1473, 650),
					A2($author$project$BasicTypes$Point, 1795, 188),
					A2($author$project$BasicTypes$Point, 2115, 650)
				])),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Vector, 3598 / 2, (((794 / 2517) * 3598) / 2) + 1400),
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, -1799, -270),
					A2($author$project$BasicTypes$Point, -1100, 100),
					A2($author$project$BasicTypes$Point, -400, 200),
					A2($author$project$BasicTypes$Point, -200, 300),
					A2($author$project$BasicTypes$Point, 170, 150),
					A2($author$project$BasicTypes$Point, 1200, -50),
					A2($author$project$BasicTypes$Point, 1799, -270),
					A2($author$project$BasicTypes$Point, 1799, 350),
					A2($author$project$BasicTypes$Point, -1799, 350)
				])),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 1070, 730),
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, -tri_a, -tri_a),
					A2($author$project$BasicTypes$Point, tri_a, -tri_a),
					A2($author$project$BasicTypes$Point, tri_a, tri_a)
				])),
			A2(
			$author$project$Objects$someWall,
			A2($author$project$BasicTypes$Point, 2530, 730),
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, -tri_a, -tri_a),
					A2($author$project$BasicTypes$Point, tri_a, -tri_a),
					A2($author$project$BasicTypes$Point, -tri_a, tri_a)
				]))
		]);
	var crystal2 = A6(
		$author$project$Types$addVisual,
		2,
		_Utils_Tuple2(180, 247),
		$author$project$BasicTypes$zeroVector,
		'./L4_scene/crystal2.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			$elm$core$Basics$always(
				A4($author$project$BasicTypes$easyPoly, -80, -100, 80, 100)),
			$author$project$Types$removeStatus(
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, 3350, 800),
					_List_Nil,
					2,
					A3($author$project$Types$someUni, 'crystal', 2, $author$project$Types$Static)))));
	var crystal1 = A6(
		$author$project$Types$addVisual,
		2,
		_Utils_Tuple2(216, 294),
		$author$project$BasicTypes$zeroVector,
		'./L4_scene/crystal1.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			$elm$core$Basics$always(
				A4($author$project$BasicTypes$easyPoly, -80, -100, 80, 100)),
			$author$project$Types$removeStatus(
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, 250, 800),
					_List_Nil,
					2,
					A3($author$project$Types$someUni, 'crystal', 1, $author$project$Types$Static)))));
	var cat = A4(
		$author$project$Objects$changeCat_,
		A2($author$project$BasicTypes$Vector, 9, 100),
		A2($author$project$BasicTypes$Vector, 4, 0),
		A2($author$project$BasicTypes$Vector, 0, -32),
		A2(
			$author$project$Objects$someCat,
			A2($author$project$BasicTypes$Point, 300, 1500),
			0.35));
	var bow = A6(
		$author$project$Types$addVisual,
		6,
		_Utils_Tuple2(276, 276),
		$author$project$BasicTypes$zeroVector,
		'./L4_scene/bow_candle.png',
		1,
		A3(
			$author$project$Types$addInteractive,
			$author$project$BasicTypes$noPoly,
			function (_v0) {
				return A4($author$project$BasicTypes$easyPoly, -100, -100, 100, 100);
			},
			$author$project$Types$removeStatus(
				A4(
					$author$project$Types$addPhysics,
					A2($author$project$BasicTypes$Point, 3300, 1440),
					A4($author$project$BasicTypes$easyPoly, -90, -90, 90, 60),
					-1,
					A3($author$project$Types$someUni, 'bow', 0, $author$project$Types$Item)))));
	var bow_ = A6(
		$author$project$Types$addVisual,
		6,
		_Utils_Tuple2((577 * 5) / 6, (433 * 5) / 6),
		A2($author$project$BasicTypes$Vector, 0, 0),
		'./L4_scene/bow.png',
		1,
		bow);
	var unis = _Utils_ap(
		_List_fromArray(
			[cat, girl, lift1, lift2, crystal1, crystal2, bow, lowlandImage]),
		walls);
	var model_ = A3(
		$author$project$Model$reEffect,
		$author$project$State$defaultFadeInState,
		A2($author$project$Model$someMusic, './music/L4.mp3', 1),
		A5(
			$author$project$Model$reFrame,
			frame,
			frame,
			$author$project$BasicTypes$zeroPoint,
			1 / 2,
			A5($author$project$Model$reModel, unis, _List_Nil, _List_Nil, ops, model)));
	return model_;
};
var $author$project$Objects$backgroundImage = F4(
	function (name, layer, coordination, src) {
		return A6(
			$author$project$Types$addVisual,
			layer,
			_Utils_Tuple2(coordination.w, coordination.h),
			A2($author$project$BasicTypes$Vector, coordination.w / 2, coordination.h / 2),
			src,
			1,
			A4(
				$author$project$Types$addStatus,
				$author$project$Types$NoGravity,
				$author$project$Types$Still,
				$author$project$Types$NoCollision,
				A3(
					$author$project$Types$addInteractive,
					$author$project$BasicTypes$noPoly,
					$author$project$BasicTypes$noPoly,
					A4(
						$author$project$Types$addPhysics,
						$author$project$BasicTypes$zeroPoint,
						_List_Nil,
						0,
						A3($author$project$Types$someUni, name, -1, $author$project$Types$Static)))));
	});
var $author$project$Objects$simpleLadder = F5(
	function (index, pos, to, passiveOffset, poly) {
		return $author$project$Types$removeStatus(
			A3(
				$author$project$Types$addInteractive,
				$elm$core$Basics$always(poly),
				$elm$core$Basics$always(
					A2(
						$author$project$BasicTypes$movePoly,
						passiveOffset,
						A4($author$project$BasicTypes$easyPoly, -40, -60, 40, 60))),
				A4(
					$author$project$Types$addPhysics,
					pos,
					_List_Nil,
					3,
					A3(
						$author$project$Types$someUni,
						'ladder',
						index,
						$author$project$Types$Ladder(
							{dt: 0.01, end: pos, from: $author$project$BasicTypes$dummyPoint, start: pos, status: $author$project$Messages$Before, to: to})))));
	});
var $author$project$Objects$someLineWall = F6(
	function (pos, x1, y1, x2, y2, width) {
		var pb = A2($author$project$BasicTypes$Point, x2, y2);
		var pa = A2($author$project$BasicTypes$Point, x1, y1);
		var dir = A2(
			$author$project$BasicTypes$scale,
			width / 2,
			$author$project$BasicTypes$normalize(
				function (vec) {
					return A2($author$project$BasicTypes$rotate, vec, 90);
				}(
					A2($author$project$BasicTypes$vector, pa, pb))));
		return function (wall) {
			return _Utils_update(
				wall,
				{index: 0});
		}(
			A2(
				$author$project$Objects$someWall,
				pos,
				_List_fromArray(
					[
						A2($author$project$BasicTypes$combine, pa, dir),
						A2($author$project$BasicTypes$combine, pb, dir),
						A2(
						$author$project$BasicTypes$combine,
						pb,
						A2($author$project$BasicTypes$scale, -1, dir)),
						A2(
						$author$project$BasicTypes$combine,
						pa,
						A2($author$project$BasicTypes$scale, -1, dir))
					])));
	});
var $author$project$BasicTypes$someLinePoly = F6(
	function (pos, x1, y1, x2, y2, width) {
		var pb = A2($author$project$BasicTypes$Point, x2, y2);
		var pa = A2($author$project$BasicTypes$Point, x1, y1);
		var dir = A2(
			$author$project$BasicTypes$scale,
			width / 2,
			$author$project$BasicTypes$normalize(
				function (vec) {
					return A2($author$project$BasicTypes$rotate, vec, 90);
				}(
					A2($author$project$BasicTypes$vector, pa, pb))));
		return _List_fromArray(
			[
				A2($author$project$BasicTypes$combine, pa, dir),
				A2($author$project$BasicTypes$combine, pb, dir),
				A2(
				$author$project$BasicTypes$combine,
				pb,
				A2($author$project$BasicTypes$scale, -1, dir)),
				A2(
				$author$project$BasicTypes$combine,
				pa,
				A2($author$project$BasicTypes$scale, -1, dir))
			]);
	});
var $author$project$BasicTypes$verticalLinePoly = F4(
	function (pos, y1, y2, width) {
		return A6($author$project$BasicTypes$someLinePoly, pos, 0, y1, 0, y2, width);
	});
var $author$project$L5_Balcony$Flow$mutable = _List_fromArray(
	[
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 4870),
		500,
		0,
		3000,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 700, 4670),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2900, 4670),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 4421.69),
		743.47,
		0,
		1107.37,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 4421.69),
		1193.46,
		0,
		2739,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 820, 4270),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2780, 4270),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 3991.26),
		860.86,
		0,
		2600,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 940, 3820),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2660, 3820),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 3560),
		1100,
		0,
		1338,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 3560),
		2015,
		0,
		2543,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1050, 3420),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2550, 3420),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 3130),
		860.86,
		0,
		2040,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1050, 2980),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2550, 2980),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 2699),
		1789,
		0,
		2247,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2330, 2500),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 2259),
		1213,
		0,
		2169,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1170, 2100),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2220, 2100),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 1819),
		1213,
		0,
		1447,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 1819),
		1565,
		0,
		2200,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1170, 1700),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2220, 1700),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 1400),
		1213,
		0,
		1565,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 1400),
		1663,
		0,
		2034,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1290, 1300),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2220, 1300),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 958),
		1369,
		0,
		1936,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1410, 900),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2100, 900),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 0, 527),
		1369,
		0,
		1815,
		0,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 1410, 480),
		0,
		-10,
		0,
		10,
		30),
		A6(
		$author$project$Objects$someLineWall,
		A2($author$project$BasicTypes$Point, 2100, 480),
		0,
		-10,
		0,
		10,
		30),
		A5(
		$author$project$Objects$simpleLadder,
		1,
		A2($author$project$BasicTypes$Point, 1359, 4636),
		A2($author$project$BasicTypes$Point, 1359, 4290),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		2,
		A2($author$project$BasicTypes$Point, 1008, 4206),
		A2($author$project$BasicTypes$Point, 1008, 3851),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		3,
		A2($author$project$BasicTypes$Point, 2060, 4206),
		A2($author$project$BasicTypes$Point, 2060, 3851),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		4,
		A2($author$project$BasicTypes$Point, 1242, 3776),
		A2($author$project$BasicTypes$Point, 1242, 3421),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		5,
		A2($author$project$BasicTypes$Point, 2410, 3776),
		A2($author$project$BasicTypes$Point, 2410, 3421),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		6,
		A2($author$project$BasicTypes$Point, 1125, 3345),
		A2($author$project$BasicTypes$Point, 1165, 2990),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		7,
		A2($author$project$BasicTypes$Point, 2171, 3130),
		A2($author$project$BasicTypes$Point, 2171, 2559),
		A2($author$project$BasicTypes$Point, 0, 270),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -420, 420, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		8,
		A2($author$project$BasicTypes$Point, 1470, 2696),
		A2($author$project$BasicTypes$Point, 1470, 2135),
		A2($author$project$BasicTypes$Point, 0, 270),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -420, 420, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		9,
		A2($author$project$BasicTypes$Point, 1935, 2480),
		A2($author$project$BasicTypes$Point, 1935, 2125),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		10,
		A2($author$project$BasicTypes$Point, 1250, 2040),
		A2($author$project$BasicTypes$Point, 1300, 1685),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		11,
		A2($author$project$BasicTypes$Point, 1590, 2040),
		A2($author$project$BasicTypes$Point, 1590, 1685),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		12,
		A2($author$project$BasicTypes$Point, 2055, 2040),
		A2($author$project$BasicTypes$Point, 2055, 1685),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		13,
		A2($author$project$BasicTypes$Point, 1355, 1609),
		A2($author$project$BasicTypes$Point, 1455, 1254),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		14,
		A2($author$project$BasicTypes$Point, 1815, 1609),
		A2($author$project$BasicTypes$Point, 1815, 1254),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		15,
		A2($author$project$BasicTypes$Point, 1475, 1178),
		A2($author$project$BasicTypes$Point, 1535, 823),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30)),
		A5(
		$author$project$Objects$simpleLadder,
		16,
		A2($author$project$BasicTypes$Point, 1590, 747),
		A2($author$project$BasicTypes$Point, 1590, 392),
		A2($author$project$BasicTypes$Point, 0, 75),
		A4($author$project$BasicTypes$verticalLinePoly, $author$project$BasicTypes$zeroPoint, -200, 200, 30))
	]);
var $author$project$L5_Balcony$Flow$switchMutable = $author$project$Model$Func(
	F2(
		function (_v0, model) {
			var threshold = 700;
			var girl = A2($author$project$ModelTools$findNameString, 'girlS', model.unis);
			return _Utils_update(
				model,
				{
					unis: _Utils_ap(
						A2(
							$elm$core$List$filter,
							function (uni) {
								return _Utils_cmp(
									$elm$core$Basics$abs(uni.pos.y - girl.pos.y),
									threshold) < 0;
							},
							$author$project$L5_Balcony$Flow$mutable),
						A2(
							$elm$core$List$filter,
							function (uni) {
								return ((uni.name !== 'wall') || (!(!uni.index))) && (uni.name !== 'ladder');
							},
							model.unis))
				});
		}));
var $author$project$L5_Balcony$Flow$dynamicMutable = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('dynamicMutable'),
		func: $author$project$L5_Balcony$Flow$switchMutable,
		name: A2($author$project$Types$Name, 'dynamicMutable', 0),
		t: 0
	});
var $author$project$Types$Climb = {$: 'Climb'};
var $author$project$Try$girl_Girl = function (girl) {
	var _v0 = girl.uni;
	if (_v0.$ === 'Girl') {
		var girl_ = _v0.a;
		return girl_;
	} else {
		return $author$project$Objects$someGirl_;
	}
};
var $author$project$Objects$dummyLadder_ = {dt: 1, end: $author$project$BasicTypes$zeroPoint, from: $author$project$BasicTypes$zeroPoint, start: $author$project$BasicTypes$zeroPoint, status: $author$project$Messages$Before, to: $author$project$BasicTypes$zeroPoint};
var $author$project$L5_Balcony$Flow$ladder_Ladder = function (ladder) {
	var _v0 = ladder.uni;
	if (_v0.$ === 'Ladder') {
		var lad = _v0.a;
		return lad;
	} else {
		return $author$project$Objects$dummyLadder_;
	}
};
var $author$project$L5_Balcony$Flow$tryClimb = F3(
	function (keys, ladders, girl) {
		var startMid = function (ladd) {
			var ladd_ = $author$project$L5_Balcony$Flow$ladder_Ladder(ladd);
			return A2(
				$author$project$BasicTypes$combine,
				A2($author$project$BasicTypes$Vector, 0, -290),
				A2(
					$author$project$BasicTypes$combine,
					ladd.pos,
					A2($author$project$BasicTypes$vector, ladd_.to, ladd.pos)));
		};
		var offset = 10;
		var maybeLadder = A3(
			$elm$core$List$foldl,
			F2(
				function (uni, myLadder) {
					if (myLadder.$ === 'Just') {
						var l = myLadder.a;
						return $elm$core$Maybe$Just(l);
					} else {
						return A2(
							$author$project$Type_Physics$pointInPoly,
							girl.pos,
							A2(
								$author$project$Type_Physics$moveObjPoly,
								function ($) {
									return $.i_passive;
								},
								uni)) ? $elm$core$Maybe$Just(uni) : $elm$core$Maybe$Nothing;
					}
				}),
			$elm$core$Maybe$Nothing,
			ladders);
		var dir = F2(
			function (ladd, g) {
				return A2(
					$author$project$BasicTypes$scale,
					offset,
					$author$project$BasicTypes$normalize(
						A2(
							$author$project$BasicTypes$Vector,
							A2($author$project$BasicTypes$vector, ladd.pos, g.pos).x,
							0)));
			});
		var climbGirl = function (ladd) {
			return function (g) {
				return _Utils_update(
					g,
					{
						pos: A2(
							$author$project$BasicTypes$combine,
							startMid(ladd),
							A2(dir, ladd, girl))
					});
			}(
				$author$project$Types$removeStatus(
					A2($author$project$Try$forceGirlOrder, $author$project$Types$Climb, girl)));
		};
		if (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, keys)) {
			if (maybeLadder.$ === 'Just') {
				var l = maybeLadder.a;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(
						climbGirl(l)),
					l.index);
			} else {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, 0);
			}
		} else {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, 0);
		}
	});
var $author$project$L5_Balcony$Flow$tryStay = F2(
	function (stones, girl) {
		var isHit = F2(
			function (uni, myGirl) {
				return A2(
					$author$project$Type_Physics$hitPolys,
					A2($author$project$BasicTypes$movePoly, uni.pos, uni.coll),
					A2($author$project$BasicTypes$movePoly, myGirl.pos, myGirl.i_active));
			});
		var hit = A3(
			$elm$core$List$foldl,
			F2(
				function (uni, hit_) {
					return hit_ || A2(isHit, uni, girl);
				}),
			false,
			stones);
		var girl_ = $author$project$Try$girl_Girl(girl);
		return (_Utils_eq(girl_.status, $author$project$Types$Walk) && hit) ? $elm$core$Maybe$Just(
			A2(
				$author$project$Try$forceGirlOrder,
				$author$project$Types$Stay,
				_Utils_update(
					girl,
					{
						a: $author$project$BasicTypes$zeroVector,
						pos: A2(
							$author$project$BasicTypes$combine,
							A2($author$project$BasicTypes$scale, -2, girl.v),
							girl.pos),
						v: $author$project$BasicTypes$zeroVector
					}))) : $elm$core$Maybe$Nothing;
	});
var $author$project$L5_Balcony$Flow$tryWalk = F3(
	function (keys, stones, girl) {
		var status = $author$project$Try$girl_Girl(girl).status;
		var a_max = $author$project$Try$girl_Girl(girl).a_max;
		return (_Utils_eq(status, $author$project$Types$Stay) && _Utils_eq(
			A2($author$project$L5_Balcony$Flow$tryStay, stones, girl),
			$elm$core$Maybe$Nothing)) ? (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, keys) ? $elm$core$Maybe$Just(
			A2(
				$author$project$Try$forceGirlOrder,
				$author$project$Types$Walk,
				_Utils_update(
					girl,
					{
						v: A2(
							$author$project$BasicTypes$combine,
							girl.v,
							A2($author$project$BasicTypes$scale, -1, a_max))
					}))) : (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, keys) ? $elm$core$Maybe$Just(
			A2(
				$author$project$Try$forceGirlOrder,
				$author$project$Types$Walk,
				_Utils_update(
					girl,
					{
						v: A2($author$project$BasicTypes$combine, girl.v, a_max)
					}))) : $elm$core$Maybe$Nothing)) : $elm$core$Maybe$Nothing;
	});
var $author$project$L5_Balcony$Flow$renderSimpleClimb = F2(
	function (index, from) {
		return _Utils_update(
			$author$project$Operation$dummyOperation,
			{
				filter: $author$project$Model$Any('simpleClimb'),
				func: A2($author$project$L5_Balcony$Flow$simpleClimb, index, from),
				name: A2($author$project$Types$Name, 'simpleClimb', 0),
				t: 0
			});
	});
var $author$project$L5_Balcony$Flow$simpleClimb = F2(
	function (index, from) {
		return $author$project$Model$Func(
			F2(
				function (op, model) {
					var ladder = A2(
						$author$project$ModelTools$seizeUnis,
						{index: index, name: 'ladder'},
						model.unis);
					var ladder_ = $author$project$L5_Balcony$Flow$ladder_Ladder(ladder);
					var to = A2(
						$author$project$BasicTypes$combine,
						ladder_.to,
						A2($author$project$BasicTypes$Vector, 0, 0));
					var girl = A2($author$project$ModelTools$findNameString, 'girlS', model.unis);
					var dx = 7;
					var dt = dx / A2($author$project$BasicTypes$distance, from, to);
					var t_ = op.t + dt;
					var newPos = A2(
						$author$project$BasicTypes$combine,
						from,
						A2(
							$author$project$BasicTypes$scale,
							t_,
							A2($author$project$BasicTypes$vector, from, to)));
					var dir = $author$project$BasicTypes$zeroVector;
					var v = A2($author$project$BasicTypes$scale, -1, dir);
					return (t_ < 1) ? _Utils_update(
						model,
						{
							ops: A2(
								$author$project$Operation$refreshName,
								_Utils_update(
									op,
									{t: t_}),
								model.ops),
							unis: A2(
								$author$project$ModelTools$refreshUnis,
								_Utils_update(
									ladder,
									{
										uni: $author$project$Types$Ladder(
											_Utils_update(
												ladder_,
												{from: from}))
									}),
								A2(
									$author$project$ModelTools$refreshUnis,
									$author$project$Types$removeStatus(
										_Utils_update(
											girl,
											{pos: newPos, v: v})),
									model.unis))
						}) : _Utils_update(
						model,
						{
							ops: A2(
								$elm$core$List$cons,
								$author$project$L5_Balcony$Flow$cyclic$renderGirlAround(),
								A2($author$project$Operation$removeName, op.name, model.ops)),
							unis: A2(
								$author$project$ModelTools$refreshUnis,
								A2(
									$author$project$Try$forceGirlOrder,
									$author$project$Types$Stay,
									_Utils_update(
										girl,
										{a: $author$project$BasicTypes$zeroVector, collisionStatus: $author$project$Types$Collision, gravityStatus: $author$project$Types$Air, moveStatus: $author$project$Types$Moving, v: $author$project$BasicTypes$zeroVector})),
								model.unis)
						});
				}));
	});
function $author$project$L5_Balcony$Flow$cyclic$renderGirlAround() {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Any('girlAround'),
			func: $author$project$L5_Balcony$Flow$cyclic$girlAround(),
			name: A2($author$project$Types$Name, 'girlAround', 0),
			t: 0
		});
}
function $author$project$L5_Balcony$Flow$cyclic$girlAround() {
	return $author$project$Model$Func(
		F2(
			function (op, model) {
				var stones = A2($author$project$ModelTools$filterNameString, 'wall', model.unis);
				var ladders = A2($author$project$ModelTools$filterNameString, 'ladder', model.unis);
				var keys = model.keyDowns;
				var girl = A2($author$project$ModelTools$findNameString, 'girlS', model.unis);
				var girl_ = $author$project$Try$girl_Girl(girl);
				var _v0 = A3($author$project$L5_Balcony$Flow$tryClimb, keys, ladders, girl);
				var climbGirl = _v0.a;
				var index = _v0.b;
				var maybeGirl = function () {
					var _v2 = girl_.status;
					switch (_v2.$) {
						case 'Walk':
							if (climbGirl.$ === 'Just') {
								var g = climbGirl.a;
								return $elm$core$Maybe$Just(g);
							} else {
								return A2($author$project$L5_Balcony$Flow$tryStay, stones, girl);
							}
						case 'Stay':
							if (climbGirl.$ === 'Just') {
								var g = climbGirl.a;
								return $elm$core$Maybe$Just(g);
							} else {
								return A3($author$project$L5_Balcony$Flow$tryWalk, keys, stones, girl);
							}
						default:
							return $elm$core$Maybe$Nothing;
					}
				}();
				var newGirl = function () {
					if (maybeGirl.$ === 'Just') {
						var g = maybeGirl.a;
						return g;
					} else {
						return girl;
					}
				}();
				var isRemove = _Utils_eq(
					$author$project$Try$girl_Girl(newGirl).status,
					$author$project$Types$Climb);
				return _Utils_update(
					model,
					{
						ops: (isRemove ? A2(
							$elm$core$Basics$composeL,
							$elm$core$List$cons(
								A2($author$project$L5_Balcony$Flow$renderSimpleClimb, index, newGirl.pos)),
							$author$project$Operation$removeName(op.name)) : $elm$core$Basics$identity)(model.ops),
						unis: A2($author$project$ModelTools$refreshUnis, newGirl, model.unis)
					});
			}));
}
try {
	var $author$project$L5_Balcony$Flow$renderGirlAround = $author$project$L5_Balcony$Flow$cyclic$renderGirlAround();
	$author$project$L5_Balcony$Flow$cyclic$renderGirlAround = function () {
		return $author$project$L5_Balcony$Flow$renderGirlAround;
	};
	var $author$project$L5_Balcony$Flow$girlAround = $author$project$L5_Balcony$Flow$cyclic$girlAround();
	$author$project$L5_Balcony$Flow$cyclic$girlAround = function () {
		return $author$project$L5_Balcony$Flow$girlAround;
	};
} catch ($) {
	throw 'Some top-level definitions from `L5_Balcony.Flow` are causing infinite recursion:\n\n  ┌─────┐\n  │    renderGirlAround\n  │     ↓\n  │    girlAround\n  │     ↓\n  │    renderSimpleClimb\n  │     ↓\n  │    simpleClimb\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$L5_Balcony$Flow$renderItemTouched = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('item'),
		func: $author$project$Model$Func(
			F2(
				function (op, m) {
					var item = A2($author$project$ModelTools$findNameString, 'item', m.unis);
					var isItem = A2(
						$elm$core$List$any,
						function (uni) {
							return uni.name === 'item';
						},
						m.unis);
					var girl = A2($author$project$ModelTools$findNameString, 'girlS', m.unis);
					return (A2(
						$author$project$Type_Physics$pointInPoly,
						girl.pos,
						A2(
							$author$project$Type_Physics$moveObjPoly,
							function ($) {
								return $.i_passive;
							},
							item)) && isItem) ? _Utils_update(
						m,
						{ani: $author$project$Messages$After, gameStatus: $author$project$Messages$Pass, music: $author$project$Model$noMusic}) : m;
				})),
		name: A2($author$project$Types$Name, 'itemTouched', -1),
		t: 0
	});
var $author$project$L5_Balcony$Flow$monsterSlime = $author$project$Model$Func(
	F2(
		function (op, model) {
			var t_all = 20;
			var slime = A2($author$project$ModelTools$findNameString, 'slime', model.unis);
			var girl = A2($author$project$ModelTools$findNameString, 'girlS', model.unis);
			var dt = 0.007;
			var t_ = op.t + dt;
			var t_h = A3($elm$core$Basics$clamp, 0, 1, (t_ - 2.9) / t_all);
			var step = (t_h > 1e-5) ? 0.28 : 0;
			var _v0 = model.frame;
			var w = _v0.w;
			var h = _v0.h;
			var end = A2($author$project$BasicTypes$Point, w / 2, -200);
			var start = A2($author$project$BasicTypes$Point, w / 2, h - 200);
			var pos = A2(
				$author$project$BasicTypes$combine,
				A2($author$project$BasicTypes$scale, 1 - t_h, start),
				A2($author$project$BasicTypes$scale, t_h, end));
			var newSlime = function (sl) {
				return _Utils_update(
					sl,
					{
						src: './monster/' + ($elm$core$String$fromInt(
							$elm$core$Basics$floor(sl.step)) + '.png')
					});
			}(
				_Utils_update(
					slime,
					{
						pos: pos,
						step: ((slime.step + step) >= 21) ? 1 : (slime.step + step)
					}));
			return ((_Utils_cmp(t_, t_all) > 0) || (_Utils_cmp(girl.pos.y + 110, slime.pos.y) > 0)) ? _Utils_update(
				model,
				{gameStatus: $author$project$Messages$ChangeLevel}) : _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t_}),
						model.ops),
					unis: A2($author$project$ModelTools$refreshUnis, newSlime, model.unis)
				});
		}));
var $author$project$L5_Balcony$Flow$renderMonsterSlime = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('monsterSlime'),
		func: $author$project$L5_Balcony$Flow$monsterSlime,
		name: A2($author$project$Types$Name, 'monsterSlime', 0),
		t: 0
	});
var $author$project$L5_Balcony$Flow$viewMove = $author$project$Model$Func(
	F2(
		function (op, model) {
			var start = A2($author$project$BasicTypes$Point, 600, 0);
			var newCat = function (c) {
				return _Utils_update(
					c,
					{h: 305 / 2, layer: 11, name: 'item', src: './L5_scene/cat.png', w: 250 / 2});
			}(
				A2($author$project$ModelTools$findNameString, 'catS', model.unis));
			var light = A6(
				$author$project$Types$addVisual,
				10,
				_Utils_Tuple2(3951, 5076),
				A2($author$project$BasicTypes$Point, 3951 / 2, 5076 / 2),
				'./L5_scene/light.png',
				0.8,
				$author$project$Types$removeStatus(
					A3($author$project$Types$someUni, 'light', 0, $author$project$Types$Static)));
			var girl = A2($author$project$ModelTools$findNameString, 'girlS', model.unis);
			var dt = 0.005;
			var t_ = op.t + dt;
			var t_h = (t_ < 0.2) ? 0 : function (t__) {
				return (1 + $elm$core$Basics$sin((t__ - 0.5) * $elm$core$Basics$pi)) / 2;
			}(
				(1 + $elm$core$Basics$sin((((t_ - 0.2) / 0.8) - 0.5) * $elm$core$Basics$pi)) / 2);
			var m1 = A2($author$project$BasicTypes$scale, 1 - t_h, start);
			var _v0 = model.viewBox;
			var w = _v0.w;
			var h = _v0.h;
			var m2 = A2(
				$author$project$BasicTypes$scale,
				t_h,
				A2(
					$author$project$BasicTypes$combine,
					A2($author$project$BasicTypes$Vector, (-w) / 2, ((-h) / 2) - (h * 0.21)),
					girl.pos));
			var viewPos = (t_ < 0.2) ? start : A2($author$project$BasicTypes$combine, m1, m2);
			return (t_ > 1) ? _Utils_update(
				model,
				{
					ops: A2($author$project$Operation$removeName, op.name, model.ops),
					unis: A2(
						$elm$core$List$cons,
						light,
						A2(
							$author$project$ModelTools$refreshUnis,
							newCat,
							A2($author$project$ModelTools$filterOutNameString, 'item', model.unis)))
				}) : _Utils_update(
				model,
				{
					ops: A2(
						$author$project$Operation$refreshName,
						_Utils_update(
							op,
							{t: t_}),
						model.ops),
					viewPos: viewPos
				});
		}));
var $author$project$L5_Balcony$Flow$renderViewMove = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('viewMove'),
		func: $author$project$L5_Balcony$Flow$viewMove,
		name: A2($author$project$Types$Name, 'viewMove', 0),
		t: 0
	});
var $author$project$L5_Balcony$Init$reInit = function (model) {
	var gravity = $author$project$Operation$someGravity(
		A2($author$project$BasicTypes$Vector, 0, 2));
	var ops = _List_fromArray(
		[gravity, $author$project$L5_Balcony$Flow$dynamicMutable, $author$project$L5_Balcony$Flow$renderGirlAround, $author$project$L5_Balcony$Flow$renderViewMove, $author$project$L5_Balcony$Flow$renderMonsterSlime, $author$project$L5_Balcony$Flow$renderItemTouched]);
	var girl = function (g) {
		return _Utils_update(
			g,
			{
				i_active: A4($author$project$BasicTypes$easyPoly, -80, -110, 80, 60),
				name: 'girlS',
				uni: $author$project$Types$Girl(
					{
						a_max: A2($author$project$BasicTypes$Vector, 9, 0),
						status: $author$project$Types$Stay,
						v_climb: A2($author$project$BasicTypes$Vector, 0, 6),
						v_max: A2($author$project$BasicTypes$Vector, 20, 100)
					})
			});
	}(
		A2(
			$author$project$Objects$someGirl,
			A2($author$project$BasicTypes$Point, 1800, 4640),
			0.2));
	var frame = A2($author$project$Types$Coordination, 3951, 5076);
	var slime = function (sl) {
		return _Utils_update(
			sl,
			{
				pos: A2($author$project$BasicTypes$Point, frame.w / 2, frame.h - 200),
				step: 15
			});
	}(
		A6(
			$author$project$Types$addVisual,
			2,
			_Utils_Tuple2(3951, 2177),
			$author$project$BasicTypes$zeroVector,
			'./monster/15.png',
			1,
			$author$project$Types$removeStatus(
				A3($author$project$Types$someUni, 'slime', 0, $author$project$Types$Static))));
	var walls = _List_fromArray(
		[
			A4($author$project$Objects$backgroundImage, 'sceneImage', 9, frame, './L5_scene/scene.png'),
			A4($author$project$Objects$backgroundImage, 'ladderImage', 1, frame, './L5_scene/ladders.png'),
			A4($author$project$Objects$backgroundImage, 'towerImage', 0, frame, './L5_scene/tower.png'),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 1330.42, 78.26),
					A2($author$project$BasicTypes$Point, 1447.81, 78.26),
					A2($author$project$BasicTypes$Point, 1447.81, 978.25),
					A2($author$project$BasicTypes$Point, 1330.42, 978.25),
					A2($author$project$BasicTypes$Point, 1330.42, 1389.11),
					A2($author$project$BasicTypes$Point, 1213.03, 1389.11),
					A2($author$project$BasicTypes$Point, 1213.03, 1843),
					A2($author$project$BasicTypes$Point, 1056.51, 1843)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 939.12, 2073.89),
					A2($author$project$BasicTypes$Point, 1193.46, 2073.89),
					A2($author$project$BasicTypes$Point, 1193.46, 2269.54),
					A2($author$project$BasicTypes$Point, 1095.64, 2269.54),
					A2($author$project$BasicTypes$Point, 1095.64, 3560.83),
					A2($author$project$BasicTypes$Point, 978.25, 3560.83),
					A2($author$project$BasicTypes$Point, 978.25, 3971.69),
					A2($author$project$BasicTypes$Point, 860.86, 3971.69),
					A2($author$project$BasicTypes$Point, 860.86, 4402.12),
					A2($author$project$BasicTypes$Point, 743.47, 4402.12),
					A2($author$project$BasicTypes$Point, 743.47, 4891.25),
					A2($author$project$BasicTypes$Point, 606.51, 4891.25),
					A2($author$project$BasicTypes$Point, 606.51, 4402.12)
				])),
			A2(
			$author$project$Objects$someWall,
			$author$project$BasicTypes$zeroPoint,
			_List_fromArray(
				[
					A2($author$project$BasicTypes$Point, 2034.76, 97.825),
					A2($author$project$BasicTypes$Point, 2973.88, 4852.12),
					A2($author$project$BasicTypes$Point, 2856.49, 4852.12),
					A2($author$project$BasicTypes$Point, 2856.49, 4421.56),
					A2($author$project$BasicTypes$Point, 2739.1, 4421.56),
					A2($author$project$BasicTypes$Point, 2739.1, 3982.13),
					A2($author$project$BasicTypes$Point, 2621.71, 3982.13),
					A2($author$project$BasicTypes$Point, 2621.71, 3541.26),
					A2($author$project$BasicTypes$Point, 2504.32, 3541.26),
					A2($author$project$BasicTypes$Point, 2504.32, 2699.97),
					A2($author$project$BasicTypes$Point, 2269.54, 2699.97),
					A2($author$project$BasicTypes$Point, 2269.54, 2249.97),
					A2($author$project$BasicTypes$Point, 2171.71, 2249.97),
					A2($author$project$BasicTypes$Point, 2171.71, 958.68),
					A2($author$project$BasicTypes$Point, 2034.76, 958.68)
				]))
		]);
	var cat = function (c) {
		return _Utils_update(
			c,
			{
				i_passive: A4($author$project$BasicTypes$easyPoly, -80, -160, 30, 160),
				name: 'catS',
				uni: $author$project$Types$Cat(
					{
						a_max: A2($author$project$BasicTypes$Vector, 20, 0),
						status: $author$project$Types$Stand,
						v_jump: A2($author$project$BasicTypes$Vector, 0, -35),
						v_max: A2($author$project$BasicTypes$Vector, 15, 100)
					})
			});
	}(
		$author$project$Types$removeStatus(
			A2(
				$author$project$Objects$someCat,
				A2($author$project$BasicTypes$Point, 1700, 470),
				0.35)));
	var unis = _Utils_ap(
		_List_fromArray(
			[cat, girl, slime]),
		walls);
	var model_ = A3(
		$author$project$Model$reEffect,
		$author$project$State$defaultFadeInState,
		A2($author$project$Model$someMusic, './music/L5.mp3', 1),
		A5(
			$author$project$Model$reFrame,
			frame,
			A2($author$project$Types$Coordination, 2000, 1125),
			A2($author$project$BasicTypes$Point, 600, 0),
			1 / 3,
			A5($author$project$Model$reModel, unis, _List_Nil, _List_Nil, ops, model)));
	return model_;
};
var $author$project$State$defaultFadeInOutState = _List_fromArray(
	[
		{
		dt: 0.005,
		index: 0,
		job: $author$project$Types$FadeBoth,
		loop: true,
		name: 'fadeInAndOut',
		state_function: $author$project$Types$SingularFunc($author$project$State$fadeInAndOut),
		t: 0,
		value: 0
	}
	]);
var $author$project$L6_End$Init$reInit = function (model) {
	return _Utils_update(
		model,
		{
			ani: $author$project$Messages$Doing,
			fadeStates: $author$project$State$defaultFadeInOutState,
			gameLevel: 6,
			gameStatus: $author$project$Messages$Prepare,
			music: A2($author$project$Model$someMusic, './music/L6.mp3', 1)
		});
};
var $author$project$Types$Fadeout = {$: 'Fadeout'};
var $author$project$State$genFadeOut = F2(
	function (_break, interval) {
		var fadeOut_ = function (state) {
			var t = state.t;
			var val = (_Utils_cmp(t, _break) < 0) ? 1 : (((_Utils_cmp(t, _break) > -1) && (_Utils_cmp(t, _break + interval) < 1)) ? (((_break + interval) - t) / interval) : 0);
			var newState = _Utils_update(
				state,
				{t: state.t + state.dt, value: val});
			return newState;
		};
		return fadeOut_;
	});
var $author$project$PreLoad$Init$reInit = function (model) {
	var states = _List_fromArray(
		[
			{
			dt: 0.005,
			index: 0,
			job: $author$project$Types$Fadeout,
			loop: false,
			name: 'fadeOut',
			state_function: $author$project$Types$SingularFunc(
				A2($author$project$State$genFadeOut, 0.9, 0.1)),
			t: 0,
			value: 0
		}
		]);
	return _Utils_update(
		model,
		{
			ani: $author$project$Messages$Doing,
			canvas: {h: 750, w: 1000},
			fadeStates: states,
			finished: 0,
			gameLevel: 11,
			gameStatus: $author$project$Messages$Prepare,
			god: false
		});
};
var $author$project$Update$updateReInit = function (model_) {
	var _v0 = model_.gameLevel;
	switch (_v0) {
		case 0:
			return $author$project$L0_MainMenu$Init$reInit(model_);
		case 1:
			return $author$project$L1_Livingroom$Init$reInit(model_);
		case 2:
			return $author$project$L2_Bedroom$Init$reInit(model_);
		case 3:
			return $author$project$L3_Bathroom$Init$reInit(model_);
		case 4:
			return $author$project$L4_Storeroom$Init$reInit(model_);
		case 5:
			return $author$project$L5_Balcony$Init$reInit(model_);
		case 6:
			return $author$project$L6_End$Init$reInit(model_);
		case 10:
			return $author$project$L0_Start$Init$reInit(model_);
		case 11:
			return $author$project$PreLoad$Init$reInit(model_);
		default:
			return $author$project$L0_Start$Init$reInit(model_);
	}
};
var $author$project$Types$ErrorIgnore = {$: 'ErrorIgnore'};
var $author$project$Messages$Running = {$: 'Running'};
var $author$project$L0_MainMenu$Update$update = F2(
	function (msg, model) {
		var new_model = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Prepare':
					if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
						var _v2 = msg.a;
						return _Utils_update(
							model,
							{ani: $author$project$Messages$Stopped, gameStatus: $author$project$Messages$Running});
					} else {
						return model;
					}
				case 'Paused':
					if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
						var _v4 = msg.a;
						return (!model.gameLevel) ? model : _Utils_update(
							model,
							{ani: $author$project$Messages$Stopped, gameStatus: $author$project$Messages$Running});
					} else {
						return model;
					}
				default:
					return model;
			}
		}();
		return _Utils_Tuple2(new_model, $elm$core$Platform$Cmd$none);
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Types$AnyFadeJob = {$: 'AnyFadeJob'};
var $author$project$ModelTools$dummyState = {
	dt: 0.01,
	index: 0,
	job: $author$project$Types$AnyFadeJob,
	loop: false,
	name: 'Any',
	state_function: $author$project$Types$SingularFunc(
		function (m) {
			return m;
		}),
	t: 0,
	value: 0
};
var $author$project$ModelTools$getState = F2(
	function (states, name) {
		var state_ = A2(
			$elm$core$List$filter,
			function (s) {
				return _Utils_eq(s.name, name);
			},
			states);
		var state = A2(
			$elm$core$Maybe$withDefault,
			$author$project$ModelTools$dummyState,
			$elm$core$List$head(state_));
		return state;
	});
var $author$project$L0_Start$Update$winJudge = function (model) {
	return (A2($author$project$ModelTools$getState, model.fadeStates, 'fadeInAndOut').t > 2) ? _Utils_update(
		model,
		{gameStatus: $author$project$Messages$Prepare}) : model;
};
var $author$project$L0_Start$Update$move = F2(
	function (elapsed, model) {
		var interval = 15;
		var elapsed_ = model.t_clock + elapsed;
		return (_Utils_cmp(elapsed_, interval) > 0) ? $author$project$L0_Start$Update$winJudge(
			_Utils_update(
				model,
				{t_clock: elapsed_ - interval})) : _Utils_update(
			model,
			{t_clock: elapsed_});
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$State$loopState = function (state) {
	if (state.t < 1) {
		return $elm$core$Maybe$Just(
			_Utils_update(
				state,
				{t: state.t + state.dt}));
	} else {
		var _v0 = state.loop;
		if (_v0) {
			return $elm$core$Maybe$Just(
				_Utils_update(
					state,
					{t: state.t - 1}));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$L0_Start$Update$stateIterate = function (model) {
	var _v0 = $elm$core$List$isEmpty(model.fadeStates);
	if (_v0) {
		return _Utils_update(
			model,
			{gameLevel: 1, gameStatus: $author$project$Messages$ChangeLevel});
	} else {
		var tmp_states = A2(
			$elm$core$List$filterMap,
			function (s) {
				return $author$project$State$loopState(s);
			},
			model.fadeStates);
		var new_states = A2(
			$elm$core$List$map,
			function (s) {
				var _v2 = s.state_function;
				var func = _v2.a;
				return func(s);
			},
			tmp_states);
		var new_model = _Utils_update(
			model,
			{fadeStates: new_states});
		var new_ani = function (model_) {
			var _v1 = model_.ani;
			switch (_v1.$) {
				case 'Doing':
					return _Utils_update(
						model_,
						{ani: $author$project$Messages$Stopped});
				case 'After':
					return _Utils_eq(model_.gameStatus, $author$project$Messages$Prepare) ? _Utils_update(
						model_,
						{ani: $author$project$Messages$Before, gameStatus: $author$project$Messages$Paused}) : _Utils_update(
						model_,
						{ani: $author$project$Messages$Before, gameLevel: 1, gameStatus: $author$project$Messages$ChangeLevel});
				default:
					return model_;
			}
		};
		var change = A2(
			$elm$core$List$any,
			function (s) {
				return s.t > 1;
			},
			model.fadeStates);
		return (!change) ? new_model : (($elm$core$List$length(model.fadeStates) === 2) ? _Utils_update(
			new_model,
			{ani: $author$project$Messages$Before}) : new_ani(new_model));
	}
};
var $author$project$L0_Start$Update$update = F2(
	function (msg, model) {
		var new_model = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Before':
					return _Utils_update(
						model,
						{ani: $author$project$Messages$Doing});
				case 'Doing':
					if (msg.$ === 'Tick') {
						var time = msg.a;
						return $author$project$L0_Start$Update$stateIterate(
							A2(
								$author$project$L0_Start$Update$move,
								A2($elm$core$Basics$min, time, 25),
								model));
					} else {
						return model;
					}
				case 'After':
					if (msg.$ === 'Tick') {
						var time = msg.a;
						return $author$project$L0_Start$Update$stateIterate(
							A2(
								$author$project$L0_Start$Update$move,
								A2($elm$core$Basics$min, time, 25),
								model));
					} else {
						return model;
					}
				default:
					var _v3 = model.gameStatus;
					switch (_v3.$) {
						case 'Prepare':
							if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
								var _v5 = msg.a;
								return _Utils_update(
									model,
									{ani: $author$project$Messages$After});
							} else {
								return model;
							}
						case 'Paused':
							if ((msg.$ === 'KeyDown') && (msg.a.$ === 'Space')) {
								var _v7 = msg.a;
								return _Utils_update(
									model,
									{ani: $author$project$Messages$After});
							} else {
								return model;
							}
						default:
							return model;
					}
			}
		}();
		return _Utils_Tuple2(new_model, $elm$core$Platform$Cmd$none);
	});
var $author$project$PreLoad$Update$getFunc_ = function (_v0) {
	var func = _v0.a;
	return func;
};
var $author$project$PreLoad$Update$getFunc = function (state) {
	return $author$project$PreLoad$Update$getFunc_(state.state_function);
};
var $author$project$PreLoad$Update$update = F2(
	function (msg, model) {
		var model_ = function () {
			if (msg.$ === 'Tick') {
				var elapse = msg.a;
				return _Utils_update(
					model,
					{t_clock: model.t_clock + elapse});
			} else {
				return model;
			}
		}();
		var fades = A2(
			$elm$core$List$map,
			function (f) {
				return $author$project$PreLoad$Update$getFunc(f)(f);
			},
			model_.fadeStates);
		return A2(
			$elm$core$List$any,
			function (f) {
				return f.t > 1;
			},
			fades) ? _Utils_Tuple2(
			_Utils_update(
				model_,
				{gameLevel: 10, gameStatus: $author$project$Messages$ChangeLevel}),
			$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
			_Utils_update(
				model_,
				{fadeStates: fades}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Messages$End = {$: 'End'};
var $author$project$Types$ErrorKey = {$: 'ErrorKey'};
var $author$project$Messages$aniList = _List_fromArray(
	[$author$project$Messages$Prepare, $author$project$Messages$Pass, $author$project$Messages$End]);
var $author$project$Types$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$ModelTools$squashError_Model = F2(
	function (errType, model) {
		return _Utils_update(
			model,
			{
				debug: A2(
					$elm$core$List$cons,
					$author$project$Types$Error(errType),
					model.debug)
			});
	});
var $author$project$UpdateMain$stateIterate = function (model) {
	var tmp_states = A2(
		$elm$core$List$filterMap,
		function (s) {
			return $author$project$State$loopState(s);
		},
		model.fadeStates);
	var new_states = A2(
		$elm$core$List$map,
		function (s) {
			var _v2 = s.state_function;
			var func = _v2.a;
			return func(s);
		},
		tmp_states);
	var new_model = _Utils_update(
		model,
		{fadeStates: new_states});
	var new_ani = function () {
		var _v0 = new_model.ani;
		switch (_v0.$) {
			case 'Doing':
				return _Utils_update(
					new_model,
					{ani: $author$project$Messages$Stopped, gameStatus: model.gameStatus});
			case 'After':
				var _v1 = model.gameStatus;
				switch (_v1.$) {
					case 'Prepare':
						return (model.gameLevel !== 6) ? _Utils_update(
							new_model,
							{ani: $author$project$Messages$Stopped, gameStatus: $author$project$Messages$Running}) : _Utils_update(
							model,
							{ani: $author$project$Messages$Before, gameStatus: $author$project$Messages$Pass});
					case 'Pass':
						return _Utils_update(
							model,
							{ani: $author$project$Messages$Before, fadeStates: new_model.fadeStates, gameLevel: new_model.gameLevel, gameStatus: $author$project$Messages$End});
					case 'End':
						return _Utils_update(
							new_model,
							{gameLevel: model.gameLevel + 1, gameStatus: $author$project$Messages$ChangeLevel});
					default:
						return new_model;
				}
			default:
				return new_model;
		}
	}();
	var change = A2(
		$elm$core$List$any,
		function (s) {
			return s.t > 1;
		},
		model.fadeStates);
	return (!change) ? new_model : new_ani;
};
var $author$project$UpdateMain$updateAnimation = function (model) {
	var new_model = function () {
		var _v0 = model.ani;
		switch (_v0.$) {
			case 'Before':
				return _Utils_update(
					model,
					{ani: $author$project$Messages$Doing});
			case 'Doing':
				return $author$project$UpdateMain$stateIterate(model);
			case 'After':
				return $author$project$UpdateMain$stateIterate(model);
			default:
				return (model.gameLevel !== 6) ? model : _Utils_update(
					model,
					{ani: $author$project$Messages$After});
		}
	}();
	return new_model;
};
var $author$project$Physics$clearAcc = function (uni) {
	return _Utils_update(
		uni,
		{a: $author$project$BasicTypes$zeroVector});
};
var $author$project$UpdateMain$updateCheck = function (model) {
	return _Utils_update(
		model,
		{
			unis: A2(
				$elm$core$List$filter,
				function (uni) {
					return !_Utils_eq(uni.uni, $author$project$Types$ErrorUni);
				},
				model.unis)
		});
};
var $author$project$Try$refreshAllMaybes_Conditional = F2(
	function (trys, model) {
		refreshAllMaybes_Conditional:
		while (true) {
			if (trys.b) {
				var _try = trys.a;
				var rest = trys.b;
				var _v1 = _try(model);
				if (_v1.$ === 'Just') {
					var uni = _v1.a;
					return _Utils_update(
						model,
						{
							unis: A2($author$project$ModelTools$refreshUnis, uni, model.unis)
						});
				} else {
					var $temp$trys = rest,
						$temp$model = model;
					trys = $temp$trys;
					model = $temp$model;
					continue refreshAllMaybes_Conditional;
				}
			} else {
				return model;
			}
		}
	});
var $author$project$BasicTypes$R_ = {$: 'R_'};
var $author$project$Types$Run = {$: 'Run'};
var $author$project$Try$cat_Cat = function (cat) {
	var _v0 = cat.uni;
	if (_v0.$ === 'Cat') {
		var cat_ = _v0.a;
		return cat_;
	} else {
		return $author$project$Objects$someCat_;
	}
};
var $author$project$Try$forceMove = F2(
	function (move, uni) {
		return _Utils_update(
			uni,
			{moveStatus: move});
	});
var $author$project$BasicTypes$sgnOri = function (ori) {
	if (ori.$ === 'L_') {
		return -1;
	} else {
		return 1;
	}
};
var $author$project$Try$tryCatRun = function (_v0) {
	var unis = _v0.unis;
	var keyDowns = _v0.keyDowns;
	var mayOri = A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, keyDowns) ? $elm$core$Maybe$Just($author$project$BasicTypes$L_) : (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, keyDowns) ? $elm$core$Maybe$Just($author$project$BasicTypes$R_) : $elm$core$Maybe$Nothing);
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var cat_ = $author$project$Try$cat_Cat(cat);
	var a_ = function () {
		if (mayOri.$ === 'Just') {
			var ori = mayOri.a;
			return A2(
				$author$project$BasicTypes$scale,
				$author$project$BasicTypes$sgnOri(ori),
				cat_.a_max);
		} else {
			return $author$project$BasicTypes$zeroVector;
		}
	}();
	return (A2(
		$elm$core$List$member,
		cat_.status,
		_List_fromArray(
			[$author$project$Types$Stand, $author$project$Types$Jump, $author$project$Types$Run])) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keyDowns)) && _Utils_eq(cat.gravityStatus, $author$project$Types$Ground))) ? $elm$core$Maybe$Just(
		A2(
			$author$project$Try$forceMove,
			$author$project$Types$Moving,
			A2(
				$author$project$Try$forceCatOrder,
				$author$project$Types$Run,
				_Utils_update(
					cat,
					{
						a: A2($author$project$BasicTypes$combine, cat.a, a_)
					})))) : $elm$core$Maybe$Just(
		_Utils_update(
			cat,
			{
				a: A2($author$project$BasicTypes$combine, cat.a, a_)
			}));
};
var $author$project$Types$Slowing = {$: 'Slowing'};
var $author$project$Try$tryCatStand = function (_v0) {
	var unis = _v0.unis;
	var keyDowns = _v0.keyDowns;
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var cat_ = $author$project$Try$cat_Cat(cat);
	return (A2(
		$elm$core$List$member,
		cat_.status,
		_List_fromArray(
			[$author$project$Types$Stand, $author$project$Types$Sit, $author$project$Types$Run, $author$project$Types$Jump])) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, keyDowns)) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, keyDowns)) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, keyDowns)) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keyDowns)) && _Utils_eq(cat.gravityStatus, $author$project$Types$Ground)))))) ? $elm$core$Maybe$Just(
		A2(
			$author$project$Try$forceMove,
			$author$project$Types$Slowing,
			A2($author$project$Try$forceCatOrder, $author$project$Types$Stand, cat))) : $elm$core$Maybe$Nothing;
};
var $author$project$Try$tryGirlStay = function (_v0) {
	var unis = _v0.unis;
	var isHit = F2(
		function (uni, myGirl) {
			return A2(
				$author$project$Type_Physics$hitPolys,
				A2($author$project$BasicTypes$movePoly, uni.pos, uni.coll),
				A2($author$project$BasicTypes$movePoly, myGirl.pos, myGirl.i_active));
		});
	var girl = A2($author$project$ModelTools$findNameString, 'girl', unis);
	var girl_ = $author$project$Try$girl_Girl(girl);
	var hit = A3(
		$elm$core$List$foldl,
		F2(
			function (uni, hit_) {
				return hit_ || A2(isHit, uni, girl);
			}),
		false,
		A3(
			$elm$core$List$foldl,
			F2(
				function (name, list) {
					return _Utils_ap(
						list,
						A2($author$project$ModelTools$filterNameString, name, unis));
				}),
			_List_Nil,
			_List_fromArray(
				['scene', 'wall', 'box'])));
	return (_Utils_eq(girl_.status, $author$project$Types$Walk) && hit) ? $elm$core$Maybe$Just(
		A2(
			$author$project$Try$forceGirlOrder,
			$author$project$Types$Stay,
			_Utils_update(
				girl,
				{
					a: $author$project$BasicTypes$zeroVector,
					pos: A2(
						$author$project$BasicTypes$combine,
						A2($author$project$BasicTypes$scale, -2, girl.v),
						girl.pos),
					v: $author$project$BasicTypes$zeroVector
				}))) : $elm$core$Maybe$Nothing;
};
var $author$project$Flow$updateFlow = function (model) {
	var tryList = _List_fromArray(
		[$author$project$Try$tryGirlStay, $author$project$Try$tryCatStand, $author$project$Try$tryCatRun]);
	return (model.gameLevel === 5) ? model : A2($author$project$Try$refreshAllMaybes_Conditional, tryList, model);
};
var $author$project$Interaction$detectDual = F2(
	function (active, passive) {
		return A2(
			$author$project$Type_Physics$hitPolys,
			A2($author$project$BasicTypes$movePoly, active.pos, active.i_active),
			A2($author$project$BasicTypes$movePoly, passive.pos, passive.i_passive));
	});
var $author$project$Interaction$detect = function (unis) {
	var _v0 = $author$project$ModelTools$divCat(unis);
	var cat = _v0.a;
	var res = _v0.b;
	var _v1 = $author$project$ModelTools$divGirl(res);
	var rest = _v1.b;
	var hits = A3(
		$elm$core$List$foldl,
		F2(
			function (u, h) {
				return A2($author$project$Interaction$detectDual, cat, u) ? A2($elm$core$List$cons, u, h) : h;
			}),
		_List_Nil,
		rest);
	return hits;
};
var $author$project$Model$Box_F = function (a) {
	return {$: 'Box_F', a: a};
};
var $author$project$BasicTypes$still = function (vec) {
	return $author$project$BasicTypes$norm(vec) < 1e-4;
};
var $author$project$BasicTypes$stopStill = function (vec) {
	return $author$project$BasicTypes$still(vec) ? $author$project$BasicTypes$zeroVector : vec;
};
var $author$project$Physics$moveUni = function (uni) {
	var v = function () {
		var _v0 = uni.moveStatus;
		switch (_v0.$) {
			case 'Still':
				return $author$project$BasicTypes$zeroVector;
			case 'Slowing':
				var v_ = {x: 0, y: uni.v.y};
				var a_max = function () {
					var _v1 = uni.uni;
					switch (_v1.$) {
						case 'Cat':
							var unit = _v1.a;
							return unit.a_max;
						case 'Girl':
							var unit = _v1.a;
							return unit.a_max;
						default:
							return $author$project$BasicTypes$zeroVector;
					}
				}();
				return v_;
			default:
				return uni.v;
		}
	}();
	var up = _Utils_cmp(v.y, -0.01) < 1;
	var slow = $elm$core$Basics$abs(v.x) <= 3e-6;
	var down = $elm$core$Basics$abs(v.y) >= 1;
	return _Utils_update(
		uni,
		{
			pos: A2(
				$author$project$BasicTypes$combine,
				$author$project$BasicTypes$stopStill(v),
				uni.pos),
			v: $author$project$BasicTypes$stopStill(v)
		});
};
var $author$project$Interaction$pushBox = function (index) {
	return $author$project$Model$Func(
		F2(
			function (_v0, m) {
				var ops_ = (A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, m.keyDowns) && (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, m.keyDowns) || A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, m.keyDowns))) ? m.ops : A2(
					$author$project$Operation$removeFilter,
					$author$project$Model$Box_F('push'),
					m.ops);
				var cat_ = $author$project$ModelTools$getCat_(m.unis);
				var cat = $author$project$ModelTools$getCat(m.unis);
				var box = A2(
					$author$project$ModelTools$seizeUnis,
					{index: index, name: 'box'},
					m.unis);
				var dirSgn = A2($author$project$Interaction$detectDual, cat, box) ? ((A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, m.keyDowns) && (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, m.keyDowns) && (_Utils_cmp(cat.pos.x, box.pos.x) > 0))) ? (-1.0001) : ((A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, m.keyDowns) && (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, m.keyDowns) && (_Utils_cmp(cat.pos.x, box.pos.x) < 0))) ? 1.0001 : 0)) : 0;
				var box_ = function (u) {
					return A3(
						$elm$core$List$foldl,
						F2(
							function (wall, hit) {
								return hit || A2(
									$author$project$Type_Physics$hitPolys,
									A2($author$project$BasicTypes$movePoly, wall.pos, wall.coll),
									A2($author$project$BasicTypes$movePoly, u.pos, u.coll));
							}),
						false,
						A2(
							$author$project$ModelTools$removeUnis,
							u,
							_Utils_ap(
								A2($author$project$ModelTools$filterNameString, 'wall', m.unis),
								_Utils_ap(
									A2($author$project$ModelTools$filterNameString, 'box', m.unis),
									A2($author$project$ModelTools$filterNameString, 'girl', m.unis))))) ? box : u;
				}(
					function (u) {
						return _Utils_update(
							u,
							{
								v: A2(
									$author$project$BasicTypes$combine,
									u.v,
									A2(
										$author$project$BasicTypes$scale,
										-dirSgn,
										A2($author$project$BasicTypes$Vector, cat_.v_max.x, 0)))
							});
					}(
						$author$project$Physics$moveUni(
							function (u) {
								return _Utils_update(
									u,
									{
										v: A2(
											$author$project$BasicTypes$combine,
											u.v,
											A2(
												$author$project$BasicTypes$combine,
												A2($author$project$BasicTypes$Vector, 0, -1.1),
												A2(
													$author$project$BasicTypes$scale,
													dirSgn,
													A2($author$project$BasicTypes$Vector, cat_.v_max.x, 0))))
									});
							}(box))));
				return _Utils_update(
					m,
					{
						ops: ops_,
						unis: A2($author$project$ModelTools$refreshUnis, box_, m.unis)
					});
			}));
};
var $author$project$Interaction$renderPushBox = function (index) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Box_F('push'),
			func: $author$project$Interaction$pushBox(index),
			name: A2($author$project$Types$Name, 'pushBox', index)
		});
};
var $author$project$Interaction$getBoxOps = function (index) {
	return _List_fromArray(
		[
			$author$project$Interaction$renderPushBox(index)
		]);
};
var $author$project$Model$Ladder_F = function (a) {
	return {$: 'Ladder_F', a: a};
};
var $author$project$Types$uniPoly = F2(
	function (field, uni) {
		return A2(
			$author$project$BasicTypes$movePoly,
			uni.pos,
			field(uni));
	});
var $author$project$Interaction$climbLadder = function (index) {
	return $author$project$Model$Func(
		F2(
			function (op, m) {
				var ladder = function (l) {
					return _Utils_update(
						l,
						{collisionStatus: $author$project$Types$NoCollision});
				}(
					A2(
						$author$project$ModelTools$seizeUnis,
						{index: index, name: 'ladder'},
						m.unis));
				var ladder_ = function () {
					var _v0 = ladder.uni;
					if (_v0.$ === 'Ladder') {
						var lad = _v0.a;
						return lad;
					} else {
						return $author$project$Objects$dummyLadder_;
					}
				}();
				var op_ = _Utils_update(
					op,
					{t: op.t + ladder_.dt});
				var keys = m.keyDowns;
				var girl_ = $author$project$ModelTools$getGirl_(m.unis);
				var girl = $author$project$ModelTools$getGirl(m.unis);
				var girl_v = _Utils_update(
					girl,
					{
						turn: (A2($author$project$BasicTypes$vector, ladder_.from, ladder_.to).x > 0) ? $author$project$BasicTypes$R_ : $author$project$BasicTypes$L_,
						v: $author$project$BasicTypes$zeroVector
					});
				var newGirl = _Utils_update(
					girl,
					{
						collisionStatus: $author$project$Types$NoCollision,
						pos: A2(
							$author$project$BasicTypes$combine,
							A2($author$project$BasicTypes$scale, 1 - op_.t, ladder_.from),
							A2($author$project$BasicTypes$scale, op_.t, ladder_.to)),
						uni: $author$project$Types$Girl(
							_Utils_update(
								girl_,
								{status: $author$project$Types$Climb}))
					});
				var fulfill = A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Up, keys) && (A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keys) && A2(
					$author$project$Type_Physics$hitPolys,
					A2(
						$author$project$Types$uniPoly,
						function ($) {
							return $.i_passive;
						},
						ladder),
					A2(
						$author$project$Types$uniPoly,
						function ($) {
							return $.i_active;
						},
						girl)));
				var doneLadder_ = _Utils_update(
					ladder_,
					{status: $author$project$Messages$After});
				var doneLadder = _Utils_update(
					ladder,
					{
						uni: $author$project$Types$Ladder(doneLadder_)
					});
				var doneGirl = _Utils_update(
					girl,
					{
						collisionStatus: $author$project$Types$Collision,
						uni: $author$project$Types$Girl(
							_Utils_update(
								girl_,
								{status: $author$project$Types$Stay}))
					});
				return (_Utils_eq(ladder_.status, $author$project$Messages$After) && fulfill) ? function (la) {
					return _Utils_update(
						m,
						{
							unis: A2(
								$author$project$ModelTools$refreshUnis,
								girl_v,
								A2($author$project$ModelTools$refreshUnis, la, m.unis))
						});
				}(
					function (la_) {
						return _Utils_update(
							ladder,
							{
								uni: $author$project$Types$Ladder(la_)
							});
					}(
						_Utils_update(
							ladder_,
							{status: $author$project$Messages$Doing}))) : (_Utils_eq(ladder_.status, $author$project$Messages$Doing) ? (((op.t >= 0) && (op.t < 1)) ? _Utils_update(
					m,
					{
						ops: A2($author$project$Operation$refreshName, op_, m.ops),
						unis: A2(
							$author$project$ModelTools$refreshUnis,
							ladder,
							A2($author$project$ModelTools$refreshUnis, newGirl, m.unis))
					}) : _Utils_update(
					m,
					{
						ops: A2(
							$author$project$Operation$refreshName,
							_Utils_update(
								op_,
								{t: 0}),
							m.ops),
						unis: A2(
							$author$project$ModelTools$refreshUnis,
							doneLadder,
							A2($author$project$ModelTools$refreshUnis, doneGirl, m.unis))
					})) : m);
			}));
};
var $author$project$Interaction$renderClimbLadder = function (index) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Ladder_F('climb'),
			func: $author$project$Interaction$climbLadder(index),
			name: A2($author$project$Types$Name, 'climbLadder', index),
			t: 0
		});
};
var $author$project$Interaction$downLadder = function (index) {
	return $author$project$Model$Func(
		F2(
			function (op, m) {
				var ladder = A2(
					$author$project$ModelTools$seizeUnis,
					{index: index, name: 'ladder'},
					m.unis);
				var ladder_ = function () {
					var _v0 = ladder.uni;
					if (_v0.$ === 'Ladder') {
						var lad = _v0.a;
						return lad;
					} else {
						return $author$project$Objects$dummyLadder_;
					}
				}();
				var op_ = _Utils_update(
					op,
					{t: op.t + ladder_.dt});
				var newLadder = _Utils_update(
					ladder,
					{
						pos: A2(
							$author$project$BasicTypes$combine,
							A2($author$project$BasicTypes$scale, 1 - op_.t, ladder_.start),
							A2($author$project$BasicTypes$scale, op_.t, ladder_.end))
					});
				var doneLadder_ = _Utils_update(
					ladder_,
					{status: $author$project$Messages$After});
				var doneLadder = _Utils_update(
					ladder,
					{
						uni: $author$project$Types$Ladder(doneLadder_)
					});
				return _Utils_eq(ladder_.status, $author$project$Messages$Before) ? (((op.t >= 0) && (op.t < 1)) ? _Utils_update(
					m,
					{
						ops: A2($author$project$Operation$refreshName, op_, m.ops),
						unis: A2($author$project$ModelTools$refreshUnis, newLadder, m.unis)
					}) : _Utils_update(
					m,
					{
						ops: _Utils_ap(
							_List_fromArray(
								[
									$author$project$Interaction$renderClimbLadder(index)
								]),
							A2(
								$author$project$Operation$removeFilter,
								$author$project$Model$Ladder_F('down'),
								m.ops)),
						unis: A2($author$project$ModelTools$refreshUnis, doneLadder, m.unis)
					})) : m;
			}));
};
var $author$project$Interaction$renderDownLadder = function (index) {
	return _Utils_update(
		$author$project$Operation$dummyOperation,
		{
			filter: $author$project$Model$Ladder_F('down'),
			func: $author$project$Interaction$downLadder(index),
			name: A2($author$project$Types$Name, 'downLadder', index),
			t: 0
		});
};
var $author$project$Interaction$getLadderOp = function (index) {
	return _List_fromArray(
		[
			$author$project$Interaction$renderDownLadder(index)
		]);
};
var $author$project$Interaction$renderItemTouched = _Utils_update(
	$author$project$Operation$dummyOperation,
	{
		filter: $author$project$Model$Any('item'),
		func: $author$project$Model$Func(
			F2(
				function (op, m) {
					var item = A2($author$project$ModelTools$findNameString, 'item', m.unis);
					var girl = $author$project$ModelTools$getGirl(m.unis);
					return (A2($author$project$BasicTypes$distance, item.pos, girl.pos) < 700) ? _Utils_update(
						m,
						{ani: $author$project$Messages$After, gameStatus: $author$project$Messages$Pass}) : _Utils_update(
						m,
						{
							ops: A2($author$project$Operation$removeName, op.name, m.ops)
						});
				})),
		name: A2($author$project$Types$Name, 'itemTouched', -1),
		t: 0
	});
var $author$project$Interaction$getInterOperation = function (inter) {
	var _v0 = inter.name;
	switch (_v0) {
		case 'ladder':
			return $author$project$Interaction$getLadderOp(inter.index);
		case 'box':
			return $author$project$Interaction$getBoxOps(inter.index);
		case 'item':
			return _List_fromArray(
				[$author$project$Interaction$renderItemTouched]);
		default:
			return _List_Nil;
	}
};
var $author$project$L2_Bedroom$Flow$getInterOperation = function (inter) {
	var _v0 = inter.name;
	if (_v0 === 'box') {
		return $author$project$Interaction$getBoxOps(inter.index);
	} else {
		return _List_Nil;
	}
};
var $author$project$Key$interact = function (model) {
	var getInterOp = function () {
		var _v0 = model.gameLevel;
		if (_v0 === 2) {
			return $author$project$L2_Bedroom$Flow$getInterOperation;
		} else {
			return $author$project$Interaction$getInterOperation;
		}
	}();
	return A3(
		$elm$core$List$foldl,
		F2(
			function (inter, ops) {
				return _Utils_ap(
					ops,
					getInterOp(inter));
			}),
		_List_Nil,
		$author$project$Interaction$detect(model.unis));
};
var $author$project$Operation$keyAdded = F2(
	function (old, _new) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (k, ks) {
					return _Utils_ap(
						(!A2($author$project$Operation$keyIn, k, old)) ? _List_fromArray(
							[k]) : _List_Nil,
						ks);
				}),
			_List_Nil,
			_new);
	});
var $author$project$Operation$refreshKeyDownKey = F2(
	function (keyType, keyDowns) {
		return A2($elm$core$List$member, keyType, keyDowns) ? keyDowns : A2($elm$core$List$cons, keyType, keyDowns);
	});
var $author$project$Operation$removeKeyDownKey = F2(
	function (keyType, keyDowns) {
		return A2(
			$elm$core$List$filter,
			function (k) {
				return !_Utils_eq(k, keyType);
			},
			keyDowns);
	});
var $author$project$Operation$keyCollect = F2(
	function (keyEvent, keyDowns) {
		switch (keyEvent.$) {
			case 'KeyDown':
				var key = keyEvent.a;
				return A2($author$project$Operation$refreshKeyDownKey, key, keyDowns);
			case 'KeyUp':
				var key = keyEvent.a;
				return A2($author$project$Operation$removeKeyDownKey, key, keyDowns);
			default:
				return keyDowns;
		}
	});
var $author$project$Operation$keyRemoved = F2(
	function (old, _new) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (k, ks) {
					return _Utils_ap(
						(!A2($author$project$Operation$keyIn, k, _new)) ? _List_fromArray(
							[k]) : _List_Nil,
						ks);
				}),
			_List_Nil,
			old);
	});
var $author$project$Try$forceGravity = F2(
	function (gravity, uni) {
		return _Utils_update(
			uni,
			{gravityStatus: gravity});
	});
var $author$project$Try$tryCatJump = function (_v0) {
	var unis = _v0.unis;
	var keyDowns = _v0.keyDowns;
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var cat_ = $author$project$Try$cat_Cat(cat);
	return (A2(
		$elm$core$List$member,
		cat_.status,
		_List_fromArray(
			[$author$project$Types$Stand, $author$project$Types$Run])) && ((!A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keyDowns)) && _Utils_eq(cat.gravityStatus, $author$project$Types$Ground))) ? $elm$core$Maybe$Just(
		A2(
			$author$project$Try$forceGravity,
			$author$project$Types$Air,
			A2(
				$author$project$Try$forceMove,
				$author$project$Types$Moving,
				A2(
					$author$project$Try$forceCatOrder,
					$author$project$Types$Jump,
					_Utils_update(
						cat,
						{
							v: A2($author$project$BasicTypes$combine, cat.v, cat_.v_jump)
						}))))) : $elm$core$Maybe$Nothing;
};
var $author$project$Try$tryCatSit = function (_v0) {
	var unis = _v0.unis;
	var keyDowns = _v0.keyDowns;
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var cat_ = $author$project$Try$cat_Cat(cat);
	return (_Utils_eq(cat_.status, $author$project$Types$Stand) && (A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keyDowns) && _Utils_eq(cat.gravityStatus, $author$project$Types$Ground))) ? $elm$core$Maybe$Just(
		A2($author$project$Try$forceCatOrder, $author$project$Types$Sit, cat)) : $elm$core$Maybe$Nothing;
};
var $author$project$Try$tryGirlWalk = function (_v0) {
	var unis = _v0.unis;
	var keyDowns = _v0.keyDowns;
	var mayOri = A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Left, keyDowns) ? $elm$core$Maybe$Just($author$project$BasicTypes$L_) : (A2($author$project$Operation$keyIn, $author$project$Messages$Arrow_Right, keyDowns) ? $elm$core$Maybe$Just($author$project$BasicTypes$R_) : $elm$core$Maybe$Nothing);
	var girl = A2($author$project$ModelTools$findNameString, 'girl', unis);
	var girl_ = $author$project$Try$girl_Girl(girl);
	var cat = A2($author$project$ModelTools$findNameString, 'cat', unis);
	var cat_ = $author$project$Try$cat_Cat(cat);
	var a_ = function () {
		if (mayOri.$ === 'Just') {
			var ori = mayOri.a;
			return A2(
				$author$project$BasicTypes$scale,
				$author$project$BasicTypes$sgnOri(ori),
				girl_.a_max);
		} else {
			return $author$project$BasicTypes$zeroVector;
		}
	}();
	return (_Utils_eq(girl_.status, $author$project$Types$Stay) && (A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, keyDowns) && (_Utils_eq(girl.gravityStatus, $author$project$Types$Ground) && _Utils_eq(cat_.status, $author$project$Types$Sit)))) ? $elm$core$Maybe$Just(
		A2(
			$author$project$Try$forceGirlOrder,
			$author$project$Types$Walk,
			_Utils_update(
				girl,
				{
					a: A2($author$project$BasicTypes$combine, a_, girl.a)
				}))) : $elm$core$Maybe$Nothing;
};
var $author$project$Key$updateTry = F2(
	function (keyEvent, model) {
		var oldKeys = model.keyDowns;
		var newKeys = A2($author$project$Operation$keyCollect, keyEvent, model.keyDowns);
		var newModel = _Utils_update(
			model,
			{keyDowns: newKeys});
		var removed = A2($author$project$Operation$keyRemoved, oldKeys, newKeys);
		var added = A2($author$project$Operation$keyAdded, oldKeys, newKeys);
		var ops = A2($author$project$Operation$keyIn, $author$project$Messages$Key_E, added) ? $author$project$Key$interact(newModel) : _List_Nil;
		var tryList = function () {
			if (model.gameLevel === 5) {
				return _List_Nil;
			} else {
				var removeList = function (remove_) {
					_v0$3:
					while (true) {
						if (remove_.b) {
							switch (remove_.a.$) {
								case 'Key_C':
									var _v1 = remove_.a;
									var rest = remove_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryCatStand]),
										removeList(rest));
								case 'Arrow_Left':
									var _v2 = remove_.a;
									var rest = remove_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryCatStand]),
										removeList(rest));
								case 'Arrow_Right':
									var _v3 = remove_.a;
									var rest = remove_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryCatStand]),
										removeList(rest));
								default:
									break _v0$3;
							}
						} else {
							break _v0$3;
						}
					}
					return _List_Nil;
				};
				var addList = function (add_) {
					_v4$4:
					while (true) {
						if (add_.b) {
							switch (add_.a.$) {
								case 'Key_C':
									var _v5 = add_.a;
									var rest = add_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryCatSit, $author$project$Try$tryCatStand]),
										addList(rest));
								case 'Arrow_Left':
									var _v6 = add_.a;
									var rest = add_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryGirlWalk, $author$project$Try$tryCatRun]),
										addList(rest));
								case 'Arrow_Right':
									var _v7 = add_.a;
									var rest = add_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryGirlWalk, $author$project$Try$tryCatRun]),
										addList(rest));
								case 'Arrow_Up':
									var _v8 = add_.a;
									var rest = add_.b;
									return _Utils_ap(
										_List_fromArray(
											[$author$project$Try$tryCatJump]),
										addList(rest));
								default:
									break _v4$4;
							}
						} else {
							break _v4$4;
						}
					}
					return _List_Nil;
				};
				return _Utils_ap(
					addList(added),
					removeList(removed));
			}
		}();
		return A2(
			$author$project$Try$refreshAllMaybes_Conditional,
			tryList,
			_Utils_update(
				newModel,
				{
					debug: newModel.debug,
					ops: _Utils_ap(ops, model.ops)
				}));
	});
var $author$project$UpdateMain$updateKey = function (model) {
	var cache = model.cache;
	var model_ = A3($elm$core$List$foldr, $author$project$Key$updateTry, model, cache);
	return _Utils_update(
		model_,
		{cache: _List_Nil});
};
var $author$project$UpdateMain$updateOperate = function (model) {
	var performFunc = F3(
		function (_v0, op, m) {
			var func = _v0.a;
			return A2(func, op, m);
		});
	var m_ = A3(
		$elm$core$List$foldl,
		F2(
			function (o, m) {
				return A3(performFunc, o.func, o, m);
			}),
		model,
		model.ops);
	return m_;
};
var $author$project$Physics$accelerate = function (uni) {
	var v_ = function () {
		if (_Utils_eq(uni.gravityStatus, $author$project$Types$NoGravity)) {
			return uni.v;
		} else {
			var _v0 = uni.uni;
			switch (_v0.$) {
				case 'Cat':
					var v_max = _v0.a.v_max;
					var v = uni.v;
					var a = uni.a;
					var vn = A2($author$project$BasicTypes$combine, a, v);
					return A2(
						$author$project$BasicTypes$Vector,
						$author$project$BasicTypes$sgn(vn.x) * A2(
							$elm$core$Basics$min,
							$elm$core$Basics$abs(vn.x),
							v_max.x),
						$author$project$BasicTypes$sgn(vn.y) * A2(
							$elm$core$Basics$min,
							$elm$core$Basics$abs(vn.y),
							v_max.y));
				case 'Girl':
					var v_max = _v0.a.v_max;
					var v = uni.v;
					var a = uni.a;
					var vn = A2($author$project$BasicTypes$combine, a, v);
					return A2(
						$author$project$BasicTypes$Vector,
						$author$project$BasicTypes$sgn(vn.x) * A2(
							$elm$core$Basics$min,
							$elm$core$Basics$abs(vn.x),
							v_max.x),
						$author$project$BasicTypes$sgn(vn.y) * A2(
							$elm$core$Basics$min,
							$elm$core$Basics$abs(vn.y),
							v_max.y));
				default:
					return A2($author$project$BasicTypes$combine, uni.a, uni.v);
			}
		}
	}();
	var gravity = _Utils_eq(uni.gravityStatus, $author$project$Types$NoGravity) ? $author$project$Types$NoGravity : ((v_.y < 0) ? $author$project$Types$Air : uni.gravityStatus);
	return _Utils_update(
		uni,
		{gravityStatus: gravity, v: v_});
};
var $author$project$Type_Physics$cosVectors = F2(
	function (v1, v2) {
		return A2($author$project$BasicTypes$dot, v1, v2) / ($author$project$BasicTypes$norm(v1) * $author$project$BasicTypes$norm(v2));
	});
var $author$project$Type_Physics$forwardLine = F2(
	function (tar, line) {
		var pos = A2(
			$author$project$BasicTypes$combine,
			A2($author$project$BasicTypes$vector, line.p, tar),
			A2($author$project$BasicTypes$vector, line.q, tar));
		var dir = A2(
			$author$project$BasicTypes$rotate,
			A2($author$project$BasicTypes$vector, line.p, line.q),
			90);
		return A2($author$project$BasicTypes$dot, dir, pos) >= 0;
	});
var $author$project$Type_Physics$withinLine = F2(
	function (tar, _v0) {
		var p = _v0.p;
		var q = _v0.q;
		var vec = A2($author$project$BasicTypes$vector, p, q);
		var eq_q = A3($author$project$Type_Physics$Equation, vec.x, vec.y, -((vec.x * q.x) + (vec.y * q.y)));
		var eq_p = A3($author$project$Type_Physics$Equation, vec.x, vec.y, -((vec.x * p.x) + (vec.y * p.y)));
		return (A2($author$project$Type_Physics$yieldEqSgn, tar, eq_p) * A2($author$project$Type_Physics$yieldEqSgn, tar, eq_q)) < 0;
	});
var $author$project$Type_Physics$pushLine = F3(
	function (pt, v, line) {
		if (!(A2($author$project$Type_Physics$withinLine, pt, line) && A2($author$project$Type_Physics$forwardLine, pt, line))) {
			return $author$project$BasicTypes$zeroVector;
		} else {
			var _new = A2($author$project$BasicTypes$combine, v, pt);
			var past = (A2(
				$author$project$Type_Physics$yieldEqSgn,
				pt,
				$author$project$Type_Physics$line2eq(line)) * A2(
				$author$project$Type_Physics$yieldEqSgn,
				_new,
				$author$project$Type_Physics$line2eq(line))) <= 0;
			var dir = A2(
				$author$project$BasicTypes$rotate,
				A2($author$project$BasicTypes$vector, line.p, line.q),
				90);
			var opposite = A2($author$project$BasicTypes$dot, dir, v) < 0;
			var push = A2(
				$author$project$BasicTypes$scale,
				(A2(
					$author$project$Type_Physics$cosVectors,
					A2($author$project$BasicTypes$scale, -1, v),
					dir) * $author$project$BasicTypes$norm(v)) / $author$project$BasicTypes$norm(dir),
				dir);
			return (past && opposite) ? A2($author$project$BasicTypes$scale, 1.01, push) : $author$project$BasicTypes$zeroVector;
		}
	});
var $author$project$Physics$collide = F2(
	function (lines, uni) {
		return (!_Utils_eq(uni.collisionStatus, $author$project$Types$NoCollision)) ? A3(
			$elm$core$List$foldl,
			F2(
				function (l, u) {
					var push = A3(
						$elm$core$List$foldl,
						F2(
							function (pt, pu) {
								var push_ = A3($author$project$Type_Physics$pushLine, pt, u.v, l);
								return (_Utils_cmp(
									$author$project$BasicTypes$norm(push_),
									$author$project$BasicTypes$norm(pu)) > 0) ? push_ : pu;
							}),
						$author$project$BasicTypes$zeroVector,
						A2($author$project$BasicTypes$movePoly, u.pos, u.coll));
					return _Utils_update(
						u,
						{
							gravityStatus: (push.y < 0) ? $author$project$Types$Ground : u.gravityStatus,
							v: $author$project$BasicTypes$stopStill(
								A2($author$project$BasicTypes$combine, push, u.v))
						});
				}),
			uni,
			lines) : uni;
	});
var $author$project$Physics$forceOut = F3(
	function (all, attempt, _this) {
		forceOut:
		while (true) {
			var polys = A2(
				$elm$core$List$map,
				function (u) {
					return A2($author$project$BasicTypes$movePoly, u.pos, u.coll);
				},
				A2(
					$elm$core$List$filter,
					function (u) {
						return _Utils_eq(u.collisionStatus, $author$project$Types$Collision);
					},
					A2(
						$elm$core$List$filter,
						function (u) {
							return u.name !== 'outWall';
						},
						all)));
			var pointPush = F2(
				function (pt, poly) {
					return A2($author$project$Type_Physics$pointInPoly, pt, poly) ? A3(
						$elm$core$List$foldl,
						F2(
							function (p, push) {
								return A2(
									$author$project$BasicTypes$combine,
									A2($author$project$BasicTypes$vector, pt, p),
									push);
							}),
						$author$project$BasicTypes$zeroVector,
						poly) : $author$project$BasicTypes$zeroVector;
				});
			var uniPush = F2(
				function (uniPoly, poly) {
					return A2(
						$author$project$BasicTypes$scale,
						0.005,
						A2(
							$author$project$BasicTypes$combine,
							A3(
								$elm$core$List$foldl,
								F2(
									function (pt, push) {
										return A2(
											$author$project$BasicTypes$combine,
											push,
											A2(pointPush, pt, uniPoly));
									}),
								$author$project$BasicTypes$zeroVector,
								poly),
							A2(
								$author$project$BasicTypes$scale,
								-1,
								A3(
									$elm$core$List$foldl,
									F2(
										function (pt, push) {
											return A2(
												$author$project$BasicTypes$combine,
												push,
												A2(pointPush, pt, poly));
										}),
									$author$project$BasicTypes$zeroVector,
									uniPoly))));
				});
			var push_Uni = A3(
				$elm$core$List$foldl,
				F2(
					function (poly, push) {
						return A2(
							$author$project$BasicTypes$combine,
							push,
							A2(
								uniPush,
								A2($author$project$BasicTypes$movePoly, _this.pos, _this.coll),
								poly));
					}),
				$author$project$BasicTypes$zeroVector,
				polys);
			if ((!_Utils_eq(push_Uni, $author$project$BasicTypes$zeroVector)) && ((attempt > 0) && _Utils_eq(_this.collisionStatus, $author$project$Types$Collision))) {
				var $temp$all = all,
					$temp$attempt = attempt - 1,
					$temp$this = _Utils_update(
					_this,
					{
						pos: A2($author$project$BasicTypes$combine, _this.pos, push_Uni)
					});
				all = $temp$all;
				attempt = $temp$attempt;
				_this = $temp$this;
				continue forceOut;
			} else {
				return _this;
			}
		}
	});
var $author$project$Type_Physics$dummyLine = A2($author$project$Type_Physics$Line, $author$project$BasicTypes$dummyPoint, $author$project$BasicTypes$dummyPoint);
var $author$project$Physics$updateLine = function (u) {
	return A2(
		$elm$core$List$map,
		function (lst) {
			if (lst.b && lst.b.b) {
				var a = lst.a;
				var _v1 = lst.b;
				var b = _v1.a;
				return A2(
					$author$project$Type_Physics$Line,
					A2($author$project$BasicTypes$combine, u.pos, a),
					A2($author$project$BasicTypes$combine, u.pos, b));
			} else {
				return $author$project$Type_Physics$dummyLine;
			}
		},
		A2(
			$elm$core$List$map,
			function (lst) {
				return A2(
					$elm$core$List$map,
					function (i) {
						return A2($author$project$Type_Physics$cyclePoly, i, u.coll);
					},
					lst);
			},
			A2(
				$elm$core$List$map,
				function (i) {
					return _List_fromArray(
						[i, i + 1]);
				},
				A2(
					$elm$core$List$range,
					1,
					$elm$core$List$length(u.coll)))));
};
var $author$project$Physics$updateLines = function (unis) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (u, lines) {
				return _Utils_ap(
					lines,
					$author$project$Physics$updateLine(u));
			}),
		_List_Nil,
		unis);
};
var $author$project$Physics$updateUniPhysics = F2(
	function (unis, uni) {
		var toCollide = A2(
			$elm$core$List$filter,
			function (u) {
				return (_Utils_eq(u.solidity, uni.solidity) || (!u.solidity)) && ((!_Utils_eq(u.name, uni.name)) || (!_Utils_eq(u.index, uni.index)));
			},
			unis);
		var lines = $author$project$Physics$updateLines(toCollide);
		return A2(
			$elm$core$List$member,
			uni.name,
			_List_fromArray(
				['wall', 'lift'])) ? uni : A3(
			$author$project$Physics$forceOut,
			toCollide,
			4,
			$author$project$Physics$moveUni(
				A2(
					$author$project$Physics$collide,
					lines,
					$author$project$Physics$accelerate(uni))));
	});
var $author$project$UpdateMain$updatePhysics = function (model) {
	var unis = A2(
		$elm$core$List$map,
		function (u) {
			return A2($author$project$Physics$updateUniPhysics, model.unis, u);
		},
		model.unis);
	return _Utils_update(
		model,
		{unis: unis});
};
var $author$project$Messages$Key_Y = {$: 'Key_Y'};
var $author$project$Viewbox$updateViewBox = function (model) {
	var girl = (model.gameLevel === 5) ? A2($author$project$ModelTools$findNameString, 'girlS', model.unis) : $author$project$ModelTools$getGirl(model.unis);
	var cat = (model.gameLevel === 5) ? A2($author$project$ModelTools$findNameString, 'catS', model.unis) : $author$project$ModelTools$getCat(model.unis);
	var obj = (A2($author$project$Operation$keyIn, $author$project$Messages$Key_C, model.keyDowns) || (model.gameLevel === 5)) ? girl : cat;
	var _v0 = A2($author$project$Operation$keyIn, $author$project$Messages$Key_Y, model.keyDowns) ? model.frame : model.viewBox;
	var w = _v0.w;
	var h = _v0.h;
	var newPos = A2(
		$author$project$BasicTypes$combine,
		obj.pos,
		A2($author$project$BasicTypes$Vector, (-w) / 2, ((-h) / 2) - (h / 7)));
	return _Utils_update(
		model,
		{viewPos: newPos});
};
var $author$project$Visualize$imageTranslate = function (uni) {
	var _v0 = uni.imageType;
	switch (_v0.$) {
		case 'V_Cat_Run':
			return _Utils_update(
				uni,
				{
					src: './cat/running ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Cat_Jump':
			return _Utils_update(
				uni,
				{
					src: './cat/jumping ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Cat_Sit':
			return _Utils_update(
				uni,
				{
					src: './cat/sitting ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Cat_Stand':
			return _Utils_update(
				uni,
				{
					src: './cat/standing ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Girl_Climb':
			return _Utils_update(
				uni,
				{
					src: './girl/climbing ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Girl_Hug':
			return _Utils_update(
				uni,
				{
					src: './girl/hugging ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Girl_Stay':
			return _Utils_update(
				uni,
				{
					src: './girl/staying ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Girl_Walk':
			return _Utils_update(
				uni,
				{
					src: './girl/walking ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		case 'V_Girl_Fly':
			return _Utils_update(
				uni,
				{
					src: './girl/floating ' + ($elm$core$String$fromInt(
						$elm$core$Basics$ceiling(uni.step)) + '.png')
				});
		default:
			return _Utils_update(
				uni,
				{src: ''});
	}
};
var $author$project$Type_Visual$V_Cat_Jump = {$: 'V_Cat_Jump'};
var $author$project$Type_Visual$V_Cat_Run = {$: 'V_Cat_Run'};
var $author$project$Type_Visual$V_Cat_Sit = {$: 'V_Cat_Sit'};
var $author$project$Type_Visual$V_Cat_Stand = {$: 'V_Cat_Stand'};
var $author$project$Visualize$stepLoop = F3(
	function (delta, total, step) {
		var step_ = step + delta;
		var step__ = (delta >= 0) ? ((_Utils_cmp(
			$elm$core$Basics$ceiling(step_),
			total) > 0) ? (step_ - total) : step_) : (($elm$core$Basics$ceiling(step_) < 0) ? (step_ + total) : step_);
		return step__;
	});
var $author$project$Visualize$visualCat = F3(
	function (v_step, cat, _v0) {
		var status = _v0.status;
		var v_cat_sit_total = 7;
		var v_cat_run_total = 8;
		var vOri = function (ori) {
			return (cat.v.x > 0.4) ? $author$project$BasicTypes$R_ : ((_Utils_cmp(cat.v.x, -0.4) < 0) ? $author$project$BasicTypes$L_ : ori);
		};
		var step = cat.step;
		var stand = _Utils_Tuple2($author$project$Type_Visual$V_Cat_Stand, 1);
		var stand_up = function (st) {
			return (st > 1) ? _Utils_Tuple2($author$project$Type_Visual$V_Cat_Sit, st - v_step) : stand;
		};
		var sit_down = function (st) {
			return (_Utils_cmp(st, v_cat_sit_total) < 0) ? _Utils_Tuple2($author$project$Type_Visual$V_Cat_Sit, st + v_step) : _Utils_Tuple2($author$project$Type_Visual$V_Cat_Sit, v_cat_sit_total);
		};
		var run = function (st) {
			return _Utils_Tuple2(
				$author$project$Type_Visual$V_Cat_Run,
				A3($author$project$Visualize$stepLoop, v_step, v_cat_run_total, st));
		};
		var jump = _Utils_Tuple2($author$project$Type_Visual$V_Cat_Jump, 1);
		var _v1 = function () {
			var _v2 = cat.imageType;
			if (_v2.$ === 'V_Cat_Sit') {
				switch (status.$) {
					case 'Run':
						return (_Utils_cmp(step, v_cat_sit_total) > 0) ? run(0) : stand_up(step);
					case 'Jump':
						return jump;
					case 'Sit':
						return sit_down(step);
					case 'Stand':
						return stand_up(step);
					default:
						return _Utils_Tuple2($author$project$Type_Visual$NoImage, 0);
				}
			} else {
				switch (status.$) {
					case 'Run':
						return run(step);
					case 'Jump':
						return jump;
					case 'Sit':
						return sit_down(1);
					case 'Stand':
						return stand;
					default:
						return _Utils_Tuple2($author$project$Type_Visual$NoImage, 0);
				}
			}
		}();
		var newImage = _v1.a;
		var newStep = _v1.b;
		return _Utils_update(
			cat,
			{
				imageType: newImage,
				step: newStep,
				turn: vOri(cat.turn)
			});
	});
var $author$project$Type_Visual$V_Girl_Climb = {$: 'V_Girl_Climb'};
var $author$project$Type_Visual$V_Girl_Fly = {$: 'V_Girl_Fly'};
var $author$project$Type_Visual$V_Girl_Hug = {$: 'V_Girl_Hug'};
var $author$project$Type_Visual$V_Girl_Stay = {$: 'V_Girl_Stay'};
var $author$project$Type_Visual$V_Girl_Walk = {$: 'V_Girl_Walk'};
var $author$project$Visualize$visualGirl = F3(
	function (v_step, girl, _v0) {
		var status = _v0.status;
		var v_girl_walk_total = 4;
		var walk = function (st) {
			return _Utils_Tuple2(
				$author$project$Type_Visual$V_Girl_Walk,
				A3($author$project$Visualize$stepLoop, v_step * 0.5, v_girl_walk_total, st));
		};
		var v_girl_fly_total = 12;
		var v_girl_climb_total = 3;
		var vOri = function (ori) {
			return (girl.v.x > 0) ? $author$project$BasicTypes$L_ : ((_Utils_cmp(girl.v.x, -0) < 0) ? $author$project$BasicTypes$R_ : ori);
		};
		var step = girl.step;
		var stay = _Utils_Tuple2($author$project$Type_Visual$V_Girl_Stay, 1);
		var hug = _Utils_Tuple2($author$project$Type_Visual$V_Girl_Hug, 1);
		var fly = function (st) {
			return (_Utils_cmp(st + v_step, v_girl_fly_total) > 0) ? _Utils_Tuple2($author$project$Type_Visual$V_Girl_Fly, 8) : _Utils_Tuple2(
				$author$project$Type_Visual$V_Girl_Fly,
				A3($author$project$Visualize$stepLoop, v_step, v_girl_fly_total, st));
		};
		var climb = function (st) {
			return _Utils_Tuple2(
				$author$project$Type_Visual$V_Girl_Climb,
				A3($author$project$Visualize$stepLoop, v_step * 0.5, v_girl_climb_total, st));
		};
		var _v1 = function () {
			var _v2 = girl.imageType;
			switch (_v2.$) {
				case 'V_Girl_Fly':
					switch (status.$) {
						case 'Fly':
							return fly(step);
						case 'Stay':
							return stay;
						default:
							return _Utils_Tuple2($author$project$Type_Visual$V_Girl_Fly, 8);
					}
				case 'V_Girl_Climb':
					switch (status.$) {
						case 'Climb':
							return climb(step);
						case 'Stay':
							return stay;
						default:
							return _Utils_Tuple2($author$project$Type_Visual$V_Girl_Climb, 1);
					}
				default:
					switch (status.$) {
						case 'Walk':
							return walk(step);
						case 'Stay':
							return stay;
						case 'Fly':
							return _Utils_Tuple2($author$project$Type_Visual$V_Girl_Fly, 1);
						case 'Climb':
							return _Utils_Tuple2($author$project$Type_Visual$V_Girl_Climb, 1);
						case 'Hug':
							return hug;
						default:
							return _Utils_Tuple2($author$project$Type_Visual$NoImage, 0);
					}
			}
		}();
		var newImage = _v1.a;
		var newStep = _v1.b;
		return _Utils_update(
			girl,
			{
				imageType: newImage,
				step: newStep,
				turn: vOri(girl.turn)
			});
	});
var $author$project$Visualize$updateVisual = function (model) {
	var girl_ = (model.gameLevel === 5) ? $author$project$Try$girl_Girl(
		A2($author$project$ModelTools$findNameString, 'girlS', model.unis)) : $author$project$ModelTools$getGirl_(model.unis);
	var cat_ = (model.gameLevel === 5) ? _Utils_update(
		$author$project$Objects$someCat_,
		{status: $author$project$Types$Sit}) : $author$project$ModelTools$getCat_(model.unis);
	var _v0 = (model.gameLevel === 5) ? _Utils_Tuple2(
		A2($author$project$ModelTools$findNameString, 'catS', model.unis),
		A2($author$project$ModelTools$filterOutNameString, 'catS', model.unis)) : $author$project$ModelTools$divCat(model.unis);
	var cat = _v0.a;
	var rest = _v0.b;
	var newCat = $author$project$Visualize$imageTranslate(
		A3($author$project$Visualize$visualCat, model.v_step, cat, cat_));
	var _v1 = (model.gameLevel === 5) ? _Utils_Tuple2(
		A2($author$project$ModelTools$findNameString, 'girlS', model.unis),
		A2($author$project$ModelTools$filterOutNameString, 'girlS', rest)) : $author$project$ModelTools$divGirl(rest);
	var girl = _v1.a;
	var rest_ = _v1.b;
	var newGirl = $author$project$Visualize$imageTranslate(
		A3($author$project$Visualize$visualGirl, model.v_step, girl, girl_));
	var model_ = _Utils_update(
		model,
		{
			unis: A2(
				$elm$core$List$cons,
				newGirl,
				A2($elm$core$List$cons, newCat, rest_))
		});
	return model_;
};
var $author$project$UpdateMain$updateMain_ = function (model) {
	var clearAccs = function (m) {
		var unis = A2(
			$elm$core$List$map,
			function (u) {
				return $author$project$Physics$clearAcc(u);
			},
			m.unis);
		return _Utils_update(
			m,
			{unis: unis});
	};
	var model_ = $author$project$Visualize$updateVisual(
		$author$project$UpdateMain$updateCheck(
			$author$project$UpdateMain$updatePhysics(
				$author$project$UpdateMain$updateOperate(
					$author$project$Viewbox$updateViewBox(
						$author$project$Flow$updateFlow(
							$author$project$UpdateMain$updateKey(
								clearAccs(model))))))));
	return model_;
};
var $author$project$UpdateMain$updateMain = F2(
	function (msg, model) {
		var elapsing = function (m) {
			elapsing:
			while (true) {
				var e_ = m.t_elapse + m.t_rate;
				if ((_Utils_cmp(e_, m.t_clock) < 1) && (m.t_attempts > 0)) {
					var $temp$m = $author$project$UpdateMain$updateMain_(
						_Utils_update(
							m,
							{t_attempts: model.t_attempts - 1, t_elapse: e_}));
					m = $temp$m;
					continue elapsing;
				} else {
					return _Utils_update(
						m,
						{t_attempts: model.t_attempts});
				}
			}
		};
		var model_ = function () {
			if (A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Running]))) {
				switch (msg.$) {
					case 'Tick':
						var elapse = msg.a;
						return elapsing(
							_Utils_update(
								model,
								{t_clock: model.t_clock + elapse}));
					case 'KeyDown':
						var keyType = msg.a;
						switch (keyType.$) {
							case 'Key_G':
								return _Utils_update(
									model,
									{god: !model.god});
							case 'Key_R':
								return model;
							case 'Key_P':
								return model;
							case 'Space':
								return _Utils_update(
									model,
									{gameStatus: $author$project$Messages$Paused});
							default:
								return _Utils_update(
									model,
									{
										cache: A2(
											$elm$core$List$cons,
											$author$project$Messages$KeyDown(keyType),
											model.cache)
									});
						}
					case 'KeyUp':
						var keyType = msg.a;
						switch (keyType.$) {
							case 'Key_G':
								return model;
							case 'Key_R':
								return _Utils_update(
									model,
									{gameStatus: $author$project$Messages$ChangeLevel});
							case 'Key_P':
								return _Utils_update(
									model,
									{ani: $author$project$Messages$After, gameStatus: $author$project$Messages$Pass});
							case 'Space':
								return model;
							default:
								return _Utils_update(
									model,
									{
										cache: A2(
											$elm$core$List$cons,
											$author$project$Messages$KeyUp(keyType),
											model.cache)
									});
						}
					case 'KeyWild':
						return model;
					default:
						return A2($author$project$ModelTools$squashError_Model, $author$project$Types$ErrorKey, model);
				}
			} else {
				if (A2(
					$elm$core$List$member,
					model.gameStatus,
					_List_fromArray(
						[$author$project$Messages$Paused]))) {
					return A2($author$project$L0_MainMenu$Update$update, msg, model).a;
				} else {
					if (A2($elm$core$List$member, model.gameStatus, $author$project$Messages$aniList)) {
						_v3$2:
						while (true) {
							switch (msg.$) {
								case 'Tick':
									var elapse = msg.a;
									return $author$project$UpdateMain$updateAnimation(model);
								case 'KeyDown':
									if (msg.a.$ === 'Space') {
										var _v4 = msg.a;
										return ((_Utils_eq(model.gameStatus, $author$project$Messages$Prepare) && _Utils_eq(model.ani, $author$project$Messages$Stopped)) || (_Utils_eq(model.gameStatus, $author$project$Messages$End) && _Utils_eq(model.ani, $author$project$Messages$Stopped))) ? _Utils_update(
											model,
											{ani: $author$project$Messages$After}) : model;
									} else {
										break _v3$2;
									}
								default:
									break _v3$2;
							}
						}
						return model;
					} else {
						return model;
					}
				}
			}
		}();
		return _Utils_Tuple2(model_, $elm$core$Platform$Cmd$none);
	});
var $author$project$Update$updateSpecified = F2(
	function (msg, model) {
		if (A2(
			$elm$core$List$any,
			function (d) {
				if (d.$ === 'Error') {
					return true;
				} else {
					return false;
				}
			},
			model.debug) && (!A2($elm$core$List$member, $author$project$Types$ErrorIgnore, model.debug))) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{gameStatus: $author$project$Messages$Paused}),
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = model.gameLevel;
			switch (_v1) {
				case 11:
					return A2($author$project$PreLoad$Update$update, msg, model);
				case 10:
					return A2($author$project$L0_Start$Update$update, msg, model);
				case 0:
					return A2($author$project$L0_MainMenu$Update$update, msg, model);
				default:
					return A2($author$project$UpdateMain$updateMain, msg, model);
			}
		}
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		var _v0 = function () {
			switch (msg.$) {
				case 'GetViewport':
					var viewport = msg.a.viewport;
					return _Utils_Tuple2(
						function (m) {
							return _Utils_eq(m.gameStatus, $author$project$Messages$ChangeLevel) ? $author$project$Update$updateReInit(m) : m;
						}(
							_Utils_update(
								model,
								{
									canvas: A2($author$project$Types$Coordination, viewport.width, viewport.height)
								})),
						$elm$core$Platform$Cmd$none);
				case 'Resize':
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								canvas: A2($author$project$Types$Coordination, w, h)
							}),
						$elm$core$Platform$Cmd$none);
				case 'ChooseLevel':
					var level = msg.a;
					return _Utils_Tuple2(
						$author$project$Update$updateReInit(
							_Utils_update(
								model,
								{gameLevel: level})),
						A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport));
				case 'ShowStatus':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ani: $author$project$Messages$Before,
								gameLevel: (model.gameLevel === 10) ? 0 : model.gameLevel,
								gameStatus: $author$project$Messages$Paused
							}),
						$elm$core$Platform$Cmd$none);
				case 'DebugSignal':
					var m_ = A2($elm$core$List$member, $author$project$Types$ForceDebug, model.debug) ? _Utils_update(
						model,
						{
							debug: A2(
								$elm$core$List$filter,
								function (d) {
									return !_Utils_eq(d, $author$project$Types$ForceDebug);
								},
								model.debug)
						}) : ((!A2($elm$core$List$member, $author$project$Types$NoDebugCollision, model.debug)) ? _Utils_update(
						model,
						{
							debug: A2($elm$core$List$cons, $author$project$Types$NoDebugCollision, model.debug)
						}) : _Utils_update(
						model,
						{
							debug: A2(
								$elm$core$List$filter,
								function (d) {
									return !_Utils_eq(d, $author$project$Types$NoDebugCollision);
								},
								A2($elm$core$List$cons, $author$project$Types$ForceDebug, model.debug))
						}));
					return _Utils_Tuple2(m_, $elm$core$Platform$Cmd$none);
				case 'ForcePass':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								gameLevel: function (l) {
									return (l > 10) ? 0 : ((l > 6) ? 10 : l);
								}(model.gameLevel + 1),
								gameStatus: $author$project$Messages$ChangeLevel
							}),
						$elm$core$Platform$Cmd$none);
				case 'FullView':
					var viewBox = A3(
						$elm$core$List$foldl,
						F2(
							function (de, _new) {
								if (_new.$ === 'Just') {
									var vb = _new.a;
									return $elm$core$Maybe$Just(vb);
								} else {
									if (de.$ === 'ViewBox') {
										var vb = de.a;
										return $elm$core$Maybe$Just(vb);
									} else {
										return $elm$core$Maybe$Nothing;
									}
								}
							}),
						$elm$core$Maybe$Nothing,
						model.debug);
					var debug = A2(
						$elm$core$List$filter,
						function (de) {
							if (de.$ === 'ViewBox') {
								return false;
							} else {
								return true;
							}
						},
						model.debug);
					if (viewBox.$ === 'Just') {
						var vb = viewBox.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{debug: debug, viewBox: vb}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									debug: A2(
										$elm$core$List$cons,
										$author$project$Types$ViewBox(model.viewBox),
										model.debug),
									viewBox: model.frame
								}),
							$elm$core$Platform$Cmd$none);
					}
				default:
					var _v6 = model.gameStatus;
					if (_v6.$ === 'ChangeLevel') {
						var reModel = $author$project$Update$updateReInit(model);
						return _Utils_Tuple2(
							reModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2($elm$core$Task$perform, $author$project$Messages$GetViewport, $elm$browser$Browser$Dom$getViewport),
										$author$project$Music$changeVolume(
										_Utils_Tuple2(reModel.music.id, reModel.music.volume))
									])));
					} else {
						return A2($author$project$Update$updateSpecified, msg, model);
					}
			}
		}();
		var modelAll = _v0.a;
		var cmdAll = _v0.b;
		return _Utils_Tuple2(modelAll, cmdAll);
	});
var $author$project$Messages$Lose = {$: 'Lose'};
var $elm$html$Html$audio = _VirtualDom_node('audio');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$autoplay = $elm$html$Html$Attributes$boolProperty('autoplay');
var $author$project$Messages$Balcony = {$: 'Balcony'};
var $author$project$Messages$Bathroom = {$: 'Bathroom'};
var $author$project$Messages$Bedroom = {$: 'Bedroom'};
var $author$project$Messages$Ending = {$: 'Ending'};
var $author$project$Messages$Livingroom = {$: 'Livingroom'};
var $author$project$Messages$MainMenu = {$: 'MainMenu'};
var $author$project$Messages$PreLoading = {$: 'PreLoading'};
var $author$project$Messages$Start = {$: 'Start'};
var $author$project$Messages$Storeroom = {$: 'Storeroom'};
var $author$project$Messages$decodeLevel = function (level) {
	switch (level) {
		case 11:
			return $author$project$Messages$PreLoading;
		case 10:
			return $author$project$Messages$Start;
		case 0:
			return $author$project$Messages$MainMenu;
		case 1:
			return $author$project$Messages$Livingroom;
		case 2:
			return $author$project$Messages$Bedroom;
		case 3:
			return $author$project$Messages$Bathroom;
		case 4:
			return $author$project$Messages$Storeroom;
		case 5:
			return $author$project$Messages$Balcony;
		case 6:
			return $author$project$Messages$Ending;
		default:
			return $author$project$Messages$Start;
	}
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$Attributes$loop = $elm$html$Html$Attributes$boolProperty('loop');
var $elm$html$Html$Attributes$preload = $elm$html$Html$Attributes$stringProperty('preload');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$BasicTypes$pointToString = F2(
	function (point, symbol) {
		return _Utils_ap(
			$elm$core$String$fromFloat(point.x),
			_Utils_ap(
				symbol,
				$elm$core$String$fromFloat(point.y)));
	});
var $author$project$BasicTypes$pointCommaString = function (point) {
	return A2($author$project$BasicTypes$pointToString, point, ',');
};
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $author$project$View$viewPoly = F2(
	function (color, poly) {
		var path = poly;
		return A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points(
					A2(
						$elm$core$String$join,
						' ',
						A2(
							$elm$core$List$map,
							function (p) {
								return $author$project$BasicTypes$pointCommaString(p);
							},
							path))),
					$elm$svg$Svg$Attributes$opacity('0.3'),
					$elm$svg$Svg$Attributes$fill(color)
				]),
			_List_Nil);
	});
var $author$project$View$debugCollision = F3(
	function (ratio, viewPos, unis) {
		var trans = function (point) {
			return A2(
				$author$project$BasicTypes$scale,
				ratio,
				A2(
					$author$project$BasicTypes$combine,
					A2($author$project$BasicTypes$scale, -1, viewPos),
					point));
		};
		return _Utils_ap(
			A2(
				$elm$core$List$map,
				function (u) {
					return A2(
						$author$project$View$viewPoly,
						'#000000',
						A2(
							$elm$core$List$map,
							trans,
							A2($author$project$BasicTypes$movePoly, u.pos, u.coll)));
				},
				A2($author$project$ModelTools$filterOutNameString, 'outWall', unis)),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					function (u) {
						return A2(
							$author$project$View$viewPoly,
							'#D01717',
							A2(
								$elm$core$List$map,
								trans,
								A2($author$project$BasicTypes$movePoly, u.pos, u.i_active)));
					},
					unis),
				A2(
					$elm$core$List$map,
					function (u) {
						return A2(
							$author$project$View$viewPoly,
							'#11C7C7',
							A2(
								$elm$core$List$map,
								trans,
								A2($author$project$BasicTypes$movePoly, u.pos, u.i_passive)));
					},
					unis)));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$View$toText = function (a) {
	return _List_fromArray(
		[
			$elm$html$Html$text(
			$elm$core$Debug$toString(a))
		]);
};
var $author$project$View$toP = function (a) {
	return A2(
		$elm$html$Html$p,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'opacity', '1'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
			]),
		$author$project$View$toText(a));
};
var $author$project$View$debugger = F2(
	function (debugList, ops) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'left', '75%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'width', '10%'),
							A2($elm$html$Html$Attributes$style, 'height', '20%'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.6'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000')
						]),
					A3(
						$elm$core$List$foldl,
						F2(
							function (d, lst) {
								return A2(
									$elm$core$List$cons,
									$author$project$View$toP(d),
									lst);
							}),
						_List_Nil,
						A2($elm$core$List$take, 20, debugList))),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'left', '85%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'width', '15%'),
							A2($elm$html$Html$Attributes$style, 'height', '60%'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.6'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000')
						]),
					A3(
						$elm$core$List$foldl,
						F2(
							function (d, lst) {
								return A2(
									$elm$core$List$cons,
									$author$project$View$toP(d),
									lst);
							}),
						_List_Nil,
						A2($elm$core$List$take, 20, ops)))
				]));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$View$toP_ = function (a) {
	return A2(
		$elm$html$Html$p,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'opacity', '1'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2($elm$html$Html$Attributes$style, 'height', '2%'),
				A2($elm$html$Html$Attributes$style, 'top', '0%'),
				A2($elm$html$Html$Attributes$style, 'left', '10%')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(a)
			]));
};
var $author$project$View$debuggerUnis = function (unis) {
	var roundPoint = function (pt) {
		return A2(
			$author$project$BasicTypes$Point,
			$elm$core$Basics$round(pt.x * 1000) / 1000,
			$elm$core$Basics$round(pt.y * 1000) / 1000);
	};
	var renderU = function (uni) {
		return A2(
			$elm$core$List$map,
			function (str) {
				return $author$project$View$toP_(str);
			},
			_List_fromArray(
				[
					uni.name,
					$elm$core$Debug$toString(uni.index),
					$elm$core$Debug$toString(
					roundPoint(uni.pos)),
					$elm$core$Debug$toString(
					roundPoint(uni.v)),
					$elm$core$Debug$toString(
					roundPoint(uni.a)),
					$elm$core$Debug$toString(uni.gravityStatus),
					$elm$core$Debug$toString(uni.moveStatus),
					$elm$core$Debug$toString(uni.collisionStatus),
					$elm$core$Debug$toString(uni.uni)
				]));
	};
	var divFloat = function (pos) {
		var wid = 15;
		return $elm$html$Html$div(
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$elm$core$String$fromFloat(pos * wid) + '%'),
					A2($elm$html$Html$Attributes$style, 'top', '0%'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(wid) + '%'),
					A2($elm$html$Html$Attributes$style, 'height', '37%'),
					A2($elm$html$Html$Attributes$style, 'opacity', '0.6'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
					A2($elm$html$Html$Attributes$style, 'background-color', '#000000')
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, u) {
					return A2(
						divFloat,
						i,
						renderU(u));
				}),
			A3(
				$elm$core$List$foldl,
				F2(
					function (na, us) {
						return _Utils_ap(
							us,
							A2($author$project$ModelTools$filterNameString, na, unis));
					}),
				_List_Nil,
				_List_fromArray(
					['girl', 'cat', 'box', 'lift', 'girlS', 'catS', 'slime', 'light', '']))));
};
var $author$project$BasicTypes$floatToPx = function (_float) {
	return $elm$core$String$fromFloat(_float) + 'px';
};
var $author$project$View$divBlock = F4(
	function (ratio, viewBox, canvas, alpha) {
		var c_w = viewBox.w * ratio;
		var c_l = (canvas.w - c_w) / 2;
		var c_h = viewBox.h * ratio;
		var c_t = (canvas.h - c_h) * 0.35;
		return $elm$html$Html$div(
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$author$project$BasicTypes$floatToPx(c_w)),
					A2(
					$elm$html$Html$Attributes$style,
					'height',
					$author$project$BasicTypes$floatToPx(c_h)),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$author$project$BasicTypes$floatToPx(c_l)),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$author$project$BasicTypes$floatToPx(c_t)),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha))
				]));
	});
var $author$project$BasicTypes$floatToString = $elm$core$String$fromFloat;
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$View$sortVisual = $elm$core$List$sortBy(
	function (v) {
		return v.layer;
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$image = $elm$svg$Svg$trustedNode('image');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$View$viewImage = F3(
	function (ratio, viewPos, uni) {
		var trans = function (point) {
			return A2(
				$author$project$BasicTypes$scale,
				ratio,
				A2(
					$author$project$BasicTypes$combine,
					A2($author$project$BasicTypes$scale, -1, viewPos),
					point));
		};
		var vPos = trans(
			A2(
				$author$project$BasicTypes$combine,
				uni.pos,
				A2(
					$author$project$BasicTypes$combine,
					A2($author$project$BasicTypes$Vector, (-uni.w) / 2, (-uni.h) / 2),
					uni.offset)));
		var ravPos = trans(
			A2(
				$author$project$BasicTypes$combine,
				uni.pos,
				A2(
					$author$project$BasicTypes$combine,
					A2($author$project$BasicTypes$Vector, (-uni.w) / 2, (-uni.h) / 2),
					uni.offset)));
		return A2(
			$elm$svg$Svg$image,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x(
						$author$project$BasicTypes$floatToString(vPos.x)),
						$elm$svg$Svg$Attributes$y(
						$author$project$BasicTypes$floatToString(vPos.y)),
						$elm$svg$Svg$Attributes$width(
						$author$project$BasicTypes$floatToString(ratio * uni.w)),
						$elm$svg$Svg$Attributes$height(
						$author$project$BasicTypes$floatToString(ratio * uni.h)),
						$elm$svg$Svg$Attributes$xlinkHref(uni.src),
						$elm$svg$Svg$Attributes$opacity(
						$author$project$BasicTypes$floatToString(uni.opacity))
					]),
				_Utils_eq(uni.turn, $author$project$BasicTypes$R_) ? _List_fromArray(
					[
						$elm$svg$Svg$Attributes$transform(
						'scale (-1,1)  translate(' + ($author$project$BasicTypes$floatToString(((-2) * ravPos.x) - (ratio * uni.w)) + ',0)'))
					]) : _List_Nil),
			_List_Nil);
	});
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$img = _VirtualDom_node('img');
var $author$project$L1_Livingroom$View$viewReality = F2(
	function (alpha, model) {
		var alpha_ = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Pass':
					return _Utils_eq(model.ani, $author$project$Messages$After) ? (1.6 * alpha) : 0;
				case 'End':
					return (!_Utils_eq(model.ani, $author$project$Messages$After)) ? ((alpha < 0.2) ? (1 - alpha) : 0.8) : (0.8 * (1 - alpha));
				default:
					return 0;
			}
		}();
		var radius = (_Utils_eq(model.ani, $author$project$Messages$After) && _Utils_eq(model.gameStatus, $author$project$Messages$Pass)) ? (alpha_ * 60) : 100;
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('L1_scene/reality.png'),
					$elm$html$Html$Attributes$alt('Reality Scene'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '7%'),
					A2($elm$html$Html$Attributes$style, 'left', '13.3%'),
					A2($elm$html$Html$Attributes$style, 'width', '73.5%'),
					A2(
					$elm$html$Html$Attributes$style,
					'clip-path',
					'circle( ' + ($elm$core$String$fromFloat(radius) + '% at 52% 18%)')),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_)),
					A2(
					$elm$html$Html$Attributes$style,
					'filter',
					'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha_)) + 'px)'))
				]),
			_List_Nil);
	});
var $author$project$L2_Bedroom$View$viewReality = F2(
	function (alpha, model) {
		var alpha_ = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Pass':
					return _Utils_eq(model.ani, $author$project$Messages$After) ? (1.6 * alpha) : 0;
				case 'End':
					return (!_Utils_eq(model.ani, $author$project$Messages$After)) ? ((alpha < 0.2) ? (1 - alpha) : 0.8) : (0.8 * (1 - alpha));
				default:
					return 0;
			}
		}();
		var radius = (_Utils_eq(model.ani, $author$project$Messages$After) && _Utils_eq(model.gameStatus, $author$project$Messages$Pass)) ? (alpha_ * 60) : 100;
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('L2_scene/reality.png'),
					$elm$html$Html$Attributes$alt('Reality Scene'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '7%'),
					A2($elm$html$Html$Attributes$style, 'left', '14%'),
					A2($elm$html$Html$Attributes$style, 'width', '72%'),
					A2(
					$elm$html$Html$Attributes$style,
					'clip-path',
					'circle( ' + ($elm$core$String$fromFloat(radius) + '% at 52% 78%)')),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_)),
					A2(
					$elm$html$Html$Attributes$style,
					'filter',
					'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha_)) + 'px)'))
				]),
			_List_Nil);
	});
var $author$project$L3_Bathroom$View$viewReality = F2(
	function (alpha, model) {
		var alpha_ = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Pass':
					return _Utils_eq(model.ani, $author$project$Messages$After) ? (1.6 * alpha) : 0;
				case 'End':
					return (!_Utils_eq(model.ani, $author$project$Messages$After)) ? ((alpha < 0.2) ? (1 - alpha) : 0.8) : (0.8 * (1 - alpha));
				default:
					return 0;
			}
		}();
		var radius = (_Utils_eq(model.ani, $author$project$Messages$After) && _Utils_eq(model.gameStatus, $author$project$Messages$Pass)) ? (alpha_ * 60) : 100;
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('L3_scene/reality.png'),
					$elm$html$Html$Attributes$alt('Reality Scene'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '7%'),
					A2($elm$html$Html$Attributes$style, 'left', '15%'),
					A2($elm$html$Html$Attributes$style, 'width', '70%'),
					A2(
					$elm$html$Html$Attributes$style,
					'clip-path',
					'circle( ' + ($elm$core$String$fromFloat(radius) + '% at 46% 18%)')),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_)),
					A2(
					$elm$html$Html$Attributes$style,
					'filter',
					'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha_)) + 'px)'))
				]),
			_List_Nil);
	});
var $author$project$L4_Storeroom$View$viewReality = F2(
	function (alpha, model) {
		var alpha_ = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Pass':
					return _Utils_eq(model.ani, $author$project$Messages$After) ? (1.6 * alpha) : 0;
				case 'End':
					return (!_Utils_eq(model.ani, $author$project$Messages$After)) ? ((alpha < 0.2) ? (1 - alpha) : 0.8) : (0.8 * (1 - alpha));
				default:
					return 0;
			}
		}();
		var radius = (_Utils_eq(model.ani, $author$project$Messages$After) && _Utils_eq(model.gameStatus, $author$project$Messages$Pass)) ? (alpha_ * 60) : 100;
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('L4_scene/reality.png'),
					$elm$html$Html$Attributes$alt('Reality Scene'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '7%'),
					A2($elm$html$Html$Attributes$style, 'left', '12%'),
					A2($elm$html$Html$Attributes$style, 'width', '70%'),
					A2(
					$elm$html$Html$Attributes$style,
					'clip-path',
					'circle( ' + ($elm$core$String$fromFloat(radius) + '% at 46% 18%)')),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_)),
					A2(
					$elm$html$Html$Attributes$style,
					'filter',
					'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha_)) + 'px)'))
				]),
			_List_Nil);
	});
var $author$project$L5_Balcony$View$viewReality = F2(
	function (alpha, model) {
		var alpha_ = function () {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'Pass':
					return _Utils_eq(model.ani, $author$project$Messages$After) ? (1.6 * alpha) : 0;
				case 'End':
					return (!_Utils_eq(model.ani, $author$project$Messages$After)) ? ((alpha < 0.2) ? (1 - alpha) : 0.8) : (0.8 * (1 - alpha));
				default:
					return 0;
			}
		}();
		var radius = (_Utils_eq(model.ani, $author$project$Messages$After) && _Utils_eq(model.gameStatus, $author$project$Messages$Pass)) ? (alpha_ * 60) : 100;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'top', '0%'),
					A2($elm$html$Html$Attributes$style, 'left', '0%'),
					A2($elm$html$Html$Attributes$style, 'background-color', '#FFFFFF'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('L5_scene/reality.png'),
							$elm$html$Html$Attributes$alt('Reality Scene'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '7%'),
							A2($elm$html$Html$Attributes$style, 'left', '18%'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2(
							$elm$html$Html$Attributes$style,
							'clip-path',
							'circle( ' + ($elm$core$String$fromFloat(radius) + '% at 46% 18%)')),
							A2(
							$elm$html$Html$Attributes$style,
							'filter',
							'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha_)) + 'px)'))
						]),
					_List_Nil)
				]));
	});
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $author$project$L1_Livingroom$View$viewStory = F2(
	function (alpha, model) {
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		var alpha_subtitle = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Stopped':
					return 1;
				case 'Before':
					return 0;
				case 'Doing':
					return alpha_;
				default:
					return 1;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '0%'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '50%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '30%'),
							A2($elm$html$Html$Attributes$style, 'left', '31.5%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'line-height', '0.5'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 5))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('My father favors football games,')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 4))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('My mother favors comedies,')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 3))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('I love to watch Animal World.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 2))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('But I am only allowed to watch before football games start,')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 1))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('if my father is not angry.')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '74%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to enter Bedroom.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '8%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '60px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Living Room')
						]))
				]));
	});
var $author$project$L2_Bedroom$View$viewStory = F2(
	function (alpha, model) {
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		var alpha_subtitle = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Stopped':
					return 1;
				case 'Before':
					return 0;
				case 'Doing':
					return alpha_;
				default:
					return 1;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '0%'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '50%'),
							A2($elm$html$Html$Attributes$style, 'height', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '25%'),
							A2($elm$html$Html$Attributes$style, 'left', '32%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'line-height', '0.5'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 7))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Time to sleep, Nissa.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle + 6))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Just one more bedtime story please, papa.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 5))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"I have told you one about unicorns, and one about bunny girls.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 4))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Now every well-behaved girl is asleep.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 3))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"But I want a story about mama.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 2))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Oh...just as I have told you, Paradisa,\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Mama has gone to a place far, far away.\"')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '80%'),
							A2($elm$html$Html$Attributes$style, 'left', '37%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to enter Bathroom.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '50px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Bedroom')
						]))
				]));
	});
var $author$project$L3_Bathroom$View$viewStory = F2(
	function (alpha, model) {
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		var alpha_subtitle = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Stopped':
					return 1;
				case 'Before':
					return 0;
				case 'Doing':
					return alpha_;
				default:
					return 1;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '0%'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '60%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '25%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'line-height', '0.5'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 4))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Get your teeth brushed, get your self washed, get your soul cleaned.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 3))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Brushing is the divinest ceremony in the world,')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 2))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Everyone performs it twice, and in between they go away to live.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 1))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('I too brush my teeth today, to claim my temporary aliveness.')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '78%'),
							A2($elm$html$Html$Attributes$style, 'left', '36%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to enter Storeroom.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '3%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '50px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Bathroom')
						]))
				]));
	});
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $author$project$L4_Storeroom$View$viewStory = F2(
	function (alpha, model) {
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		var alpha_subtitle = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Stopped':
					return 1;
				case 'Before':
					return 0;
				case 'Doing':
					return alpha_;
				default:
					return 1;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '0%'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '50%'),
							A2($elm$html$Html$Attributes$style, 'top', '20%'),
							A2($elm$html$Html$Attributes$style, 'left', '25%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'line-height', '0.5'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 7)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
									A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"She is a prodigy, you mustn\'t give up on her education.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 6)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
									A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Practice 40 hours a day, Nissa.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 5)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
									A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Why not practice Requiem for your mother\'s funeral, my dear?\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 4)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
									A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"A violinist should protect her hand from dirty slime.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 3)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
									A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('I can\'t.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 2)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
									A2($elm$html$Html$Attributes$style, 'color', '#e77777')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('I won\'t.')
								])),
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 1)),
									A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
									A2($elm$html$Html$Attributes$style, 'color', '#e74242')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('I won\'t.')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '85%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to enter Balcony.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '50px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Storeroom')
						]))
				]));
	});
var $author$project$L5_Balcony$View$viewStory = F2(
	function (alpha, model) {
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		var alpha_subtitle = function () {
			var _v0 = model.ani;
			switch (_v0.$) {
				case 'Stopped':
					return 1;
				case 'Before':
					return 0;
				case 'Doing':
					return alpha_;
				default:
					return 1;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0%'),
							A2($elm$html$Html$Attributes$style, 'left', '0%'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '60%'),
							A2($elm$html$Html$Attributes$style, 'color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'top', '20%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							A2($elm$html$Html$Attributes$style, 'line-height', '0.5'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 6))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"What animal do you like best, Nissa?\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 5))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Cat.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 4))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"What color of cat do you like best, Nissa?\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 3))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Hmm, black.\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 2))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"Let\'s go and pick a doll of black cat for your birthday, my little princess?\"')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									$elm$core$String$fromFloat(alpha_subtitle * 1))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('\"That is so great, mama!\"')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'top', '85%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to end.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#000000'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '50px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Balcony')
						]))
				]));
	});
var $author$project$View$viewStrain = F3(
	function (_v0, _v1, frame) {
		var x = _v0.x;
		var y = _v0.y;
		var w = _v1.w;
		var h = _v1.h;
		return A2(
			$author$project$BasicTypes$Point,
			A3($elm$core$Basics$clamp, 0, frame.w - w, x),
			A3($elm$core$Basics$clamp, 0, frame.h - h, y));
	});
var $author$project$L1_Livingroom$View$viewText = F2(
	function (alpha, model) {
		var story = '\r\nI like the feeling of marching forward until I can\'t make another step.\r\n';
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha_))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '33%'),
							A2($elm$html$Html$Attributes$style, 'left', '15%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '35px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, story)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '65%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to Continue.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Paranoia')
						]))
				]));
	});
var $author$project$L2_Bedroom$View$viewText = F2(
	function (alpha, model) {
		var story = '\r\nI lost my taste for any flavor when the pale news rushed through my life.\r\n';
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '33%'),
							A2($elm$html$Html$Attributes$style, 'left', '15%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '35px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, story)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '65%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to Continue.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Marshmallow')
						]))
				]));
	});
var $author$project$L3_Bathroom$View$viewText = F2(
	function (alpha, model) {
		var story = '\r\nI lost my taste for any flavor when the pale news rushed through my life.\r\n';
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '33%'),
							A2($elm$html$Html$Attributes$style, 'left', '15%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '35px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, story)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '65%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to Continue.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Drowning')
						]))
				]));
	});
var $author$project$L4_Storeroom$View$viewText = F2(
	function (alpha, model) {
		var story = '\r\nMarch then, if you have to escape from your life.\r\n\r\nMarch with pride - unless something real is in sight.\r\n';
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '33%'),
							A2($elm$html$Html$Attributes$style, 'left', '15%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '35px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, story)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '65%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to Continue.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Flame')
						]))
				]));
	});
var $author$project$L5_Balcony$View$viewText = F2(
	function (alpha, model) {
		var story = '\r\nRun and run, until nobody\'s around.\r\n\r\nUntil nothing\'s around.\r\n';
		var alpha_ = _Utils_eq(model.ani, $author$project$Messages$After) ? (1 - alpha) : alpha;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '70%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '33%'),
							A2($elm$html$Html$Attributes$style, 'left', '15%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '35px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, story)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '30%'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '65%'),
							A2($elm$html$Html$Attributes$style, 'left', '35%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, 'Press SPACE to Continue.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '40%'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
							A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
							A2($elm$html$Html$Attributes$style, 'top', '5%'),
							A2($elm$html$Html$Attributes$style, 'left', '30%'),
							A2($elm$html$Html$Attributes$style, 'font-size', '72px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha_))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Paradise')
						]))
				]));
	});
var $author$project$L6_End$View$viewReality1 = function (alpha) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'top', '0%'),
				A2($elm$html$Html$Attributes$style, 'left', '0%'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src('L5_scene/reality1.png'),
						$elm$html$Html$Attributes$alt('Reality Scene'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '7%'),
						A2($elm$html$Html$Attributes$style, 'left', '18%'),
						A2($elm$html$Html$Attributes$style, 'width', '70%'),
						A2(
						$elm$html$Html$Attributes$style,
						'filter',
						'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha)) + 'px)'))
					]),
				_List_Nil)
			]));
};
var $author$project$L6_End$View$viewReality2 = function (alpha) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'top', '0%'),
				A2($elm$html$Html$Attributes$style, 'left', '0%'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src('L5_scene/reality2.png'),
						$elm$html$Html$Attributes$alt('Reality Scene'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '7%'),
						A2($elm$html$Html$Attributes$style, 'left', '18%'),
						A2($elm$html$Html$Attributes$style, 'width', '70%'),
						A2(
						$elm$html$Html$Attributes$style,
						'filter',
						'blur(' + ($elm$core$String$fromFloat(20 * (1 - alpha)) + 'px)'))
					]),
				_List_Nil)
			]));
};
var $author$project$L6_End$View$viewText = function (model) {
	var alpha = A2($author$project$ModelTools$getState, model.fadeStates, 'fadeInAndOut').value;
	var _v0 = model.ani;
	switch (_v0.$) {
		case 'Before':
			return A2($elm$html$Html$div, _List_Nil, _List_Nil);
		case 'Doing':
			return $author$project$L6_End$View$viewReality1(alpha);
		case 'Stopped':
			return $author$project$L6_End$View$viewReality1(alpha);
		default:
			return $author$project$L6_End$View$viewReality2(alpha);
	}
};
var $author$project$View$viewGame = function (model) {
	var viewPos = A3($author$project$View$viewStrain, model.viewPos, model.viewBox, model.frame);
	var rescale = 0.8;
	var doc_w = model.canvas.w;
	var doc_h = model.canvas.h;
	var alphaWhole = function () {
		var _v5 = model.ani;
		switch (_v5.$) {
			case 'Before':
				return 0;
			case 'Doing':
				return A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
			case 'Stopped':
				return 1;
			default:
				return A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
		}
	}();
	var long_story = function () {
		var _v4 = model.gameLevel;
		switch (_v4) {
			case 1:
				return A2($author$project$L1_Livingroom$View$viewStory, alphaWhole, model);
			case 2:
				return A2($author$project$L2_Bedroom$View$viewStory, alphaWhole, model);
			case 3:
				return A2($author$project$L3_Bathroom$View$viewStory, alphaWhole, model);
			case 4:
				return A2($author$project$L4_Storeroom$View$viewStory, alphaWhole, model);
			case 5:
				return A2($author$project$L5_Balcony$View$viewStory, alphaWhole, model);
			default:
				return A2($elm$html$Html$div, _List_Nil, _List_Nil);
		}
	}();
	var one_story = function () {
		var _v3 = model.gameLevel;
		switch (_v3) {
			case 1:
				return A2($author$project$L1_Livingroom$View$viewText, alphaWhole, model);
			case 2:
				return A2($author$project$L2_Bedroom$View$viewText, alphaWhole, model);
			case 3:
				return A2($author$project$L3_Bathroom$View$viewText, alphaWhole, model);
			case 4:
				return A2($author$project$L4_Storeroom$View$viewText, alphaWhole, model);
			case 5:
				return A2($author$project$L5_Balcony$View$viewText, alphaWhole, model);
			case 6:
				return $author$project$L6_End$View$viewText(model);
			default:
				return A2($elm$html$Html$div, _List_Nil, _List_Nil);
		}
	}();
	var reality = function () {
		var _v2 = model.gameLevel;
		switch (_v2) {
			case 1:
				return A2($author$project$L1_Livingroom$View$viewReality, alphaWhole, model);
			case 2:
				return A2($author$project$L2_Bedroom$View$viewReality, alphaWhole, model);
			case 3:
				return A2($author$project$L3_Bathroom$View$viewReality, alphaWhole, model);
			case 4:
				return A2($author$project$L4_Storeroom$View$viewReality, alphaWhole, model);
			case 5:
				return A2($author$project$L5_Balcony$View$viewReality, alphaWhole, model);
			default:
				return A2($elm$html$Html$div, _List_Nil, _List_Nil);
		}
	}();
	var _v0 = model.viewBox;
	var w = _v0.w;
	var h = _v0.h;
	var ratio = function (r) {
		return $elm$core$Basics$isNaN(r) ? 1 : r;
	}(
		rescale * A2($elm$core$Basics$min, doc_w / w, doc_h / h));
	var mainView = function (alpha) {
		return A5(
			$author$project$View$divBlock,
			ratio,
			model.viewBox,
			model.canvas,
			alpha,
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$svg,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$version('1.1'),
								$elm$svg$Svg$Attributes$width(
								$author$project$BasicTypes$floatToString(ratio * w)),
								$elm$svg$Svg$Attributes$height(
								$author$project$BasicTypes$floatToString(ratio * h)),
								$elm$svg$Svg$Attributes$x(
								$author$project$BasicTypes$floatToString(ratio * 0)),
								$elm$svg$Svg$Attributes$y(
								$author$project$BasicTypes$floatToString(ratio * 0)),
								$elm$svg$Svg$Attributes$viewBox(
								$author$project$BasicTypes$floatToString(0) + (' ' + ($author$project$BasicTypes$floatToString(0) + (' ' + ($author$project$BasicTypes$floatToString(ratio * w) + (' ' + $author$project$BasicTypes$floatToString(ratio * h)))))))
							]),
						_Utils_ap(
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$g,
									_List_Nil,
									A2(
										$elm$core$List$map,
										A2($author$project$View$viewImage, ratio, viewPos),
										$author$project$View$sortVisual(
											A2($author$project$ModelTools$filterOutNameString, 'subtitle', model.unis))))
								]),
							(A2($elm$core$List$member, $author$project$Types$NoDebugCollision, model.debug) && (!A2($elm$core$List$member, $author$project$Types$ForceDebug, model.debug))) ? _List_Nil : A3($author$project$View$debugCollision, ratio, viewPos, model.unis)))
					]),
				(!A2($elm$core$List$member, $author$project$Types$ForceDebug, model.debug)) ? _List_Nil : _List_fromArray(
					[
						A2($author$project$View$debugger, model.debug, model.ops),
						$author$project$View$debuggerUnis(model.unis)
					])));
	};
	var _v1 = model.gameStatus;
	switch (_v1.$) {
		case 'Prepare':
			return _Utils_eq(model.ani, $author$project$Messages$After) ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'height', '100%'),
						A2($elm$html$Html$Attributes$style, 'top', '0%'),
						A2($elm$html$Html$Attributes$style, 'left', '0%')
					]),
				_List_fromArray(
					[
						one_story,
						mainView(alphaWhole)
					])) : one_story;
		case 'Pass':
			return _Utils_eq(model.ani, $author$project$Messages$After) ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'height', '100%'),
						A2($elm$html$Html$Attributes$style, 'top', '0%'),
						A2($elm$html$Html$Attributes$style, 'left', '0%')
					]),
				_List_fromArray(
					[
						mainView(1 - alphaWhole),
						reality
					])) : reality;
		case 'End':
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'height', '100%'),
						A2($elm$html$Html$Attributes$style, 'top', '0%'),
						A2($elm$html$Html$Attributes$style, 'left', '0%')
					]),
				_List_fromArray(
					[reality, long_story]));
		default:
			return mainView(alphaWhole);
	}
};
var $elm$html$Html$Attributes$hidden = $elm$html$Html$Attributes$boolProperty('hidden');
var $author$project$PreLoad$View$visualizeLoad = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#000000'),
				A2($elm$html$Html$Attributes$style, 'left', '0%'),
				A2($elm$html$Html$Attributes$style, 'top', '-10%')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src('loading.png'),
						$elm$html$Html$Attributes$alt('Network Failure'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '0%'),
						A2($elm$html$Html$Attributes$style, 'left', '0%'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(
							A2($author$project$ModelTools$getState, model.fadeStates, 'fadeOut').value)),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						$elm$html$Html$Attributes$hidden(
						(model.gameLevel === 11) ? false : true)
					]),
				_List_Nil)
			]));
};
var $author$project$Messages$ChooseLevel = function (a) {
	return {$: 'ChooseLevel', a: a};
};
var $author$project$Messages$Key_S = {$: 'Key_S'};
var $author$project$L0_MainMenu$View$Percent_pos = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$L0_MainMenu$View$visualizeMenu1 = function (model) {
	var level = model.gameLevel;
	var hiding = function (bool) {
		return bool ? '0' : '0.5';
	};
	var button_size = function (now_level) {
		switch (now_level) {
			case 10:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '39.3%', '28.1%');
			case 11:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '17.6%', '33.1%');
			case 2:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '14.7%', '31.5%');
			case 3:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '9.27%', '25.2%');
			case 4:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '17.0%', '14.2%');
			case 5:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '11.7%', '28%');
			case 6:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '16.1%', '35%');
			default:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '', '');
		}
	};
	var button_pos = function (now_level) {
		switch (now_level) {
			case 10:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '37.2%', '30.7%');
			case 11:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '43.2%', '58.7%');
			case 2:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '27.9%', '7.6%');
			case 3:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '42.6%', '12.4%');
			case 4:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '51.9%', '16.2%');
			case 5:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '60.9%', '59.1%');
			case 6:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '27.0%', '53.1%');
			default:
				return A2($author$project$L0_MainMenu$View$Percent_pos, '', '');
		}
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'opacity', '1'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#000000')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'height', '100%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'left', '0'),
						A2($elm$html$Html$Attributes$style, 'top', '0')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(
								'L0/menu' + ($elm$core$String$fromInt(level) + '.png')),
								$elm$html$Html$Attributes$alt('Main Menu'),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'left', '6%'),
								A2($elm$html$Html$Attributes$style, 'top', '5%'),
								A2($elm$html$Html$Attributes$style, 'width', '88%')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Livingroom1'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(1)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(10).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(10).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(10).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(10).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#CCE9B7'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 1)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Living Room')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Livingroom2'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(1)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(11).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(11).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(11).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(11).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#CCE9B7'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 1)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Living Room')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Bedroom'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(2)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(2).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(2).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(2).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(2).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#FDB9A8'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 2)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Bedroom')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Bathroom'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(3)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(3).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(3).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(3).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(3).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#c1d0f2'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 3)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Bathroom')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Storeroom'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(4)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(4).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(4).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(4).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(4).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#D4C485'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 4)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Storeroom')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Balcony'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(5)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(5).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(5).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(5).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(5).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#C8C8C8'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 5)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Balcony')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('Bedroom2'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$ChooseLevel(6)),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								button_pos(6).x),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								button_pos(6).y),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								button_size(6).x),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								button_size(6).y),
								A2($elm$html$Html$Attributes$style, 'opacity', '0'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#E06F7C'),
								A2($elm$html$Html$Attributes$style, 'border', '0px'),
								A2($elm$html$Html$Attributes$style, 'font-family', 'High Tower Text, sans-serif'),
								$elm$html$Html$Attributes$disabled(level === 6)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Bedroom')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'right', '20%'),
								A2($elm$html$Html$Attributes$style, 'top', '8%'),
								A2($elm$html$Html$Attributes$style, 'width', '5%'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$KeyDown($author$project$Messages$Key_S)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(false)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Skip')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'left', '20%'),
								A2($elm$html$Html$Attributes$style, 'top', '8%'),
								A2($elm$html$Html$Attributes$style, 'width', '5%'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
								$elm$html$Html$Attributes$disabled(!level),
								$elm$html$Html$Events$onClick(
								$author$project$Messages$KeyDown($author$project$Messages$Space)),
								A2(
								$elm$html$Html$Attributes$style,
								'opacity',
								hiding(false)),
								A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Back')
							]))
					]))
			]));
};
var $author$project$L0_MainMenu$View$visualizeMenu = $author$project$L0_MainMenu$View$visualizeMenu1;
var $author$project$Type_Visual$Color = F4(
	function (red, green, blue, alpha) {
		return {alpha: alpha, blue: blue, green: green, red: red};
	});
var $author$project$Type_Visual$rgb = F3(
	function (red, green, blue) {
		return A4($author$project$Type_Visual$Color, red, green, blue, 1);
	});
var $author$project$L0_Start$View$backgroundColor = A3($author$project$Type_Visual$rgb, 0, 0, 0);
var $author$project$Type_Visual$colorToString = function (_v0) {
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	var alpha = _v0.alpha;
	return 'rgba(' + ($elm$core$String$fromInt(red) + (',' + ($elm$core$String$fromInt(green) + (',' + ($elm$core$String$fromInt(blue) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))))));
};
var $elm$html$Html$Attributes$align = $elm$html$Html$Attributes$stringProperty('align');
var $author$project$L0_Start$View$visualizeHelp = function (model) {
	var alpha = function () {
		var _v0 = model.ani;
		switch (_v0.$) {
			case 'Before':
				return 0;
			case 'Doing':
				return A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
			case 'Stopped':
				return 1;
			default:
				return 1 - A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				_Utils_eq(model.gameStatus, $author$project$Messages$Paused) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '30%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
						$elm$html$Html$Attributes$align('center'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'Colombia')
					]),
				_List_fromArray(
					[
						A2(
						$elm_explorations$markdown$Markdown$toHtml,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('GameHelp')
							]),
						'\r\n#### [ ↑ ]  [ ↓ ]  [←]  [→]\r\n\r\n[ Space ] for pause and overview\r\n\r\nHold [ C ] to control the Girl / Release [ C ] to control the Cat\r\n\r\n[ P ] ass a level\r\n\r\n## [ E ] for Interaction\r\n')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'bottom', '5%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'color', '#b7e5d9'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
						$elm$html$Html$Attributes$align('center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Powered by Cattubene')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('Duality'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'top', '5%'),
						A2($elm$html$Html$Attributes$style, 'height', '15%'),
						A2($elm$html$Html$Attributes$style, 'left', '40%'),
						A2($elm$html$Html$Attributes$style, 'align', 'center'),
						A2($elm$html$Html$Attributes$style, 'width', '20%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '100px'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #000000'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
						$elm$html$Html$Events$onClick(
						$author$project$Messages$ChooseLevel(1))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Paradisa')
					]))
			]));
};
var $author$project$L0_Start$View$visualizeMenu = function (model) {
	var alpha = function () {
		var _v0 = model.ani;
		switch (_v0.$) {
			case 'Before':
				return 0;
			case 'Doing':
				return A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
			case 'Stopped':
				return 1;
			default:
				return 1 - A2($author$project$ModelTools$getState, model.fadeStates, 'fadeIn').value;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2(
				$elm$html$Html$Attributes$style,
				'opacity',
				$elm$core$String$fromFloat(alpha)),
				A2(
				$elm$html$Html$Attributes$style,
				'display',
				A2($elm$core$List$member, model.gameStatus, $author$project$Messages$aniList) ? 'block' : 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('help'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'left', '47%'),
						A2($elm$html$Html$Attributes$style, 'width', '6%'),
						A2($elm$html$Html$Attributes$style, 'top', '52%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '32px'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #000000'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
						$elm$html$Html$Events$onClick(
						$author$project$Messages$KeyDown($author$project$Messages$Space))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Help')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'bottom', '5%'),
						A2($elm$html$Html$Attributes$style, 'width', '100%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
						A2($elm$html$Html$Attributes$style, 'color', '#b7e5d9'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
						$elm$html$Html$Attributes$align('center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Powered by Cattubene')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('Paradisa'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'top', '15%'),
						A2($elm$html$Html$Attributes$style, 'left', '40%'),
						A2($elm$html$Html$Attributes$style, 'align', 'center'),
						A2($elm$html$Html$Attributes$style, 'width', '20%'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '100px'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'sundiary'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid #000000'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
						$elm$html$Html$Events$onClick(
						$author$project$Messages$ChooseLevel(1))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Paradisa')
					]))
			]));
};
var $author$project$L0_Start$View$visualizeStart = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2(
				$elm$html$Html$Attributes$style,
				'background-color',
				$author$project$Type_Visual$colorToString($author$project$L0_Start$View$backgroundColor)),
				A2($elm$html$Html$Attributes$style, 'left', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '0')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src('icon.png'),
						$elm$html$Html$Attributes$alt('Network Failure'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'top', '8%'),
						A2($elm$html$Html$Attributes$style, 'left', '30%'),
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(
							A2($author$project$ModelTools$getState, model.fadeStates, 'fadeInAndOut').value)),
						A2($elm$html$Html$Attributes$style, 'width', '40%'),
						$elm$html$Html$Attributes$hidden(
						(model.gameLevel === 10) ? false : true)
					]),
				_List_Nil),
				A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Paused])) ? $author$project$L0_Start$View$visualizeHelp(model) : $author$project$L0_Start$View$visualizeMenu(model)
			]));
};
var $author$project$View$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'left', '0%'),
				A2($elm$html$Html$Attributes$style, 'top', '0%'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#000000')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					function () {
					var _v0 = $author$project$Messages$decodeLevel(model.gameLevel);
					switch (_v0.$) {
						case 'PreLoading':
							return $author$project$PreLoad$View$visualizeLoad(model);
						case 'Start':
							return $author$project$L0_Start$View$visualizeStart(model);
						case 'MainMenu':
							return $author$project$L0_MainMenu$View$visualizeMenu(model);
						default:
							return $author$project$View$viewGame(model);
					}
				}()
				]),
			(!A2(
				$elm$core$List$member,
				model.gameStatus,
				_List_fromArray(
					[$author$project$Messages$Lose, $author$project$Messages$Prepare]))) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$audio,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id(model.music.id),
							$elm$html$Html$Attributes$src(model.music.src),
							$elm$html$Html$Attributes$autoplay(true),
							$elm$html$Html$Attributes$preload('True'),
							$elm$html$Html$Attributes$loop(model.music.repeat)
						]),
					_List_Nil)
				]) : _List_Nil));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return $author$project$Main$init;
		},
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Update$update,
		view: $author$project$View$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));