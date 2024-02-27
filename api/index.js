const express = require('express');
const { getTokens } = require('./java/converter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int x =10;

    }
}`;

app.get('/', (req,res) => {
    res.json({
        message: "🚀Welcome to code converter service🚀"
    })
})

app.get('/convert', (req,res) => {
    const tokens = getTokens(javaCode);
    res.json({
        tokens,
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
