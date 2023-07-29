const BreakPointAST = require('./src/breakpointast.js')
const {generate} = require("astring");


function generate_string(size) {
    return (Math.random() + 1).toString(36).substring(size);
}


let code = `
    let d = 10+10;
`

let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node, builder, obfu) {
    ctx.replaceExpression(node, obfu.generate_mba(node))
})

br.walk()



let source_code = generate(br.ast, {
    comments: true,
})

console.log(source_code)


//console.log(br.ast.body[0].declarations[0])
