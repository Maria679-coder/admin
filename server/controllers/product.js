const authModel = require("../models/auth");
const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
    try {
        const { title, desc, price, image, Email } = req.body;
        const existuser = await authModel.findOne({ Email })
        if (!existuser) {
            res.status(401).json({
                success: false,
                msg: "user not found"
            })
        }
        const product = await ProductModel.create({
            title: title,
            desc: desc,
            price: price,
            image: image,
        })
        existuser.Products.push(product._id)
        existuser.save()
        res.status(201).json({
            success: true,
            product
        })
        res.status(201).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const product = await ProductModel.findById(id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }
}
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const product = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            msg: `Product With ${id} Delete Successfully`,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const product = await ProductModel.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({
            success: true,
            msg: `Product With ${id} update Successfully`,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }
}
module.exports = { createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct }