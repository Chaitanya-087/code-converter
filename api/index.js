require('dotenv').config();
const express = require('express');
const { getTokens } = require('./java/converter');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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

const aiCodeConverter = async (fromName, toName, code) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a code converter bot. You can convert code from one language to another."
            },
            {
                role: "system",
                content: "respond with the converted code only.don't include any other information in the response. The response should be code alone and not include name of the language."
            },
            {
                role: "user",
                content: `Convert the following ${fromName} code to ${toName}`
            },
            {
                role: "system",
                content: code
            }
        ]
    });
    return completion.choices[0].message.content;
}

app.get('/convert/from/:fromName/to/:toName', async (req,res) => {
    const toName = req.params.toName;
    const fromName = req.params.fromName;
    const code = req.body.code;
    const isAi = req.query.ai;
    
    const convertedCode = isAi ? await aiCodeConverter(fromName, toName, javaCode) : getTokens(javaCode);

    res.status(200).json({
        code: convertedCode
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
