import { Schema, model } from 'mongoose';

const businessCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BusinessCategory = model('business-category', businessCategorySchema);