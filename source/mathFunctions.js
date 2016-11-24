var Tree = require('./tree.js');

var maths = {};

maths.add = function(a, b, lookup) {
	lookup['_'] = a.evaluate(lookup) + b.evaluate(lookup);
	return lookup;	
}


maths.mul = function(a, b, lookup) {
	lookup['_'] = a.evaluate(lookup) * b.evaluate(lookup);
	return lookup;
}

maths.sub = function(a, b, lookup) {
	lookup['_'] = a.evaluate(lookup) - b.evaluate(lookup);
	return lookup;
}

maths.pow = function(a, b, lookup) {
	lookup['_'] = Math.pow(a.evaluate(lookup), b.evaluate(lookup));
	return lookup; 
}

maths.fact = function(a, b, lookup) {
	lookup['_'] = factorial(a.evaluate(lookup));
	return lookup;
}

var factorial = function(num) {
	if (num == 1) {return 1};
	return num * factorial(num - 1)
}
maths.pow.asString = 'pow'
maths.add.asString = 'plus';
maths.mul.asString = 'times';
maths.sub.asString = 'minus';

maths.pow.sign = '^'
maths.add.sign = '+';
maths.mul.sign = '-';
maths.sub.sign = '*';
module.exports = maths;