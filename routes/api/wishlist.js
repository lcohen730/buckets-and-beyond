const express = require('express')
const router = express.Router()

const WishlistController = require('../../controllers/api/wishlist')

// Add items to wishlist
router.post('/add', WishlistController.addItemToWishlist)

// Remove items from wishlist
router.post('/remove', WishlistController.removeItemFromWishlist)

// Delete entire wishlist
router.post('/delete', WishlistController.deleteWishlist)

module.exports = router