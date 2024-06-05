const express = require('express');
const db = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // React 앱이 실행되는 도메인
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 5000);
app.set("host", process.env.HOST || "0.0.0.0");


// 회원가입
app.post('/join_process', function(req, res) {    
    const { id, password, confirmPassword, name, userType } = req.body;

    //console.log('Received data:', { id, password, confirmPassword, name, userType });
    
    if (id && password && confirmPassword && name && userType) {
        db.query('SELECT * FROM user WHERE UserId = ?', [id], function(error, results, fields) {
            console.log(results);
            if (error) {
                console.error('DB query error:', error);
                return res.json({ code: 500, reason: "DB query error" });
            }
            if (results.length <= 0 && password === confirmPassword) {     
                db.query('INSERT INTO user (UserId, UserType, UserName, Password) VALUES (?,?,?,?)',
                [id, userType, name, password],
                function (error, data) {
                    if (error) {
                        console.error('DB insert error:', error);
                        return res.json({ code: 500, reason: "DB insert error" });
                    }
                    res.json({ code: 202 });
                });  
            } else if (password !== confirmPassword) {
                res.json({ code: 404, reason: "비밀번호가 올바르게 입력되지 않았습니다." });
            } else {
                res.json({ code: 404, reason: "아이디가 중복됩니다." });
            }            
        });
    } else {
        res.json({ code: 404, reason: "정보를 다 입력하지 않았습니다." });
    }
});


// 로그인
app.post('/login_process', (req, res) => {
    const { id, password } = req.body;

    //console.log('Received data:', { id, password });

    if (id && password) {
        db.query('SELECT * FROM user WHERE UserId = ? AND Password = ?', 
        [id, password], function(error, results, fields) {
            console.log(results);
            if (error) {
                console.error('DB query error:', error);
                return res.json({ code: 500, reason: "DB query error" });
            }
            if (results.length > 0) {
                res.json({ code: 202, type: results[0].UserType}); 
            } else {
                res.json({ code: 404, reason: "invalid id or pw" });
            }            
        });
    } else {
        res.json({ code: 404, reason: "아이디 혹은 비밀번호를 입력하지 않았습니다." });
    }
});

// 금일 예약자 명단
app.post('/reservations_process', (req,res) =>{
    
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    
    db.query(`SELECT * FROM customers WHERE ReservationTime like '%${dateString}%' `, (error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have customer" });
        } 
   }) 
});

//고객이 원하는 priceRange의 매물 조회
app.post('/user_reservations_process', (req,res) =>{

    const price = req.body;
    const under = price - 5000;
    const upper = price + 5000;
    db.query(`SELECT * FROM property WHERE PriceRange BETWEEN ? AND ?`,[under, upper] ,(error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have customer" });
        } 
   }) 
});

//광고에서 Property로
app.post('/adtopro_process', (req,res) =>{

    const property_id = req.body;
    
    db.query(`SELECT * FROM property WHERE propertyid = ?`,[property_id] ,(error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have customer" });
        } 
   }) 
});


//직원 관리
app.post('/employee_process', (req,res) =>{

    db.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have user" });
        } 
   }) 
});

//전체 고객 데이터
app.post('/customer_process', (req,res) =>{
    db.query('SELECT * FROM customers', (error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have user" });
        } 
   }) 
});

//전체 매물 데이터
app.post('/property_process', (req,res) =>{
    db.query('SELECT * FROM property', (error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have user" });
        } 
   }) 
});

//광고
app.post('/advertisement_process', (req,res) =>{
    db.query('SELECT property.PropertyName, advertisement.Media,advertisement.InquiryCount FROM advertisement INNER JOIN property ON advertisement.PropertyID = property.PropertyID',
    (error, results) => {
        if (error) {
            console.error('DB query error:', error);
            return res.json({ code: 500, reason: "DB query error" });
        }
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.json({ code: 404, reason: "no have user" });
        } 
   }) 
});

const port = 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});