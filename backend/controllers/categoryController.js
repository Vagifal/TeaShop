const Category = require('../models/categoryModel')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })

            if (category)
                return res.status(400).json({ message: "This category already exists" })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ message: "Created a category" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            // todo
            await Category.findByIdAndDelete(req.params.id)
            res.json({ message: "Deleted a Category" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a category" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = categoryController