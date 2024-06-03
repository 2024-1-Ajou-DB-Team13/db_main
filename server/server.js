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

app.set("port", process.env.PORT || 3002);
app.set("host", process.env.HOST || "0.0.0.0");

app.post('/join_process', function(req, res) {    
    const { id, password, confirmPassword, name, userType } = req.body;

    console.log('Received data:', { id, password, confirmPassword, name, userType });
    
    if (id && password && confirmPassword && name && userType) {
        db.query('SELECT * FROM user WHERE UserId = ?', [id], function(error, results, fields) { 
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

app.post('/login_process', (req, res) => {
    const { id, password } = req.body;

    console.log('Received data:', { id, password });

    if (id && password) {
        db.query('SELECT * FROM user WHERE UserId = ? AND Password = ?', 
        [id, password], function(error, results, fields) {
            if (error) {
                console.error('DB query error:', error);
                return res.json({ code: 500, reason: "DB query error" });
            }
            if (results.length > 0) {
                res.json({ code: 202 }); 
            } else {
                res.json({ code: 404, reason: "invalid id or pw" });
            }            
        });
    } else {
        res.json({ code: 404, reason: "아이디 혹은 비밀번호를 입력하지 않았습니다." });
    }
});

const port = 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});