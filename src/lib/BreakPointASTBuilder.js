import * as acorn from 'acorn'

export default class BreakPointASTBuilder {

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