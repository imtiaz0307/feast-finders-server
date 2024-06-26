import { Schema, model } from 'mongoose';

const businessSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    business_name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    business_hours: {
        type: String,
        default: '',
    },
    business_category: {
        type: Schema.Types.ObjectId,
        ref: 'business-category',
    },
    about_me: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    }
});

export const Business = model("business", businessSchema)