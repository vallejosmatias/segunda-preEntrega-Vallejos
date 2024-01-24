import { productModel } from "../models/products.js";


export default class ProductController{
  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const newProduct = new productModel(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw new Error('Error al crear un nuevo producto: ' + error.message);
    }
  }

  // Obtener todos los productos
  async getAll() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener todos los productos: ' + error.message);
    }
  }

  // Obtener un producto por ID
  async getProductById(productId) {
    try {
      const product = await productModel.findById(productId);
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID: ' + error.message);
    }
  }

  // Actualizar un producto por ID
  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true } 
      );

      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }

      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(productId) {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }

      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}
