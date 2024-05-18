import { Router } from "express";
import { AddNewBusinessCategory } from "../controllers/admin/business-categories.controller.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";
import { AddNewProductCategory } from "../controllers/admin/product-categories.controller.js";

const router = Router()

router.post("/business/categories/add-category", validateAdmin, AddNewBusinessCategory)
router.post("/product/categories/add-category", validateAdmin, AddNewProductCategory)

export default router;