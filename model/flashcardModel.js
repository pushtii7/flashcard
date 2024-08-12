const { pool } = require("../config/dbconnect");

exports.createFlashCardTable = async () => {
    try {
        await pool.query(`USE ??`, [process.env.DB_NAME]);

        await pool.query(`CREATE TABLE IF NOT EXISTS flashcard (
            id INT PRIMARY KEY AUTO_INCREMENT,
            question TEXT,
            answer TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`);
    } catch (error) {
        console.error('Error creating flashcard table:', error);
        throw error;
    }
};





exports.addFlashCardQuery = async (question, answer) => {
    const [result] = await pool.query("INSERT INTO flashcard (question, answer) VALUES (?,?)", [question, answer]);
    return result.insertId;
}

exports.getFlashCardsQuery = async () => {
    const [results] = await pool.query("SELECT id, question, answer,created_at FROM flashcard");
    return results;
}

exports.getFlashCardByIdQuery = async (id) => {
    const [result] = await pool.query("SELECT id, question, answer, created_at FROM flashcard WHERE id = ?", [id]);
    return result[0];
}

exports.updateFlashCardQuery = async (id, question, answer) => {
    const [result] = await pool.query("UPDATE flashcard SET question = ?, answer = ? WHERE id = ?", [question, answer, id]);
    return result.affectedRows > 0;
}

exports.deleteFlashCardQuery = async (id) => {
    const [result] = await pool.query("DELETE FROM flashcard WHERE id = ?", [id]);
    return result.affectedRows > 0;
}