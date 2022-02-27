const express = require('express');
const path = require('path');
const fs = require('fs');
const client = require('./mqtt-client');


const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/esp', require('./router'));
app.use(express.static(path.join(__dirname,'public')));


client.on('connect', ()=>{
    console.log('Client connected to mosquitto');
    client.subscribe('ledStatus', (err)=>{
        if(!err){
            client.on('message', (topic, msg)=>{
                msg = msg.toString();
                console.log(msg);
                fs.writeFile("data.json",msg ,err=>{
                    if(!err){
                        console.log("Data Written to file");
                    }
                });
            })
        }
    });
    app.listen(PORT, ()=>console.log(`SERVER STARTED ON ${PORT}`));
})