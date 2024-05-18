import { Router } from "express";
import { getAllBusinessCategories } from "../controllers/admin/business-categories.controller.js";
import { authenticateUser, checkUserAvailability, userLogin } from "../controllers/user/user.controller.js";
import { BusinessSignup, checkBusinessAvailability } from "../controllers/user/business.controller.js";
import { becomeRider, individualSignup } from "../controllers/user/individual.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { getAllProductCategories } from "../controllers/admin/product-categories.controller.js";
import { addNewProduct, deleteProduct, updateProduct } from "../controllers/user/product.controller.js";

const router = Router()

// auth routes 
router.post("/available", checkUserAvailability)
router.post("/auth/login", userLogin)
router.get("/auth/verify-user/:token", authenticateUser)

// individual routes
router.post("/individual/signup", individualSignup)
router.post("/individual/become-a-rider", verifyUser, becomeRider)

// business routes
router.post("/business/available", checkBusinessAvailability)
router.post("/business/signup", BusinessSignup)
router.get("/business/categories/get-all-categories", getAllBusinessCategories)
// products routes
router.get("/business/products/get-all-products/:business_id/:skip/:limit")
router.get("/business/products/get-product-details/:product_id")
router.get("/business/products/get-all-product-categories", verifyUser, getAllProductCategories)
router.post("/business/products/add-new-product/:business_id", verifyUser, addNewProduct)
router.put("/business/products/update-product/:business_id/:product_id", verifyUser, updateProduct)
router.delete("/business/products/delete-product/:business_id/:product_id", verifyUser, deleteProduct)


export default router;