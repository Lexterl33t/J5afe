const BreakPointAST = require('./src/breakpointast.js')

let code = `

let lol = 10 + 10;

let k = 16+lol;

function d() {

    console.log("ok")
}

`
let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node) {
   console.log(node)
})

br.walk()