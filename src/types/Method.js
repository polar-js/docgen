const DocumentationItem = require('./Item.js');
const DocumentationParameter = require('./Parameter.js');

class DocumentationMethod extends DocumentationItem {
	constructor(parent, data) {
		super(parent, data);
		this.parameters = new Map();

		this.parse(data);
	}

	parse(data) {
		this.returns = data.signatures[0].type;

		if (data.parameters) data.parameters
			.forEach(p => this.addParameter(p));
	}

	addParameter(p) {
		this.parameters.set(p.name, new DocumentationParameter(p));
	}

	serialize() {
		console.log(this.parameters)
		return {
			returns: this.returns,
			parameters: this.toArray(this.parameters)
		};
	}
}

module.exports = DocumentationMethod;