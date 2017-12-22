const libName = 'chimera-ui';

export default function transform(t, path, options){
    const { libDirectory, style } = options;
    
    const replacements = path.node.specifiers.reduce((rep, sp) => {
        if(t.isImportSpecifier(sp)){
            const replacement = getReplacement(t, sp);
            return rep.concat(replacement);
        }
    });
    path.replaceWithMultiple(replacements);
}

//import { Button } from 'chimera-ui';
//{ Button }: ImportSpecifier => Button: ImportDefaultSpecifier

function getReplacement(t, specifier, style){
    const replacement = [];
    const componentName = specifier.imported.name;
    replacement.push(
        t.importDeclaration(
            [t.ImportDefaultSpecifier(t.identifier(`${libName}/lib/${componentName}`))],
            t.stringLiteral(libName)
        )
    );
    if(style || style === 'scss'){
        replacement.push(
            t.importDeclaration(
                [], 
                t.stringLiteral(`${libName}/style/index.scss`)
            )
        );
    }else if(style === 'css'){

    }
    return replacement;
}

function camel2dash(name) {
    if (!name)
        return '';
    return name.replace(/[A-Z]/g, function(ch, index) {
        if (index === 0)
            return ch.toLowerCase();
        return '-' + ch.toLowerCase();
    });
}