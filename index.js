import BreakPointAST from './src/lib/breakpoint/BreakPointAST.js'
import Parser from './src/lib/parser/parser.js'

let source_code = `

let d = 10
let k = 20

let c = 30

`
let parser = new Parser(source_code)
/*
export {
    BreakPointAST as default
}*/

//console.log(br.ast.body[0].declarations[0])
