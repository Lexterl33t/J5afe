const acorn = require('acorn')




class BreakPointAST extends acorn.Parser {

	constructor(source_code) {
		if (!source_code) throw new Error("Unknow source code !")
		
		super({ecmaVersion: 6}, source_code)
		this.ast = 	this.parse()
		this.eventListener = {}
	}


	evaluate(node) {
		if (node.type !== 'BinaryExpression') throw new Error("Only binary expression can be evaluate")

		return this._evaluate(node)
	}

	_evaluate(node) {
		if (!node)
			return 0;

		switch (node.type) {
		case 'Literal':
			return node.value
		case 'BinaryExpression':
			switch(node.operator) {
			case '+': return this._evaluate(node.left) + this._evaluate(node.right)
			case '-': return this._evaluate(node.left) - this._evaluate(node.right)
			case '*': return this._evaluate(node.left) * this._evaluate(node.right)
			case '/': return this._evaluate(node.left) / this._evaluate(node.right)
			case '%': return this._evaluate(node.left) % this._evaluate(node.right)
			case '>>': return this._evaluate(node.left) >> this._evaluate(node.right)
			case '<<': return this._evaluate(node.left) << this._evaluate(node.right)
			case '&': return this._evaluate(node.left) & this._evaluate(node.right)
			case '|': return this._evaluate(node.left) | this._evaluate(node.right)
			case '^': return this._evaluate(node.right) ^ this._evaluate(node.right)
			}
		case 'Identifier':
			return 0;
		}
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
					this.eventListener[node.type](this, node)
				} 

				for (let decl of node.declarations) {
					return this.depth(decl)
				}
				break
			case 'VariableDeclarator':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				} 
				this.depth(node.id)
				this.depth(node.init)
				break
			case 'IfStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				} 
				this.depth(node.test)
				this.depth(node.consequents)
				this.depth(node.alternate)
				break
			case 'BinaryExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				this.depth(node.left)
				this.depth(node.right)
				break
			case 'Literal':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				return
			case 'ExpressionStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				this.depth(node.expression)
				break
			case 'CallExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				this.depth(node.callee)
				for (let arg of node.arguments) {
					this.depth(arg)
				}
				break
			case 'FunctionDeclaration':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				this.depth(node.id)
				for (let param of node.params) {
					this.depth(param)
				}
				this.depth(node.body)
				break
			case 'BlockStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node)
				}
				for (let bd of node.body) {
					this.depth(bd)
				}
				break
			}
	}
}


module.exports = BreakPointAST
