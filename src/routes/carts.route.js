import { Router } from "express";
import CartController from "../dao/dbManager/carts.js";

const carts = new CartController();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await carts.getAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await carts.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await carts.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un carrito por ID
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = await carts.updateCartProducts(cartId, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un carrito por ID
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const deletedCart = await carts.deleteAllProducts(cartId);

    if (!deletedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;