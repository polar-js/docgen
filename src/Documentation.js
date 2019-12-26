const DocumentationClass = require('./types/Class.js');
const { version } = require('../package.json');

class Documentation {
	constructor(data) {
		this.name = data.name;
		this.classes = new Map();

		this.parse(data);
	}

	parse(data) {
		data.children
			.filter(c => c.kindString === 'Class')
			.forEach(c => this.addClass(c));
	}

	addClass(data) {
		this.classes.set(data.name, new DocumentationClass(this, data));
	}

	serialize() {
		const meta = {
			generator: version,
			date: new Date().getTime()
		};

		// TODO: custom i.e. General, topics, examples

		const classes = Array.from(this.classes.values()).map(c => c.serializer());

		return {
			meta,
			classes
		};
	}
}

module.exports = Documentation;