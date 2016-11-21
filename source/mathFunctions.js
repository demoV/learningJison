var maths = {};

maths.add = function(a, b, lookup) {
	lookup['_'] = a + b;
	return a + b;
}

maths.equal = function(a, b, lookup) {
	lookup[a] = b;
	return b;
}

maths.mul = function(a, b, lookup) {
	
}

module.exports = maths;