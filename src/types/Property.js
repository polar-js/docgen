const DocumentationItem = require('./Item.js');

class DocumentationProperty extends DocumentationItem{
	constructor(parent, data) {
		super(parent, data);

		this.parse(data);
	}

	parse(data) {
		this.type = data.type.name;
	}

	serialize() {
		return {
			type: this.type
		};
	}
}

module.exports = DocumentationProperty;