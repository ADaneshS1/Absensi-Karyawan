const { sql } = require("@vercel/postgres");

async function getData(req,res) {
    try{
        if(req.method !== "GET") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {rows} = await sql`SELECT * FROM absensi WHERE datediff(day,tanggal,now()) = 0`

        res.status
    }catch(e){}
}