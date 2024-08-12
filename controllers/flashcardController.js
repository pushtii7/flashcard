const {
    addFlashCardQuery,
    updateFlashCardQuery,
    getFlashCardsQuery,
    getFlashCardByIdQuery,
    deleteFlashCardQuery,
} = require("../model/flashcardModel");

exports.createFlashCard = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details",
            });
        }

        const flashcard = {
            question,
            answer,
        };
        flashcard.id = await addFlashCardQuery(question, answer);

        return res.status(201).json({
            success: true,
            message: "Flashcard created successfully",
            data: flashcard,
        });
    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success: true,
            message: "Internal server error",
        });
    }
};

exports.updateFlashCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updated = await updateFlashCardQuery(id, question, answer);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Flash card not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Flash card updated successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success: true,
            message: "Internal server error",
        });
    }
};

exports.getFlashCards = async (req, res) => {
    try {
        const flashcards = await getFlashCardsQuery();

        return res.status(200).json({
            success: true,
            data: flashcards,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error",
        });
    }
};

exports.getFlashCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const flashcard = await getFlashCardByIdQuery(id);

        if (!flashcard) {
            return res.status(404).json({
                success: false,
                message: "Flash card not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: flashcard,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error",
        });
    }
};

exports.deleteFlashCard = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteFlashCardQuery(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Flash card not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Flash card deleted successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success: true,
            message: "Internal server error",
        });
    }
};
