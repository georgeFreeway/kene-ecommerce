import { Request, Response } from "express";
import ProductModel from '../models/products.model';
import mongoose from "mongoose";

export const findAllProducts =  async (req: Request, res: Response) => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
}

export const findSingleProduct = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send('invalid id');
        }

        const product = await ProductModel.findById(id);
        if(product){
            res.status(200).json(product);
        }else {
            res.status(404).json({ message: 'no product found' });
        }
    }catch(error){
        res.status(404).json(error);
    }
}