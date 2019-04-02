const { MongoClient, ObjectID } = require('mongodb')

const dbName = 'mongo-crud'
const collName = 'books'

let client = null

function getClient () {
  return new MongoClient('mongodb://localhost', { useNewUrlParser: true })
}

module.exports = {
  findAll: _ => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .find({})
          .toArray()
      })
      .finally(_ => client.close())
  },
  findById: id => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .findOne({ _id: ObjectID(id) })
      })
      .finally(_ => client.close())
  },
  create: obj => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .insertOne(obj)
      })
      .finally(_ => client.close())
  },
  update: (id, replace) => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .findOneAndReplace({ _id: ObjectID(id) }, { ...replace }, { returnOriginal: false })
      })
      .finally(_ => client.close())
  },
  edit: (id, changes) => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { ...changes }}, { returnOriginal: false })
      })
      .finally(_ => client.close())
  },
  remove: id => {
    client = getClient()

    return client
      .connect()
      .then(_ => {
        let db = client.db(dbName)
        return db
          .collection(collName)
          .findOneAndDelete({ _id: ObjectID(id) })
      })
      .finally(_ => client.close())
  }
}