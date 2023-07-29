## BreakPointAST javascript library

Dependances:
<a href="https://github.com/acornjs/acorn">Acorn.js</a>


exemple
```js

var code = `
let lol = 10;

console.log(lol)

if (lol == 10 + 10) {
	console.log("ok")
} else {
	console.log("nop")
}
`	

let br = new BreakPointAST(code)

br.addNodeBreakPoint("CallExpression", function(node) {
	console.log(node)
})

br.addNodeBreakPoint("Literal", function(node) {
	console.log(node.value)
})

br.addNodeBreakPoint("BinaryExpression", function(node) {
	console.log(node)
})

br.walk()

```