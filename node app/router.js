const fs = require('fs');
const express = require('express');
const req = require('express/lib/request');
const client = require('./mqtt-client')
const router = express.Router();


router.post('/', (req, res)=>{
    client.publish('led', JSON.stringify(req.body), (err)=>{
        if(!err) res.json({msg: "msg sent"})
    })
})

router.get('/', (req, res)=>{
    fs.readFile('data.json', 'utf8', (err, data)=>{
        if(!err){
            if(data.length > 0){
                res.json(data)
            }else{
                res.json({status: 0})
            }
        }
    });
})

module.exports = router;