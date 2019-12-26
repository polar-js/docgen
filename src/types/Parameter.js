const DocumentationItem = require('./Item.js');

class DocumentationParameter extends DocumentationItem {
	constructor(parent, data) {
		super(parent, data);

		this.parse(data);
	}

	parse(data) {
		this.type = data.type.name;
		this.defaultValue = data.defaultValue;
	}

	serialize() {
		const data = {
			type: this.type,
		}
		if (this.defaultValue) data.defaultValue = this.defaultValue;
		return data;
	}
}

module.exports = DocumentationParameter;