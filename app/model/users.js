import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema ({
    name: String,
    age: String,
    status: String,
    link: String,
})

const Users = mongoose.model('user', usersSchema);

export {Users};