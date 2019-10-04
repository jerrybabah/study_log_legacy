import mongoose from 'mongoose';

const { Schema } = mongoose;

const noteSchema = new Schema({
  guid: String,
  title: String,
  tags: [String],
  date: Date,
});

export default mongoose.model('note', noteSchema);
