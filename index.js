const BreakPointAST = require('./src/breakpointast.js')

let code = `

let lol = 100 * 100 + (1 ^ 2) + 4;

let k = 16+lol;

function d() {

    console.log("ok")
}

`
let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node) {
   console.log(ctx.evaluate(node))
})

br.walk()