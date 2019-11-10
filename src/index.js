const TypeDoc = require('typedoc');
const dir = process.cwd();

const app = new TypeDoc.Application({
    mode:   'Modules',
    logger: 'none',
    target: 'ES5',
    module: 'CommonJS',
    experimentalDecorators: true
});

const project = app.convert(app.expandInputFiles(['src']));
console.log(project);

const project2 = app.convert(app.expandInputFiles([dir + '/src']));
console.log(project2);