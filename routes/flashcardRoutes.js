const express = require("express");
const { authenticate } = require("../middleware/auth");
const {
    createFlashCard,
    getFlashCards,
    updateFlashCard,
    getFlashCardById,
    deleteFlashCard,
} = require("../controllers/flashcardController");
const router = express.Router();

router
    .route("/flashcards")
    .post(authenticate, createFlashCard)
    .get(getFlashCards);
router
    .route("/flashcards/:id")
    .put(authenticate, updateFlashCard)
    .get(getFlashCardById)
    .delete(deleteFlashCard);

module.exports = router;
