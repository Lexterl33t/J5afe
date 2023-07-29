const BreakPointAST = require('./src/breakpointast.js')
const {generate} = require("astring");

let code = `
    let d = 10 * 20 + 30 >> 1333333333;
    let dd = "lol"
`

let br = new BreakPointAST(code)


br.addNodeBreakPoint("Literal", function(ctx, node, builder) {
    
    if (typeof node.value !== 'number')
        return
    
    ctx.replaceExpression(node, builder.createBinaryExpression('+', builder.createLiteral(node.value), builder.createLiteral(1337)))
})


br.walk()



let source_code = generate(br.ast, {
    comments: true,
})

console.log(source_code)


//console.log(br.ast.body[0].declarations[0])
