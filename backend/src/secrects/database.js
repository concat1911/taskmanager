//SETUP
const {MongoClient, ObjectID} = require('mongodb');
export const connectURL = 'mongodb+srv://linh:onlyme2511@cluster-eb3gs.mongodb.net/test?retryWrites=true&w=majority';
const databaseName = 'task-manager';

const id = new ObjectID()
console.log(id)
//id.getTimeStamp ...

MongoClient.connect(connectURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err){
        return console.log(err)
    }
    console.log('Database Connected')
    const db = client.db(databaseName)
    // db.collection('user').insertOne({
    //     name: 'Linh',
    //     age: 24
    // }).then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.log(err)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Aha',
    //         age: 33
    //     },{

    //     }
    // ])
})