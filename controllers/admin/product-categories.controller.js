import { ACCESS_DENIED_ERROR, INTERNAL_SERVER_ERROR, REQUIRED_FIELDS_ERROR } from "../../config/app.config.js";
import { Admin } from "../../models/admin.js";
import { ProductCategory } from "../../models/product-category.js";


export const getAllProductCategories = async (_, res) => {
    try {
        const categories = await ProductCategory.find({})
        return res.status(200).json({ status: true, message: "Categories found!", categories })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const AddNewProductCategory = async (req, res) => {
    try {
        const { name } = req.body; // name must be unique
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(403).json(ACCESS_DENIED_ERROR)
        }

        if (!name) {
            return res.status(400).json(REQUIRED_FIELDS_ERROR)
        }

        const category = new ProductCategory({ name });
        await category.save();

        return res.status(201).json({
            status: true,
            message: 'New category added successfully.',
            category
        });
    } catch {
        res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}