const DocumentationItem = require('./Item.js');

class DocumentationParameter extends DocumentationItem {
	constructor(parent, data) {
		super(parent, data);

		this.parse(data);
	}

	parse(data) {
		this.type = this.parseType(data.type);
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