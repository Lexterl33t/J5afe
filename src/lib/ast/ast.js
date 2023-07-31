class Node {
    
    constructor(pos, end) {
        this.pos = pos;
        this.end = end;
    }
}

class Program extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "Program"
    }

    
    new(body = []) {
        this.body = body
    }
}

class BinaryExpression extends Node {
    
    constructor(pos, end) {
        super(pos, end);
        this.type = "BinaryExpression"
    }

    new(operator, left = null, right = null) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
}

class Literal extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "Literal"
    }

    new(value) {
        this.value = value;
        this.raw = value.toString()
    }
}

class Identifier extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "Identifier"
    }

    new(name) {
        this.name = name;
    }
}

class VariableDeclaration extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "VariableDeclaration"
    }

    new(declarations = [], kind) {
        this.declarations = declarations
        this.kind = kind
    }
}

class VariableDeclarator extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "VariableDeclarator"
    }

    new(id, init) {
        this.id = id;
        this.init = init;
    }
}

class FunctionDeclaration extends Node {

    constructor(pos, end) {
        super(pos, end);
        this.type = "FunctionDeclaration"
    }

    new(id, expression, generator, async, params, body = []) {
        this.id = id;
        this.expression = expression;
        this.generator = generator;
        this.async = async;
        this.params = params;
        this.body = body;
    }
}

class BlockStatement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "BlockStatement"
    }

    new(body = []) {
        this.body = body
    }
}

class ArrowFunctionExpression extends Node {

    constructor() {
        super(pos, end);
        this.type = "ArrowFunctionExpression"
    }


    new(expression, generator, async, params = [], body = []) {
        this.expression = expression;
        this.generator = generator;
        this.async = async;
        this.params = params;
        this.body = body;
    }
}

class ArrayExpression extends Node {

    constructor() {
        super(pos, end);
        this.type = "ArrayExpression"
    }
    
    new(elements = []) {
        this.elements = elements;
    }
}

class ClassDeclaration extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "ClassDeclaration"
    }
    
    new(id, superClass, body = []) {
        this.id = id;
        this.superClass = superClass;
        this.body = body;
    }
}

class ExpressionStatement extends Node {

    constructor() {
        super(pos, end);
        this.type = "ExpressionStatement"
    }

    new(expression) {
        this.expression = expression;
    }
}

class MemberExpression extends Node {

    constructor() {
        super(pos, end);
        this.type = "MemberExpression"
    }

    new(object, property, computed, optional) {
        this.object = object;
        this.property = property;
        this.computed = computed;
        this.optional = optional;
    }
}

class ObjectExpression extends Node {

    constructor() {
        super(pos, end);
        this.type = "ObjectExpression"
    }

    new(properties) {
        this.properties = properties;
    }
}

class TryStatement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "TryStatement"
    }
    
    new(block, handler, finalizer) {
        this.block = block;
        this.handler = handler;
        this.finalizer = finalizer;
    }
}

class IfStatement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "IfStatement"
    }
    
    new(test, consequent) {
        this.test = test;
        this.consequent = consequent;
    }
}

class CatchClause extends Node {

    constructor() {
        super(pos, end);
        this.type = "CatchClause"
    }

    new(params, body = []) {
        this.params = params;
        this.body = body;
    }
}

class ForStatement extends Node {

    constructor() {
        super(pos, end);
        this.type = "ForStatement"
    }

    new(init, test, update, body = []) {
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
    }
}

class ForInStatement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "ForInStatement"
    }

    new(left = null, right = null, body = []) {
        this.left = left;
        this.right = right;
        this.body = body;
    }
}

class ForOfStatement extends Node {

    constructor() {
        super(pos, end);
        this.type = "ForOfStatement"
    }

    new(await_pr, left = null, right = null, body = []) {
        this.await = await_pr;
        this.left = left;
        this.right = right;
        this.body = body;
    }
}

class WhileStatement extends Node {

    constructor() {
        super(pos, end);
        this.type = "WhileStatement"
    }

    new(test, body) {
        this.test = test;
        this.body = body;
    }
}

class DoWhileStatement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "DoWhileStatement"
    }

    new(body, test) {
        this.body = body;
        this.test = test;
    }
}

class UnaryExpression extends Node {

    constructor() {
        super(pos, end);
        this.type = "UnaryExpression"
    }

    new(operator, prefix, argument) {
        this.operator = operator;
        this.prefix = prefix;
        this.argument = argument;
    }
}

class TemplateElement extends Node {
    
    constructor() {
        super(pos, end);
        this.type = "TemplateElement"
    }

    new(value, tail) {
        this.value = value;
        this.tail = tail;
    }
}

class CallExpression extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "CallExpression"
    }

    new(callee, args, optional) {
        this.callee = callee;
        this.arguments = args;
        this.optional = optional;
    }
}

class UpdateExpression extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "UpdateExpression"
    }

    new(operator, prefix, argument) {
        this.operator = operator;
        this.prefix = prefix;
        this.argument = argument;
    }
}

class ReturnStatement extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "ReturnStatement"
    }

    new(argument) {
        this.argument = argument;
    }
}

class BreakStatement extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "BreakStatement"
    }
}

class ThrowStatement extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "BreakStatement"
    }

    new(argument) {
        this.argument = argument;
    }
}

class ContinueStatement extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "ContinueStatement"
    }
}

class AssignmentExpression extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "AssignmentExpression"
    }

    new(operator, left = null, right = null) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
}

class ExportNamedDeclaration extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "ExportNamedDeclaration"
    }

    new(declarations, specifiers) {
        this.declarations = declarations;
        this.specifiers = specifiers;
    }
}

class ThisExpression extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "ThisExpression"
    }
}

class ImportDeclaration extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "ImportDeclaration"
    }

    new(specifiers, source) {
        this.specifiers = specifiers;
        this.source = source;
    }
}

class ImportDefaultSpecifier extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "ImportDefaultSpecifier"
    }

    new(local) {
        this.local = local;
    }
}

class NewExpression extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "NewExpression"
    }

    new(callee, args) {
        this.callee = callee;
        this.arguments = args;
    }
}

class DebuggerStatement extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "DebuggerStatement"
    }

}

class SwitchStatement extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "SwitchStatement"
    }

    new(discriminant, cases) {
        this.discriminant = discriminant;
        this.cases = cases;
    }
}

class SwitchCase extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "SwitchCase"
    }

    new(consequent, test) {
        this.consequent = consequent;
        this.test = test;
    }
}

class AwaitExpression extends Node {
    
    constructor(pos, end) {
        super(pos, end)
        this.type = "AwaitExpression"
    }
    
    new(argument) {
        this.argument = argument;
    }
}

class SpreadElement extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "SpreadElement"
    }

    new(argument) {
        this.argument = argument;
    }
}

class ConditionalExpression extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "ConditionalExpression"
    }

    new(test, consequent, alternate) {
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
}

class LogicalExpression extends Node {

    constructor(pos, end) {
        super(pos, end)
        this.type = "LogicalExpression"
    }

    new(left = null, operator, right = null) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}