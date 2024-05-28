const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const db=require("./config/db");
const { MongoClient,ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express?.json());
const client = new MongoClient(process.env.MongoUrl, {useNewUrIParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
client.connect(err => {
    const collection = client.db('test').collection('devices');
    console.log('connected');
    client.close();
})
// db()22
async function run() {
    try{
        await client.connect();
        const postCollection = client.db('database').collection('posts')
        const userCollecation = client.db('database').collection('users')

        app.get('/post', async(req,res)=>{
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        })
        app.get('/user', async(req,res)=>{
            const user = await userCollecation.find().toArray();
            res.send(user);
        })
        app.get('/loggedInUser', async(req,res)=>{
            const email = req.query.email;
            const user = await userCollecation.find({email: email}).toArray();
            res.send(user);
        })
        app.get('/userPost', async(req,res)=>{
            const email = req.query.email;
            const user = (await postCollection.find({email: email}).toArray()).reverse();
            res.send(post);
        })

        app.post('./post', async (req,res)=>{
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })
        app.post('./register', async (req,res)=>{
            const user = req.body;
            const result = await userCollecation.insertOne(user);
            res.send(result);
        })
        
        app.patch('/userUpdates/:email', async(req,res) => {
            const filter = req.params;
            const profile = req._construct.body;
            const options = {upsert:true};
            const updateDoc = { $set: profile};
            const result = await userCollecation(filter,updateDoc,options)
            res.sendStatus(result);
        })
    }catch (error){
        console.log(error);
    }
}run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello from Twitter!')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})