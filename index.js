const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.eus6std.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('payment_gateway').collection('products');

app.get('/product', async (req, res) =>{
    const query = {};
    const cursor = productsCollection.find(query);
    const products = await cursor.toArray();
    res.send(products);
})

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from payment gateway')
})

app.listen(port, () => {
    console.log(`Payment gateway App listening on port ${port}`);
})