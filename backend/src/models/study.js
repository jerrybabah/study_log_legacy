import mongoose from 'mongoose';

const { Schema } = mongoose;

const studySchema = new Schema({
  date: String,
  count: Number,
  contents: [{
    guid: String,
    title: String,
    date: Number,
    tagNames: [String],
    status: String,
  }],
});

export default mongoose.model('note', studySchema);
