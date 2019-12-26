const DocumentationItem = require('./Item.js');
const DocumentationParameter = require('./Parameter.js');

class DocumentationMethod extends DocumentationItem {
	constructor(parent, data) {
		super(parent, data);
		this.parameters = new Map();

		this.parse(data);
	}

	parse(data) {
		if (data.signatures[0].comment) {
			this.description = data.signatures[0].comment.shortText;
		}
		this.returns = this.parseType(data.signatures[0].type)

		if (data.signatures[0].parameters) data.signatures[0].parameters
			.forEach(p => this.addParameter(p));
	}

	addParameter(p) {
		this.parameters.set(p.name, new DocumentationParameter(this, p));
	}

	serialize() {
		return {
			returns: this.returns,
			parameters: this.parameters.size > 0 ? Array.from(this.parameters.values()).map(p => p.serializer()) : []
		};
	}
}

module.exports = DocumentationMethod;