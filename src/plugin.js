import transform from './transform';

export default function plugin({ types: t }){
    return {
        visitor: {
            ImportDeclaration(path, state){
                const { libDirectory = 'lib', style = 'scss' } = state.opts;
                transform(t, path, {
                    libDirectory,
                    style
                });
            }
        }
    }
}