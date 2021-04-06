const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

pizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// Create model using pizza schema
const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;