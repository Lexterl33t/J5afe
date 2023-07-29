import BreakPointASTObfuscation from './BreakPointASTObfuscation';


export default class BreakPointASTObfuscationMBA extends BreakPointASTObfuscation {

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