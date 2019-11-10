class DocumentedItem {
	constructor(parent, data) {
		this.parent = parent;

		const { name, comment, flags, sources } = data;

		this.name = name;
		this.description = comment ? comment.shortText || comment.text : 'No description available';

		this.flags = this.parseFlags(flags);
		this.sources = this.parseSources(sources);
	}

	parseFlags(flags = []) {
		const formatted = {};
		Object.keys(flags)
			.forEach(f => formatted[f.substr(2).toLowerCase()] = true);
		return formatted;
	}

	parseSources(sources) {
		return sources ? sources[0] : undefined;
	}

	serializer() {
		return {...{
			name: this.name,
			description: this.description,
			flags: this.flags,
			sources: this.sources
		}, ...this.serialize() };
	}
}

module.exports = DocumentedItem;