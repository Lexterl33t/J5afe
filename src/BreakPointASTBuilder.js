import * as acorn from 'acorn'

class BreakPointASTBuilder {

	constructor(ctx, node) {
		this.node = node;
		this.ctx = ctx
	}

	createUnaryExpression(op, prefix=true, argument) {
		if (!this.ctx) return false;

		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "UnaryExpression"
		n.start = this.node.start
		n.operator = op
		n.prefix = prefix
		n.argument = argument
		return n
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

	createVariableDeclaration(kind, declarations) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "VariableDeclaration"
		n.start = this.node.start
		n.declarations = declarations
		n.kind = kind

		return n
	}

	createVariableDeclarator(id, init) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "VariableDeclarator"
		n.start = this.node.start
		n.id = id
		n.init = init

		return n
	}

	createExpressionStatement(expression) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "ExpressionStatement"
		n.start = this.node.start
		n.expression = expression

		return n
	}
	

	createAssignmentExpression(op, left, right) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "AssignmentExpression"
		n.start = this.node.start
		n.left = left
		n.right = right
		n.operator = op

		return n
	}

	createFunctionDeclaration(id, expression=false, generator=false, async=false, params=[], body) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		if (body.type !== 'BlockStatement') throw new Error("Body must be BlockStatement")
		
		let n = new acorn.Node(this.ctx)

		n.type = "FunctionDeclaration"
		n.start = this.node.start
		n.id = id
		n.expression = expression
		n.async = async
		n.params = params
		n.generator = generator
		n.body = body

		return n
	}

	createBlockStatement(body = []) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "BlockStatement"
		n.start = this.node.start
		n.body = body
		return n
	}

	createReturnStatement(argument) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "ReturnStatement"
		n.start = this.node.start
		n.argument = argument
		return n
	}

	createCallExpression(callee, args = [], optional=false) {
		if (!this.ctx) return false;
		if (!this.node) return false;

		let n = new acorn.Node(this.ctx)

		n.type = "CallExpression"
		n.start = this.node.start
		n.optional = optional
		n.callee = callee
		n.arguments = args
		return n;
	}

	createFunctionExpression(id, expression=false, generator=false, async=false, params=[], body) {
		if (!this.ctx) return false;
		if (!this.node) return false;


		if (body.type !== 'BlockStatement') throw new Error("Body must be BlockStatement")
		
		let n = new acorn.Node(this.ctx)

		n.type = "FunctionExpression"
		n.start = this.node.start
		n.id = id
		n.expression = expression
		n.async = async
		n.params = params
		n.generator = generator
		n.body = body

		return n;
	}
}


class BreakPointASTObfuscation extends BreakPointASTBuilder {
	constructor(ctx, node) {
		super(ctx, node)
	}
}

class BreakPointASTObfuscationMBA extends BreakPointASTObfuscation {

	constructor(ctx, node) {
		super(ctx, node)
	}

	generate_mba(node) {
		//if (node.type !== 'BinaryExpression') throw new Error("Node must be binary expression")

		return this._generate_mba(node)
	}
	
	_generate_mba(node) {
		
		if (!node) return;

		let choice;
		switch (node.type) {
		case 'BinaryExpression':
			switch(node.operator) {
			case '+':
				choice = Math.floor(Math.random() * 3)
				switch (choice) {
				case 0:
					return this.addition_mba1(node)
				case 1:
					return this.addition_mba2(node)
				case 2:
					return this.addition_mba3(node)
				}
			case '-':
				choice = Math.floor(Math.random() * 2)
				switch (choice) {
				case 0:
					return this.substract_mba1(node)
				case 1:
					return this.substract_mba2(node)
				}
			}
		case 'Literal':
			return node
		case 'UnaryExpression':
			return node
		case 'Identifier':
			return node
		}
	} 

	addition_mba1(node) {
		return super.createBinaryExpression(
			'-',
			this._generate_mba(node.left),
			super.createUnaryExpression(
				'-',
				true,
				this._generate_mba(node.right)
			)
		)
	}

	addition_mba2(node) {

		return super.createUnaryExpression(
			'-',
			true,
			super.createBinaryExpression(
				'+',
				super.createUnaryExpression(
					'-',
					true,
					this._generate_mba(node.left)
				),
				super.createUnaryExpression(
					'-',
					true,
					this._generate_mba(node.right)
				)
			)
		)
	}

	addition_mba3(node) {
		let rand_num = Math.floor(Math.random() * 999999)
		return super.createBinaryExpression(
			'-',
			super.createBinaryExpression(
				'+',
				super.createBinaryExpression(
					'+',
					this._generate_mba(node.left),
					super.createLiteral(
						rand_num
					)
				),
				this._generate_mba(node.right)
			),
			super.createLiteral(
				rand_num
			)
		)
	}

	substract_mba1(node) {
		return super.createBinaryExpression(
			'+',
			this._generate_mba(node.left),
			super.createUnaryExpression(
				'-',
				true,
				this._generate_mba(node.right)
			)
		)
	}

	substract_mba2(node) {
		let rand_num = Math.floor(Math.random() * 999999)

		return super.createBinaryExpression(
			'-',
			super.createBinaryExpression(
				'-',
				super.createBinaryExpression(
					'+',
					this._generate_mba(node.left),
					super.createLiteral(
						rand_num
					)
				),
				this._generate_mba(node.right)
			),
			super.createLiteral(
				rand_num
			)
		)
	}
}

class BreakPointASTReplacement {

	constructor() {
		this.replacementList = {
			"Literal": [
				"Literal", "Identifier", "BinaryExpression", "ExpressionStatement",
				"CallExpression"
			],
			"BinaryExpression": [
				"Literal", "Identifier", "CallExpression", "BinaryExpression",
				"UnaryExpression"
			],
			"UnaryExpression": [
				"BinaryExpression"
			]
		}
	}

	getReplacementList() {
		if (!this.replacementList) throw new Error("Replacement list not initialised")

		return this.replacementList
	}
}


export default class BreakPointAST extends acorn.Parser {

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
					this.eventListener[node.type](this, node, (new BreakPointASTBuilder(this, node)), (new BreakPointASTObfuscationMBA(this, node)))
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