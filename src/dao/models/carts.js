import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencia al modelo de Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Cantidad por defecto
      },
    },
  ],
});

cartSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection, cartSchema); 
