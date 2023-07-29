const acorn = require('acorn')


class BreakPointASTReplacement {

	constructor() {
		this.replacementList = {
			"Literal": ["Literal", "Identifier", "BinaryExpression"],
			"BinaryExpression": ["Literal", "Identifier"]
		}
	}

	getReplacementList() {
		if (!this.replacementList) throw new Error("Replacement list not initialised")

		return this.replacementList
	}
}


class BreakPointASTBuilder {

	constructor(ctx, node) {
		this.node = node;
		this.ctx = ctx
	}
	
	createLiteral(value) {
		if (!this.ctx) return false;

		if (!this.node) return false;
		
		let n = new acorn.Node(this.ctx)
		n.type = "Literal"
		n.start = this.node.start
		n.value = value
		n.raw = value.toString()
		return n
	}

	createIdentifier(name) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "Identifier"
		n.start = this.node.start
		n.name = name;

		return n
	}

	createBinaryExpression(op, left, right) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "BinaryExpression"
		n.start = this.node.start
		n.left = left;
		n.operator = op;
		n.right = right
		return n
	}
}


class BreakPointAST extends acorn.Parser {

	constructor(source_code) {
		if (!source_code) throw new Error("Unknow source code !")
		
		super({ecmaVersion: 6}, source_code)
		this.ast = 	this.parse()
		this.eventListener = {}
		this.breakpoint_replacement = new BreakPointASTReplacement().getReplacementList()
	}

	check_valid_replacement_expression(node, new_node) {
		for (let n of this.breakpoint_replacement[node.type]) {
			if (n === new_node.type)
				return true
		}

		return false;
	}


	replaceExpression(node, new_node) {
		if (node.constructor.name !== 'Node' && new_node.constructor.name !== 'Node') throw new Error("Node and new node must be Node")

		if(!this.check_valid_replacement_expression(node, new_node)) throw new Error(`${node.type} can't be replaced by ${new_node.type}`)

		Object.assign(node, new_node)

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
			case '^': return this._evaluate(node.left) ^ this._evaluate(node.right)
			}
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
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				} 

				for (let decl of node.declarations) {
					return this.depth(decl)
				}
				break
			case 'VariableDeclarator':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				} 
				this.depth(node.id)
				this.depth(node.init)
				break
			case 'IfStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				} 
				this.depth(node.test)
				this.depth(node.consequents)
				this.depth(node.alternate)
				break
			case 'BinaryExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				} else {
					this.depth(node.left)
					this.depth(node.right)
				}
				break
			case 'Literal':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				}
				return
			case 'ExpressionStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				}
				this.depth(node.expression)
				break
			case 'CallExpression':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				}
				this.depth(node.callee)
				for (let arg of node.arguments) {
					this.depth(arg)
				}
				break
			case 'FunctionDeclaration':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				}
				this.depth(node.id)
				for (let param of node.params) {
					this.depth(param)
				}
				this.depth(node.body)
				break
			case 'BlockStatement':
				if (this.eventListener[node.type]) {
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)))
				}
				for (let bd of node.body) {
					this.depth(bd)
				}
				break
			}
	}
}


module.exports = BreakPointAST
