#!/usr/bin/env node
const TypeDoc = require('typedoc');
const fs = require('fs');

const Documentation = require('./Documentation.js');

const app = new TypeDoc.Application({
	mode:   'file',
	target: 'es6',
	module: 'commonjs',
	tsconfig: 'tsconfig.json',
	experimentalDecorators: true,
	categorizeByGroup: false
});

const project = app.convert(app.expandInputFiles(['src']));
const json = app.serializer.projectToObject(project);
fs.writeFileSync('ugly_docs.json', JSON.stringify(json));


const docs = new Documentation(json);
fs.writeFileSync('docs.json', JSON.stringify(docs.serialize()));
