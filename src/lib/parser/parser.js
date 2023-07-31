import Lexer from './lexer.js'

class Parser extends Lexer{
    
    constructor(source_code) {
        super(source_code)
        let lex = this.lex()
        console.log(lex)
    }
}

export default Parser;