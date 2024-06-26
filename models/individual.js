import { Schema, model } from 'mongoose';

const individualSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dob: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    about_me: {
        type: String,
        default: '',
        max: 180,
    },
    feast_points: {
        type: Number,
        default: 0,
    },
    rider: {
        type: Schema.Types.ObjectId,
        ref: 'rider',
    },
});
export const Individual = model('individual', individualSchema);