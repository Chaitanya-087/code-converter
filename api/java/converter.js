const JavaTokenizer = require('./tokenizer');
// const Parser = require('./parser');

const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int x =10;

    }
}`;

function getTokens(javaCode) {
    const tokenizer = new JavaTokenizer(javaCode);
    const tokens = tokenizer.tokenize();
    return tokens;
}

console.log(getTokens(javaCode));

module.exports = {
    getTokens
};