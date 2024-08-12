const { pool } = require("../config/dbconnect");

exports.createUserTable = async () => {
    try {
        await pool.query(`USE ??`, [process.env.DB_NAME]);

        // await pool.query('drop table user');

        await pool.query(`CREATE TABLE IF NOT EXISTS user (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`);
    } catch (error) {
        console.error('Error creating user table:', error);
        throw error;
    }
};


exports.addUser = async ({name, email, password}) => {
    const [result] = await pool.query("INSERT INTO user (name, email, password) VALUES (?,?,?)", [name, email, password]);
    return result.insertId;
}

exports.getUserByEmail = async (email) => {
    const [result] = await pool.query("SELECT id, name, email, password FROM user WHERE email =?", [email]);
    return result[0];
}

exports.getUserById = async (id) => {
    const [result] = await pool.query("SELECT id, name, email FROM user WHERE id =?", [id]);
    return result[0];
}


