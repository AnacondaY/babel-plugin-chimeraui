import { transform } from 'babel-core';
import plugin from '../src';

//const code = 'import * as chimera from \'chimera-ui\'';

const babel = (code, options = {}) => {
    return transform(code, {
        plugins: [
            [ plugin, options ]
        ],
        babelrc: false
    }).code;
};


describe('=== error import declaration ===', () => {

    it('throw error on namespaced import declaration', () => {
        const code = 'import * as chimera from \'chimera-ui\'';
        expect(() => babel(code)).toThrowError(
            'The namespaced import declaration like: import * as chimera from \'chimera-ui\' is not supported'
        )
    });

    it('throw error on default import declaration', () => {
        const code = 'import chimera from \'chimera-ui\'';
        expect(() => babel(code)).toThrowError(
            'The default import declaration like: import chimera from \'chimera-ui\' is not supported'
        )
    });

});

describe('=== transform import declaration correctly ===', () => {

    const code = 'import { Button } from \'chimera-ui\'';

    it('with default options', () => {
        const result = babel(code);
        expect(result.includes('import Button from \'chimera-ui/lib/Button\'')).toBeTruthy();
        expect(result.includes('import \'chimera-ui/lib/Button/style/index.scss\'')).toBeTruthy();
    });

    it('with css style', () => {
        const result = babel(code, { style: 'css' });
        expect(result.includes('import Button from \'chimera-ui/lib/Button\'')).toBeTruthy();
        expect(result.includes('import \'chimera-ui/lib/Button/style/css/index.css\'')).toBeTruthy();
    });

    it('without style', () => {
        const result = babel(code, { style: false });
        expect(result.includes('import Button from \'chimera-ui/lib/Button\'')).toBeTruthy();
        expect(result.includes('import \'chimera-ui/lib/Button/style/index.scss\'')).toBeFalsy();
    });

    it('modify libDirectory', () => {
        expect(babel(code, { libDirectory: 'xxx' }).includes('import Button from \'chimera-ui/xxx/Button\'')).toBeTruthy();
    });

});

