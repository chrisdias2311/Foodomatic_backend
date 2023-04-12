const express = require('express');
const Food = require('../schemas/FoodSchema')
const User = require('../schemas/userSchema')
// const Transaction = require('../schemas/TransactionSchema')
const Transaction = require('../schemas/TransactionSchema')
const router = express.Router();
const { default: mongoose } = require('mongoose');
const multer = require('../middlewares/multer')

const URL = `http://localhost:5000`



router.post("/createtransaction", async (req, res) => {
    try {
        const newTransaction = new Transaction({
            foodId: req.body.foodId,
            foodName: req.body.foodName,
            price: req.body.price,
            restaurantLocation: req.body.restaurantLocation,
            userId: req.body.userId,
            userName: req.body.userName,
            userPhone: req.body.userPhone,
            userLocation: req.body.userLocation,
            distance: req.body.distance,
            quantity: req.body.quantity,
            liveLocation: '',
            status: 'ordered'
        });

        const saved = await newTransaction.save(function (err, transaction) {
            if (err) {
                console.log(err);
                res.send('bad request').status(400)
            }
            else {
                let transactionId = transaction._id.toString();
                res.send(transactionId).status(200);
                console.log(transactionId);
            }
        });
    } catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
})

router.post('/gettransaction', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: mongoose.Types.ObjectId(req.body.id) });
        console.log('ID:', req.body.id)
        if (transaction) {
            res.status(200).send(transaction)

        } else {
            res.status(401).send("Transaction not found")
        }
    } catch (error) {
        res.status(400).send("Couldn't update transaction")
    }
})

router.post('/myorders', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.body.id });
        // console.log('ID:', req.body.id)
        if (transactions) {
            res.status(200).send(transactions)

        } else {
            res.status(401).send("Transaction not found")
        }
    } catch (error) {
        res.status(400).send("Couldn't update transaction")
    }
})


router.post('/updateone', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: mongoose.Types.ObjectId(req.body.id) });
        if (transaction) {
            try {
                console.log(req.body.liveloc)
                let test = await Transaction.updateOne(
                    { _id: mongoose.Types.ObjectId(transaction._id) },
                    { $set: { status: "Out for delivery" } }
                )

                try {
                    let loc = await Transaction.updateOne(
                        { _id: mongoose.Types.ObjectId(transaction._id) },
                        { $set: { liveLocation: req.body.liveloc } }
                    )
                    res.status(200).send("Transaction updated successfully")
                } catch (error) {
                    res.status(400).send(error)
                    console.log(error)
                }
            } catch (error) {
                res.status(400).send(error)
                console.log(error)
            }
        } else {
            res.status(401).send("Transaction not found")
        }
    } catch (error) {
        res.status(400).send("Couldn't update transaction")
    }
})

router.post('/updatetwo', async(req, res)=>{
    try {
        const transaction = await Transaction.findOne({ _id: mongoose.Types.ObjectId(req.body.id)  });
        if(transaction){
            try {
                let test = await Transaction.updateOne(
                    { _id: mongoose.Types.ObjectId(transaction._id) },
                    { $set: { status: "Delivered" } }
                )
                res.status(200).send("Transaction updated successfully")
            } catch (error) {
               res.status(400).send(error) 
               console.log(error)
            }
            
        }else{
            res.status(401).send("Transaction not found")
        }
    } catch (error) {
        res.status(400).send("Couldn't update transaction")
    }
})

module.exports = router;