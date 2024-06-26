import { ACCESS_DENIED_ERROR, INTERNAL_SERVER_ERROR, NO_BUSINESS_ERROR, NO_PRODUCT_ERROR } from "../../config/app.config.js"
import { Business } from "../../models/business.js";
import { Product } from "../../models/product.js";

export const addNewProduct = async (req, res) => {
    try {
        const { business_id } = req.params;
        const { _id } = req;
        const { name, description, files, categories, price, is_on_sale, discount_price } = req.body

        const business = await Business.findById(business_id);
        if (!business) {
            return res.status(404).json(NO_BUSINESS_ERROR)
        }

        if (business.userId.toString() !== _id) {
            return res.status(403).json(ACCESS_DENIED_ERROR)
        }

        const product = new Product({
            name,
            description,
            files,
            categories,
            price,
            is_on_sale,
            discount_price,
            business: business_id
        })
        await product.save()

        return res.status(200).json({ status: true, message: "Product added successfully!", product })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { business_id, product_id } = req.params;
        const { _id } = req;
        const { name, description, files, categories, price, is_on_sale, discount_price } = req.body

        const business = await Business.findById(business_id);
        if (!business) {
            return res.status(404).json(NO_BUSINESS_ERROR)
        }

        if (business.userId.toString() !== _id) {
            return res.status(403).json(ACCESS_DENIED_ERROR)
        }

        const product = await Product.findByIdAndUpdate(product_id, {
            $set: {
                name,
                description,
                files,
                categories,
                price,
                is_on_sale,
                discount_price
            }
        }, { new: true })

        if (!product) {
            return res.status(404).json(NO_PRODUCT_ERROR)
        }

        return res.status(200).json({ status: true, message: "Product updated successfully!", product })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { business_id, product_id } = req.params;
        const { _id } = req;

        const business = await Business.findById(business_id);
        if (!business) {
            return res.status(404).json(NO_BUSINESS_ERROR)
        }

        if (business.userId.toString() !== _id) {
            return res.status(403).json(ACCESS_DENIED_ERROR)
        }

        const product = await Product.findByIdAndDelete(product_id)

        if (!product) {
            return res.status(404).json(NO_PRODUCT_ERROR)
        }

        return res.status(200).json({ status: true, message: "Product deleted successfully!", product })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const { business_id, skip, limit } = req.params;

        const business = await Business.findById(business_id);
        if (!business) {
            return res.status(404).json(NO_BUSINESS_ERROR)
        }

        const count = await Product.find({ business: business_id }).countDocuments()

        const products = await Product.find({ business: business_id }).skip(skip).limit(limit)
        if (products.length === 0) {
            return res.status(404).json({ status: false, message: "No products found for this business." })
        }

        return res.status(200).json({ status: true, message: "Products retrieved successfully!", products, totalProducts: count })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const getProductDetails = async (req, res) => {
    try {
        const { product_id } = req.params;

        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json(NO_PRODUCT_ERROR)
        }

        return res.status(200).json({ status: true, message: "Product details retrieved successfully!", product })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}