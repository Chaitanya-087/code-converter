class ASTNode {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
        this.children = [];
        this.parent = null;
    }
}

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.currentToken = this.tokens[0];
        this.currentIndex = 0;
        this.root = new ASTNode('Program');
    }

    parse() {
        this.parseProgram();
    }

    advance() {
        if (this.currentIndex < this.tokens.length - 1) {
            this.currentIndex++;
            this.currentToken = this.tokens[this.currentIndex];
        }
    }

    parseProgram() {
        let currNode = this.root;
        let stack = []; //to track the block scope
        while (this.currentIndex < this.tokens.length) {
            if (this.currentToken[1] === '{') {
                stack.push(currNode);
                this.advance();
                continue;
            }
            
            this.currentIndex++;
            
        }
    }

    parseClassDeclaration() {
        //TODO: implement
    }
}

module.exports = Parser;