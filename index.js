const BreakPointAST = require('./src/breakpointast.js')
const {generate} = require("astring")
const acorn = require('acorn')
let code = `

let d = 10;

`
let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node) {
   console.log(ctx.evaluate(node))
})

br.addNodeBreakPoint("Literal", function(ctx, node, builder){
    ctx.replaceExpression(node, builder.createLiteral(1337))
})

br.walk()


br.addNodeBreakPoint("BinaryExpression", function(ctx, node) {
    console.log(ctx.evaluate(node))
})
 
br.addNodeBreakPoint("Literal", function(ctx, node){
     console.log(node.value)
})
 
br.walk()

console.log(br.ast.body[0].declarations)
 

let  formattedCode = generate(br.ast)
console.log(formattedCode)
