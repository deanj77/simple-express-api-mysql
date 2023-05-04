const mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"express_mysql"
});

con.connect((err)=>{
    if(err){
        console.log("con failed")
    }else{
        console.log("con ok!")
    }
})

module.exports = con;