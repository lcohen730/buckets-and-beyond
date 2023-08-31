const express = require('express')
const router = express.Router()
const CategoryController = require('../../controllers/api/categories')

// Route for getting all categories
router.get('/', CategoryController.getAllCategories)

// Route for getting categories by department
router.get('/:departmentName', CategoryController.getCategoriesByDepartment)

module.exports = router
