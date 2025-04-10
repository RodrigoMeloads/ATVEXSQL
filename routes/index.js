const express = require('express');
const router = express.Router();

// Rota principal "/"
router.get('/', (req, res) => {
    res.send('API funcionando! 🚀');
});

module.exports = router;