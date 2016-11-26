var Trees = function() {
	this.tree = []
	this.lookup = {'_': undefined};
}

Trees.prototype = {
	evaluate: function() {
		var finl = this.tree.reduce(function(initial, node) {
			return node.evaluation(initial);
		}, this.lookup);
		return finl['_']
	},
	evaluation: function(lookup) {
		lookup['_'] = this.evaluate(lookup);
		return lookup;
	},
	toJS: function() {
		
	},
	add: function(a) {
		this.tree.push(a);
	},
	withPeranthesis: function() {
		return this.tree[0].withPeranthesis();
	},
	representation: function() {
		return this.tree[0].representation();
	}
}
module.exports = Trees;