const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:`root`,
    password:`sac101`,
    database:`social-media-app`
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connected to db")
    }
    else{
        console.log(err)
    } 
}) 

module.exports = mysqlConnection