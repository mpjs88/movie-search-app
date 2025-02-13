import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import { mongo_username } from "./config.js"
import { mongo_password } from "./config.js"

const MongoClient = mongodb.MongoClient
// const mongo_username = process.env['mongo_username']
// const mongo_password = process.env['mongo_password']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.hpvf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })