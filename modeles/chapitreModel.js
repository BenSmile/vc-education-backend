const mongoose = require('mongoose');
const chapitreSchema = mongoose.Schema({
	coursID:{type: mongoose.Schema.Types.ObjectId, ref:'Cours'},
	title:  { type: String},
	shortDescription:  { type: String},
	description:  { type: String},
	status:  { type: Boolean, default:0},
	image:  { type: String},
	publishAt:  { type: Date, default: Date.now()}
});

module.exports = mongoose.model('Chapitre', chapitreSchema);