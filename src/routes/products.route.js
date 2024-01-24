import { Router } from "express";
import ProductController from "../dao/dbManager/products.js";

const Products = new ProductController();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const query = req.query.query || {};

    const products = await Products.paginate(query, {
      sort: { price: sort },
      limit: limit,
      page: page,
    });

    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await Products.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await Products.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = await Products.updateProduct(productId, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await Products.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;


