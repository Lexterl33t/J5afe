export default class BreakPointASTReplacement {

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

