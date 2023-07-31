import Token from './token.js'

class Lexer{
    
    constructor(source_code) {
        this.source = source_code;
        this.len = source_code.length;
        this.actual_char = source_code[0];
        this.pc = 0;

        this.lex_event = {
            '+': this.lex_plus,
            '-': this.lex_min
        }
    }

    lex_plus() {

        let token;

        if (this.peek_char() === '=') 
            token = new Token(Token.const.PLUSASS, '+=')
        else if(this.peek_char() == '+') 
            token = new Token(Token.const.INCR, '++')
        else 
            token = new Token(Token.const.PLUS, '+')
        

        return token;
    }

    lex_min() {
        
        let token;

        if (this.peek_char() === '=')
            token = new Token(Token.const.MINASS, '-=')
        else if (this.peek_char() === '-') 
            token = new Token(Token.const.DECR, '--')
        else
            token = new Token(Token.const.MIN, '-')
        
        return token;
    }

    dispatcher() {
        console.log("ok")
    }

    next_char() {
        this.pc++;
        if (this.pc < this.len) {
            this.actual_char = this.source[this.pc]
        } else {
            this.actual_char = 0x00;
        }
    }

    peek_char() {
        if (this.pc+1 < this.len) {
            return this.source[this.pc+1]
        } else {
            return 0x00;
        }
    }

    lex() {
        let tokens = []
        while (this.actual_char != 0x00) {
            tokens.push(this._lex())
            this.next_char()
        }

        return tokens
    }

    _lex() {

        let token = this.lex_event[this.actual_char]
        if (!token) {
            token = this.dispatcher()
        } else {
            token = token()
        }
        
        return token;
    }
}

export default Lexer;