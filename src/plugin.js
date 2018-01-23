import buildWarning from './warning';

const defaultOptions = {
    libName: 'chimera-ui',
    libDirectory: 'lib',
    style: 'scss'
};

export default function plugin({ types: t }){
    return {
        visitor: {
            ImportDeclaration(path, state){
                const warning = buildWarning(path);
                const options = Object.assign({}, defaultOptions, state.opts);
                const { libName , libDirectory, style } = options;
                if(t.isStringLiteral(path.node.source, { value: libName })){
                    const declarations = [];                
                    path.node.specifiers.forEach(sp => {

                        warning(
                            t.isImportNamespaceSpecifier(sp),
                            `The namespaced import declaration like: import * as chimera from '${libName}' is not supported`
                        );
                        warning(
                            t.isImportDefaultSpecifier(sp),
                            `The default import declaration like: import chimera from '${libName}' is not supported`
                        );
    
                        if(t.isImportSpecifier(sp)){
                            const name = sp.imported.name;
                            const targetDir = `${libName}/${libDirectory}/components/${name}`; 
                            const cssFile = `${targetDir}/style/css/index.css`;
                            const scssFile = `${targetDir}/style/index.scss`;
                            declarations.push(
                                t.importDeclaration([
                                    t.ImportDefaultSpecifier(t.identifier(`${name}`))
                                ], t.stringLiteral(`${targetDir}`))
                            );
                            if(style === true || style === 'scss'){
                                declarations.push(
                                    t.importDeclaration([],
                                        t.stringLiteral(`${scssFile}`)
                                    )
                                );
                            }else if(style === 'css'){
                                declarations.push(
                                    t.importDeclaration([],
                                        t.stringLiteral(`${cssFile}`)
                                    )
                                );
                            }
                        }
                    });     
                    path.replaceWithMultiple(declarations);                                                                               
                }            
            }
        }
    };
}