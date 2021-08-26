// line 1-15 is about database connections -- mongo admin user password: ?????
const { MongoClient } = require('mongodb');
async function main(){
    //in line 5, mongo gives uri like username:<password>. You have to delete > and < and write your real password so that you don't take an authentication fail.
    const uri = ""; //You have to get a uri from MongoDB atlas and put it in this line.
    const client = new MongoClient(uri);
    
    try{
        await client.connect();
        await listDatabases(client);    
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);

// line 19-28 is about cluster connection
// this part prints a list of your databases.
async function listDatabases(client){
    
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}
