var Trees = function(left, right) {
	this.tree = [left, right];
}

Trees.prototype = {
	evaluate: function(lookup) {
		lookup = lookup || {'_': undefined}
		var finl = this.tree.reduce(function(initial, node) {
			return node.evaluation(initial);
		}, lookup);
		return finl['_']
	},
	evaluation: function(lookup) {
		lookup['_'] = this.evaluate(lookup);
		return lookup;
	}
}
module.exports = Trees;