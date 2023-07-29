const BreakPointAST = require('./src/breakpointast.js')
const {generate} = require("astring")

let code = `
    let d = 10 * 10 - 30 * (4 + 5);
`

let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node, builder) {
    ctx.replaceExpression(
        node, 
        builder.createLiteral(ctx.evaluate(node))
    )
})

br.walk()

let source_code = generate(br.ast, {
    comments: true,
})
console.log(source_code)

