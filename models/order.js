const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		meal: {
			type: String,
			required: true
		},
		vendor: {
			type: String,
			required: true
		},
		amount: Schema.Types.Number,
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
