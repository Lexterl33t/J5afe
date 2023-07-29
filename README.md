## BreakPointAST javascript library

Dependances:
<a href="https://github.com/acornjs/acorn">Acorn.js</a>


Acorn is used for the parser and BreakpointAST takes care of the recursive path.

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

```js
let d = 10 * 10 + (1 ^ 2) + 2000 * 300 - (2 * 6);
let dd = "lol"
```

Become
```js
let d = (function ok() {
  return 10;
})() * (function ok() {
  return 10;
})() + ((function ok() {
  return 1;
})() ^ (function ok() {
  return 2;
})()) + (function ok() {
  return 2000;
})() * (function ok() {
  return 300;
})() - (function ok() {
  return 2;
})() * (function ok() {
  return 6;
})();
let dd = "lol";
```
With

```js
let br = new BreakPointAST(code)

br.addNodeBreakPoint("Literal", function(ctx, node, builder) {
    
    if (typeof node.value !== 'number') return;

    ctx.replaceExpression(
        node, 
        builder.createCallExpression(
            builder.createFunctionExpression(
                id=builder.createIdentifier("ok"),
                expression=false, 
                generator=false, 
                async=false, 
                params=[],
                body=builder.createBlockStatement(
                    body=[
                        builder.createReturnStatement(
                            argument=builder.createLiteral(
                                node.value
                            )
                        )
                    ]
                )
            )
        )
    )
})

br.walk()
```

## MBA linear equation random
```js
let d = (10 + 10) + 5 * 6 + 6 + 30 * 1337 - 10;
let dd = "lol"
```

Become
```js
let d = -(- -(-10 + -10) + -(5 * 6)) - -6 - -(30 * 1337) + -10;
let dd = "lol";
```
With
```js
let br = new BreakPointAST(code)

br.addNodeBreakPoint("BinaryExpression", function(ctx, node, builder, obfu) {
    ctx.replaceExpression(node, obfu.generate_mba(node))
})

br.walk()
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