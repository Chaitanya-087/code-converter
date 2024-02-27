class JavaTokenizer {
    constructor(input) {
        this.input = input;
        this.currentIndex = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.currentIndex < this.input.length) {
            const char = this.input[this.currentIndex];
            if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                // Ignore whitespace
                this.currentIndex++;
            } else if (char.match(/[a-zA-Z$_]/)) {
                // Identifier or keyword
                const token = this.readIdentifierOrKeyword();
                this.tokens.push(token);
            } else if (char.match(/[0-9]/)) {
                // Number literal
                const token = this.readNumberLiteral();
                this.tokens.push(token);
            } else if (char === '"') {
                // String literal
                const token = this.readStringLiteral();
                this.tokens.push(token);
            } else if (char === '/' && this.input[this.currentIndex + 1] === '/') {
                // Single-line comment
                this.skipSingleLineComment();
            } else if (char === '/' && this.input[this.currentIndex + 1] === '*') {
                // Multi-line comment
                this.skipMultiLineComment();
            } else if (char.match(/[+\-*/%&|!(){}[\],;.:=]/)) {
                // Punctuation
                const token = this.readPunctuation();
                this.tokens.push(token);
            } else {
                // Invalid character
                throw new SyntaxError(`Unexpected character: ${char}`);
            }
        }
        return this.tokens;
    }

    readIdentifierOrKeyword() {
        let identifier = '';
        while (this.currentIndex < this.input.length && this.input[this.currentIndex].match(/[a-zA-Z0-9$_]/)) {
            identifier += this.input[this.currentIndex];
            this.currentIndex++;
        }
        return ['IDENTIFIER', identifier];
    }

    readNumberLiteral() {
        let number = '';
        while (this.currentIndex < this.input.length && this.input[this.currentIndex].match(/[0-9.]/)) {
            number += this.input[this.currentIndex];
            this.currentIndex++;
        }
        return ['NUMBER', parseFloat(number)];
    }

    readStringLiteral() {
        let string = '';
        this.currentIndex++; // Skip the opening double quote
        while (this.currentIndex < this.input.length && this.input[this.currentIndex] !== '"') {
            string += this.input[this.currentIndex];
            this.currentIndex++;
        }
        if (this.input[this.currentIndex] !== '"') {
            throw new SyntaxError('Unterminated string literal');
        }
        this.currentIndex++; // Skip the closing double quote
        return ['STRING', string];
    }

    skipSingleLineComment() {
        while (this.currentIndex < this.input.length && this.input[this.currentIndex] !== '\n') {
            this.currentIndex++;
        }
        if (this.input[this.currentIndex] === '\n') {
            this.currentIndex++; // Skip the newline character
        }
    }

    skipMultiLineComment() {
        this.currentIndex += 2; // Skip the opening '/*'
        while (this.currentIndex < this.input.length && !(this.input[this.currentIndex] === '*' && this.input[this.currentIndex + 1] === '/')) {
            this.currentIndex++;
        }
        if (this.currentIndex >= this.input.length) {
            throw new SyntaxError('Unterminated multi-line comment');
        }
        this.currentIndex += 2; // Skip the closing '*/'
    }

    readPunctuation() {
        const punctuation = this.input[this.currentIndex];
        this.currentIndex++;
        return ['PUNCTUATION', punctuation];
    }
}

// function generateJavaScript(ast) {
//     let jsCode = "";

//     function traverse(node) {
//         switch (node.type) {
//             case "Program":
//                 for (const child of node.children) {
//                     traverse(child);
//                 }
//                 break;
//             case "ClassDeclaration":
//                 // Convert class declaration to JavaScript class syntax
//                 jsCode += `class ${node.value} {\n`;
//                 for (const child of node.children) {
//                     traverse(child);
//                 }
//                 jsCode += `}\n`;
//                 break;
//             case "MethodDeclaration":
//                 // Convert method declaration to JavaScript method syntax
//                 jsCode += `    static ${node.value}() {\n`;
//                 for (const child of node.children) {
//                     traverse(child);
//                 }
//                 jsCode += `    }\n`;
//                 break;
//             default:
//                 // Handle other node types if needed
//                 break;
//         }
//     }

//     traverse(ast);
//     return jsCode;
// }

/**
 * expected conversion
 * class HelloWorld {
        static main(args) {
            console.log("Hello, World!");
            let x = 10;
        }
    }
    HelloWorld.main([]);
 */

module.exports = JavaTokenizer;