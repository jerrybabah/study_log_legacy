import mongoose from 'mongoose';
import moment from 'moment-timezone';


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


studySchema.statics.rebuild = function rebuild(dailyStudyList) {
  this.deleteMany({}, (err) => console.log(err));
  this.insertMany(dailyStudyList, (err) => console.log(err));
};


studySchema.statics.findByYear = function findByYear(year) {
  if (year === undefined) {
    year = moment().tz('Asia/Seoul').format('YYYY');
  }

  const firstDay = `${year}-01-01`;
  const lastDay = `${year}-12-31`;

  const query = this.find()
    .where('date').gte(firstDay).lte(lastDay);

  return query;
};

export default mongoose.model('study', studySchema);
