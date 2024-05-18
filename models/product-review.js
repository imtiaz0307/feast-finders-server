import { Schema, model } from "mongoose";

const productReviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        reply: {
            type: String
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: "individual"
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "business"
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const ProductReview = model("product-review", productReviewSchema) 