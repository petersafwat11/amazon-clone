import mongoose from "mongoose";

const connections = {};
async function connect(){
if (connections.isconnected){
    console.log('already connected');
    return ;
}
if (mongoose.connections>0){
    connections.isconnected=mongoose.connections[0].readyState;
    if(connections.isconnected===1){
        console.log('use the connection from previos connections');
        return ;
    }
    await mongoose.disconnect();
}
const db = await mongoose.connect(process.env.MONGODB_URI);
console.log('new connection');
connections.isconnected= db.connections[0].readyState;
}
async function disconnect(){
    if (connections.isconnected){
        if (process.env.NODE_ENV==='production'){
            await mongoose.disconnect();
            connections.isconnected= false;
        }
    }
}
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}
const db = { connect, disconnect, convertDocToObj };
export default db;