import BreakPointAST from './src/BreakPointASTBuilder.js'

function generate_string(size) {
    return (Math.random() + 1).toString(36).substring(size);
}

let code = `
    let d = (10 + 10) + 5 * 6 + 6 + 30 * 1337 - 10;
    let c = d * 13 + 444 - 3 + 188
    let dd = "lol"
`

let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node, builder, obfu) {
    ctx.replaceExpression(node, obfu.generate_mba(node))
})

br.walk()
console.log(br.ast)


//console.log(br.ast.body[0].declarations[0])
