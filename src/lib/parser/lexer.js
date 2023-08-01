import Token from './token.js'

class Lexer{
    
    constructor(source_code) {
        this.source = source_code;
        this.len = source_code.length;
        this.actual_char = source_code[0];
        this.pc = 0;

        this.keyword = {
            'for': Token.const.FOR,
            'if': Token.const.IF,
            'else': Token.const.ELSE,
            'else if': Token.const.ELSEIF,
            'switch': Token.const.SWITCH,
            'case:': Token.const.CASE,
            'let': Token.const.LET,
            'var': Token.const.VAR,
            'const': Token.const.CONST,
            'function': Token.const.FUNCTION,
            'break': Token.const.BREAK,
            'continue': Token.const.CONTINUE,
            'try': Token.const.TRY,
            'catch': Token.const.CATCH,
            'while': Token.const.WHILE,
            'in': Token.const.IN,
            'of': Token.const.OF,
            'async': Token.const.ASYNC,
            'await': Token.const.AWAIT,
        }
    }

    containsWhitespace(str) {
        return /\s/.test(str);
    }

    remove_space() {
        
        if (this.actual_char !== ' ' || this.actual_char !== '\r' || this.actual_char !== '\t')
            return

        this.next_char()
        this.remove_space()
        
    }

    is_numeric(str){
        return /^\d+$/.test(str);
    }

    is_alphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    lex_plus() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.PLUSASS, '+=')
            this.next_char()
        } else if(this.peek_char() == '+') {
            token = new Token(Token.const.INCR, '++')
            this.next_char()
        } else {
            token = new Token(Token.const.PLUS, '+')
        }

        return token;
    }

    lex_min() {
        
        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.MINASS, '-=')
            this.next_char()
        } else if(this.peek_char() == '-') {
            token = new Token(Token.const.DECR, '--')
            this.next_char()
        } else {
            token = new Token(Token.const.MIN, '-')
        }

        return token;
    }

    lex_mul() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.MULASS, '*=')
            this.next_char()
        } else if(this.peek_char() == '*') {
            token = new Token(Token.const.POWER, '**')
            this.next_char()
        } else {
            token = new Token(Token.const.MUL, '*')
        }

        return token;
    }

    lex_div() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.DIVASS, '/=')
            this.next_char()
        } else {
            token = new Token(Token.const.DIV, '/')
        }

        return token;
    }

    lex_xor() {
        
        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.XORASS, '^=')
            this.next_char()
        } else {
            token = new Token(Token.const.XOR, '^')
        }

        return token;
    }

    lex_or() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.ORASS, '|=')
            this.next_char()
        } else if (this.peek_char() === '|') {
            token = new Token(Token.const.LOGICAL_OR, '||')
            this.next_char()
        } else {
            token = new Token(Token.const.OR, '|')
        }

        return token;
    }

    lex_and() {

        let token;


        if (this.peek_char() === '=') {
            token = new Token(Token.const.ANDASS)
            this.next_char()
        } else if (this.peek_char() === '&') {
            token = new Token(Token.const.LOGICAL_AND, '&&')
            this.next_char()
        } else {
            token = new Token(Token.const.AND, '&')
        }

        return token;
    }

    lex_less() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.LESSEQ, '<=')
            this.next_char()
        } else if (this.peek_char() === '<') {
            token = new Token(Token.const.LEFT_SHIFT, '<<')
            this.next_char()
        } else if (this.peek_char() === '<' && this.source[this.pc+2] === '<') {
            token = new Token(Token.const.U_LEFT_SHIFT, '<<<')
            this.next_char()
            this.next_char()
        } else {
            token = new Token(Token.const.LESS, '<')
        }   

        return token;
    }

    lex_greather() {

        let token;

        if (this.peek_char() === '=') {
            token = new Token(Token.const.GREATEREQ, '>=')
            this.next_char()
        } else if (this.peek_char() === '>') {
            token = new Token(Token.const.RIGHT_SHIFT, '>>')
            this.next_char()
        } else if (this.peek_char() === '>' && this.source[this.pc+2] === '>') {
            token = new Token(Token.const.U_RIGHT_SHIFT, '>>>')
            this.next_char()
            this.next_char()
        } else {
            token = new Token(Token.const.GREATER, '>')
        }   

        return token;
    }

    lex_string_literal(str_delim) {

        let token;

        let old_tmp = this.pc;

        this.next_char()
        while (this.actual_char !== str_delim) {
            this.next_char()
        }
        
        token = new Token(Token.const.LITERAL, this.source.substring(old_tmp+1, this.pc))

        return token
    }

    lex_number_literal() {

        let token;


        let old_tmp = this.pc;
        while (this.is_numeric(this.actual_char)) {
            this.next_char()
        }

        token = new Token(Token.const.LITERAL, this.source.substring(old_tmp, this.pc))
        return token;
    }

    lex_language_keyword() {
        
        let token;

        let old_tmp = this.pc
        console.log(this.actual_char)
        while (this.is_alphanumeric(this.actual_char))
            this.next_char()
        
        console.log(this.actual_char)
        let keyword = this.source.substring(old_tmp, this.pc)
        console.log(keyword)
        if (this.keyword[keyword]) {
            token = new Token(this.keyword[keyword], keyword)
        } else {
            return false;
        }
    }

    dispatcher() {
        console.log("ok")
    }

    next_char() {
        this.pc++;
        if (this.pc <= this.len) {
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
        while (this.actual_char !== 0x00) {
            tokens.push(this._lex())
            this.next_char()
        }

        return tokens
    }

    _lex() {

        this.remove_space() 

        let token;

        console.log(this.actual_char)

        switch(this.actual_char) {
        case '+':
            token = this.lex_plus()
            break;
        case '-':
            token = this.lex_min()
            break
        case '*':
            token = this.lex_mul()
            break
        case '/':
            token = this.lex_div()
            break;
        case '^':
            token = this.lex_xor()
            break
        case '&':
            token = this.lex_and()
            break
        case '|':
            token = this.lex_or()
            break
        case '<':
            token = this.lex_less()
            break;
        case '>':
            token = this.lex_greather()
            break
        case '"':
        case "'":
            token = this.lex_string_literal(this.actual_char)
            break
        default:
            
            if (this.is_numeric(this.actual_char)) {
                token = this.lex_number_literal()
            } else if (this.is_alphanumeric(this.actual_char)) {
                console.log(this.actual_char)
                token = this.lex_language_keyword()
            }
            break
            
        }
        
        return token;
    }
}

export default Lexer;