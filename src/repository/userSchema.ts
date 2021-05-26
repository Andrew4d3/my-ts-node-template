// This is an example on how to use mongoose schemas, delete this once you understand how it works
import DbConnection from '../lib/db';

const { Schema, model } = DbConnection.getHandler();

export const userSchema = new Schema({
  name: String,
});

export const userModel = model('users', userSchema);
