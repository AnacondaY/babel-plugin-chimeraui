import { transform } from 'babel-core';
import plugin from '../src/plugin';

const syntax = 'import { Button } from \'chimera-ui\'';
const babel = (code, options) => {
    return transform(code, {
        plugins: [
            plugin
        ],
        babelrc: false
    }).code;
}
const code = babel(syntax);
console.log(code);
// describe('babel plugin chimeraui', () => {

//     let result;

//     beforeEach(() => {
//         result = transform(syntax, {
//             plugins: [plugin],
//             babelrc: true
//         });
//     });
    
//     test('import declaration AST', () => {
//         const { ast, code } = result;
//         expect(code).not.toBe(null);
//     });

// });

// pluginTester({
//     plugin,
//     pluginName: 'chimeraui',
//     title: 'import syntax test',
//     tests: [{
//         title: 'correct import declaration',
//         code: syntax,
//         output: "import button from 'chimera-ui'"
//     }]
// })
