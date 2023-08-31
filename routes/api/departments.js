const express = require('express')
const router = express.Router()
const DepartmentController = require('../../controllers/api/departments')

// Route for getting all departments with categories and items
router.get('/', DepartmentController.getAllDepartments)

// Route for getting categories within a specific department
router.get('/:departmentId/categories', DepartmentController.getCategoriesInDepartment)

// Route for getting items within a specific department and category
router.get('/:departmentId/categories/:categoryId/items', DepartmentController.getItemsInCategory)

// Route for getting a specific item within a specific department and category
router.get('/:departmentId/categories/:categoryId/items/:itemId', DepartmentController.getSpecificItem)

module.exports = router
