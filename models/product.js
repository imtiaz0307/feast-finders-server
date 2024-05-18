import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        business: {
            type: Schema.Types.ObjectId,
            ref: "business"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        files: [
            {
                type: Schema.Types.ObjectId,
                ref: "file"
            }
        ],
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "product-category"
            }
        ],
        price: {
            type: Number,
            required: true
        },
        is_on_sale: {
            type: Boolean,
            default: false
        },
        discount_price: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const Product = model("product", productSchema)