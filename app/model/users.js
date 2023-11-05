const pool = require('../../config/db');

module.exports = {
    async get(search = null, page = 1, limit = 10){
        // const s = search ? `%${search}%` : null;
        const result = await pool.query(
            `SELECT * FROM users `, 
            // [s, limit, (page - 1) * limit]
        )
        return result.rows
    },
    async getById(id){
        const result = await pool.query(
            "SELECT * FROM users WHERE id=$1", [id]
        )
        return result.rows
    },
    async create({name, email, password, profile, verified}){
        const result = await pool.query(
            `INSERT INTO users 
                (name, email, password, profile, verified)
                values($1, $2, $3, $4, $5);
            `,
            [name, email, password, profile, verified]
        )
        return result.rows
    },
    async update({id, name, password, email, profile, verified}){
        try{
            const result = await pool.query(
                `UPDATE users
                 SET
                    name=$1,
                    email=$2,
                    password=$3,
                    profile=$4,
                    verified=$5
                 WHERE id=$6
                `,
                [name, password, email, profile, verified, id]
            )
            return result.rows
        } catch(e) {
            throw new error(e)
        }
    },
    async delete(id){
        const result = await pool.query(
            "DELETE FROM users WHERE id=$1", [id]
        )
        return result.rows
    }
}