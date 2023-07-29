const acorn = require('acorn')



class BreakPointASTNode extends acorn.Node {
	
}	


class BreakPointAST extends acorn.Parser {

	constructor(source_code) {
		super({ecmaVersion: 6}, source_code)
		this.ast = 	this.parse()
		this.eventListener = {}
	}


	addNodeBreakPoint(typeName, callback) {
		if (typeof callback !== "function")
			throw new Error("Second parameter must be callback")

		this.eventListener[typeName] = callback
	}

	walk() {
		for (let node of this.ast.body) {
			this.depth(node)
		}
	}

	depth(node) {
		if (!node)
			return;
			
		switch(node.type) {
			case 'VariableDeclaration':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				} 

				for (let decl of node.declarations) {
					return this.depth(decl)
				}
				break
			case 'VariableDeclarator':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				} 
				this.depth(node.id)
				this.depth(node.init)
				break
			case 'IfStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				} 
				this.depth(node.test)
				this.depth(node.consequents)
				this.depth(node.alternate)
				break
			case 'BinaryExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				}
				this.depth(node.left)
				this.depth(node.right)
				break
			case 'Literal':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				}
				return
			case 'ExpressionStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				}
				this.depth(node.expression)
				break
			case 'CallExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](node)
				}
				this.depth(node.callee)
				for (let arg of node.arguments) {
					this.depth(arg)
				}
				break
			}
	}
}

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
