## BreakPointAST javascript library

Dependances:
<a href="https://github.com/acornjs/acorn">Acorn.js</a>


example
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

br.addNodeBreakPoint("CallExpression", function(ctx, node) {
	console.log(node)
})

br.addNodeBreakPoint("Literal", function(ctx,node) {
	console.log(node.value)
})

br.addNodeBreakPoint("BinaryExpression", function(ctx, node) {
	console.log(ctx.evaluate(node))
})

br.walk()

```


## Obfuscation
You can create constant unfolding

```js
let d = 10 * 20 + 30 >> 1333333333;
let dd = "lol"
```
become
```js
let d = (10 + 1337) * (20 + 1337) + (30 + 1337) >> 1333333333 + 1337;
let dd = "lol";
```

with
```js
br.addNodeBreakPoint("Literal", function(ctx, node, builder) {
    
    if (typeof node.value !== 'number')
        return
	ctx.replaceExpression(node, builder.createBinaryExpression(
		'+', builder.createLiteral(node.value), builder.createLiteral(1337)
		)
	)
})
```

## Deobfuscation
Constant folding
```js
let d = (10 + 1337) * (20 + 1337) + (30 + 1337) >> 1333333333 + 1337;
let dd = "lol";
```

Become
```js
let d = 111;
let dd = "lol";
```
with
```js
br.addNodeBreakPoint("BinaryExpression", function(ctx, node, builder) {
    ctx.replaceExpression(node, builder.createLiteral(ctx.evaluate(node)))
})

br.walk()
```