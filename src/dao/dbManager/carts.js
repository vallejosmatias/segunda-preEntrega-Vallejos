import {cartsModel} from "../models/carts.js"

export default class CartController {
   construtor() {
    console.log("conectado a la base de datos trabajando con el carrito");
  }

  async createCart(){
      const existCart = await cartsModel.findOne();
      if (existCart){
        return existCart;
      }
      const newCart = new cartsModel({ products: [] });
      const savedCart = await newCart.save();
      return savedCart;
  }

  async getAll(){
    let  carts = await  cartsModel.find().lean();
    console.log(carts)
    return carts;
  }

  async getCartById(cartId) {
    try {
      let cart = await cartsModel.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito por ID: ' + error.message);
    }
  }

  async updateCartProducts(cartId, updatedProducts) {
    try {
      // Buscar el carrito por ID
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      // Actualizar la propiedad 'products' con el nuevo arreglo de productos
      cart.products = updatedProducts;

      // Guardar los cambios
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito: ' + error.message);
    }
  }

  // Eliminar todos los productos del carrito
  async deleteAllProducts(cartId) {
    try {
      // Buscar el carrito por ID
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      // Limpiar la propiedad 'products'
      cart.products = [];

      // Guardar los cambios
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw new Error('Error al eliminar productos del carrito: ' + error.message);
    }
  }
}
