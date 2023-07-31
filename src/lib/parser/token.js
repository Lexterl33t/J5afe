
class Token {

    static const = {
        LITERAL: 0,
        IDENTIFIER: 1,
        THIS: 2,
        LET: 3,
        CONST: 4,
        VAR: 5,
        FOR: 6,
        WHILE: 7,
        DO: 8,
        SWITCH: 9,
        FUNCTION: 10,
        CLASS: 11,
        IMPORT: 12,
        CONTINUE: 13,
        BREAK: 14,
        THROW: 15,
        RETURN: 16,
        NEW: 17,
        CASE: 18,
        DEFAULT: 19,
        PLUS: 20,
        MIN: 21,
        DIV: 22,
        MUL: 23,
        MOD: 47,
        INCR: 24,
        PLUSASS: 25,
        MINASS: 26,
        MULASS: 27,
        DIVASS: 28,
        AND: 29,
        OR: 30,
        NOT: 31,
        XOR: 32,
        LEFT_SHIFT: 33,
        RIGHT_SHIFT: 34,
        U_RIGHT_SHIFT: 35,
        U_LEFT_SHIFT: 36,
        NOT_OPERATOR: 37,
        EQ: 38,
        NEQ: 39,
        LESS: 40,
        GREATER: 41,
        LESSEQ: 42,
        GREATEREQ: 43,
        LOGICAL_AND: 44,
        LOGICAL_OR: 45,
        LOGICAL_NOT: 46,
        DECR: 48,
    }
   

    constructor(token, value) {
        this.token = token;
        this.value = value;
    }
}

export default Token;
