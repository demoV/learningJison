var Trees = function(left, right) {
	this.tree = [left, right];
	this.lookup = {'_': undefined};
}

Trees.prototype = {
	evaluate: function(lookup) {
		lookup = lookup || this.lookup;
		var finl = this.tree.reduce(function(initial, node) {
			return node.evaluation(initial);
		}, lookup);
		return finl['_']
	},
	evaluation: function(lookup) {
		lookup['_'] = this.evaluate(lookup);
		return lookup;
	},
	toJS: function() {

	}
}
module.exports = Trees;