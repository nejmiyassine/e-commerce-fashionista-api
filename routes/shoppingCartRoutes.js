const router = require('express').Router();

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const { restrictToCustomer } = require('../middleware/restrictMiddleware');

const {
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getAllCartItems,
} = require('../controllers/shoppingCartController');

router.use(deserializeUser, requireUser);

router.get('/', restrictToCustomer, getAllCartItems);
router.post('/addToCart', restrictToCustomer, addToCart);
router.post('/removeFromCart', restrictToCustomer, removeFromCart);
router.post('/decreaseQuantity', restrictToCustomer, decreaseQuantity);

module.exports = router;
