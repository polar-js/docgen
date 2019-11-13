const DocumentationItem = require('./Item.js');
const DocumentationProperty = require('./Property.js');
const DocumentationMethod = require('./Method.js');
const DocumenationParameter = require('./Parameter.js');

class DocumentationClass extends DocumentationItem {
	constructor(parent, data) {
		super(parent, data);

		this.properties = new Map();
		this.methods = new Map();

		this.parse(data);
	}

	parse(data) {
		const {children, extendedTypes, sources } = data;

		if (extendedTypes) this.extends = this.parent.classes.get(extendedTypes[0].name);

		data.children
			.filter(c => c.kindString === 'Property')
			.forEach(c => this.addProperty(c));

		children
			.filter(c => c.kindString === 'Method')
			.forEach(c => this.addMethod(c));

		const constructor = data.children.find(c => c.kindString === 'Constructor');
		if (constructor) {
			const parameters = constructor.signatures[0].parameters;
			if (parameters) this.parameters = constructor.signatures[0].parameters
				.map(p => new DocumenationParameter(p.name, p));
		}
	}

	addProperty(data) {
		this.properties.set(data.name, new DocumentationProperty(this, data));
	}

	addMethod(data) {
		this.methods.set(data.name, new DocumentationMethod(this, data));
	}

	serialize() {
		return {
			extends: this.extends ? this.extends.name : undefined,
			properties: this.toArray(this.properties),
			methods: this.toArray(this.methods),
			parameters: this.toArray(this.parameters)
		};
	}
}

module.exports = DocumentationClass;