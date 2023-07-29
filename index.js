const BreakPointAST = require('./src/breakpointast.js')
const {generate} = require("astring");


function generate_string(size) {
    return (Math.random() + 1).toString(36).substring(size);
}


let code = `
    let d = 10 * 10 + (1 ^ 2) + 2000 * 300 - (2 * 6);
    let dd = "lol"
`

let br = new BreakPointAST(code)

br.addNodeBreakPoint("Literal", function(ctx, node, builder) {
    
    if (typeof node.value !== 'number') return;

    ctx.replaceExpression(node, builder.createBinaryExpression(
		'+', builder.createLiteral(node.value), builder.createLiteral(1337)
		)
	)


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
                            argument=builder.createBinaryExpression(
                                node.operator,
                                node.left,
                                node.right
                            )
                        )
                    ]
                )
            )
        )
    )
    
})

br.walk()



let source_code = generate(br.ast, {
    comments: true,
})

console.log(source_code)


//console.log(br.ast.body[0].declarations[0])
