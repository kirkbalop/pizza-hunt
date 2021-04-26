const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pizzaSchema = new Schema({
    pizzaName: {
        type: String,
        require: true,
        trim: true
    },
    createdBy: {
        type: String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        require: true,
        default: 'Large',
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra-Large']
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
    return this.comments.reduce((total,comment) => total + comment.replies.length + 1, 0);
});

// Create model using pizza schema
const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;