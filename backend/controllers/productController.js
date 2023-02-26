const Product = require('../models/productModel')

const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find();

            res.json(products)

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, image, category } = req.body;

            if (!image)
                return res.status(400).json({ message: "No image upload" })

            const product = await Product.findOne({ product_id })

            if (product)
                return res.status(400).json({ message: "This product already exists." })

            const newProduct = new Product({
                product_id, title: title.toLowerCase(), price, description, content, image, category
            })

            await newProduct.save()
            res.json({ message: "Created a product" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)

            res.json({ message: "Deleted a Product" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, image, category } = req.body;

            if (!image)
                return res.status(400).json({ message: "No image upload" })

            await Product.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, image, category
            })

            res.json({ message: "Updated a Product" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = productController