import { Schema, model } from "mongoose";

const productCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
)

export const ProductCategory = model("product-category", productCategorySchema)