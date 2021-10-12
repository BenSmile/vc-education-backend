const mongoose = require('mongoose');
const gradeSchema = mongoose.Schema({
	title:  { type: String},
	publishAt:  { type: Date, default: Date.now()}
});

module.exports = mongoose.model('Grade', gradeSchema);