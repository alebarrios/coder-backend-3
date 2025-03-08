import express from "express";
import cartsController from "../controllers/carts.controller.js";
import { handlePolicies, isCartFromUser } from "../middlewares/policies-checker.js";
import { jwtAuth } from "../middlewares/passportJwtAuth.js";

const cartsRouter = express.Router();

cartsRouter.get('/:cid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.getProductsByCartId)

cartsRouter.post('/', jwtAuth, handlePolicies(["USER"]), cartsController.postCart)
cartsRouter.post('/:cid/product/:pid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.postProductInCart)

cartsRouter.put('/:cid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.putProductsInCart)
cartsRouter.put('/:cid/products/:pid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.setQuantityOfProductsInCart)

cartsRouter.delete('/:cid/products/:pid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.deleteProductFromCart)
cartsRouter.delete('/:cid', jwtAuth, handlePolicies(["USER"]), isCartFromUser,
    cartsController.deleteAllProductsFromCart)

export default cartsRouter;