const express = require('express');
const Food = require('../schemas/FoodSchema')
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt');
const Transaction = require('../schemas/TransactionSchema')
const DeliveryBoy  = require('../schemas/DeliveryBoySchema')
const router = express.Router();
const { default: mongoose } = require('mongoose');
const multer = require('../middlewares/multer')

const URL = `http://localhost:5000`

router.post("/register", async (req, res) => {

    const saltRounds = 10;
    try {
        const deliveryboy = await DeliveryBoy.findOne({ email: req.body.email })
        if (deliveryboy) return res.status(400).send("Account already exists");

        //bcrypt encryption
        console.log(req.body.password)
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            console.log(hash);
            if (err) {
                console.log(err)
                res.send('error generating hash').status(500)
            }
            else {
                const newDeliveryBoy = new DeliveryBoy({
                    email: req.body.email,
                    password: hash,
                })
                //save user here
                const saved = await newDeliveryBoy.save().then((result) => {
                    console.log('db account created');
                    res.status(200).send(newDeliveryBoy);
                }).catch((err) => {
                    console.log(err)
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.send(error).status(500)
    }
})

module.exports = router;