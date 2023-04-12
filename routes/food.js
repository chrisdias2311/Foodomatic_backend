const express = require('express');
const Food = require('../schemas/FoodSchema')
const router = express.Router();
const { default: mongoose } = require('mongoose');
const multer = require('../middlewares/multer')

const URL = `http://localhost:5000`



// router.post("/addproduct", multer.upload.single("file"), async (req, res) => {
//     try {
//         console.log(req.file)
//         //Will send the email

//         const newProduct = new Product({
//             ownerId: req.body.ownerId,
//             name: req.body.name,
//             description: req.body.description,
//             category: req.body.category,
//             price: req.body.price,
//             productImage: `${URL}/api/image/${req.file.filename}`,
//             quantity: req.body.quantity,
//             rating:0,
//             ratingCount:0
//         });
//         let productId;
//         const saved = await newProduct.save(function (err, product) {
//             if (err) {
//                 console.log(err);
//                 res.send('bad request').status(400)

//             }
//             else {
//                 let productId = product._id.toString();
//                 //let slice = productId.slice(14, 38);
//                 res.send(productId).status(200);
//                 console.log(productId);

//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.send(error).status(400);
//     }
// })

router.post("/addfood", async (req, res) => {
    try {
        const newFood = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            location: req.body.location,
            preparingtime: req.body.preparingtime,
            rating: req.body.rating
        });

        const saved = await newFood.save(function (err, product) {
            if (err) {
                console.log(err);
                res.send('bad request').status(400)
            }
            else {
                let productId = product._id.toString();
                //let slice = productId.slice(14, 38);
                res.send(productId).status(200);
                console.log(productId);
            }
        });
    } catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
})

router.get('/getfoods', async (req, res) => {
    try {
        const foods = await Food.find({})
        if (foods) {
            res.status(200).send(foods)
        }else{
            res.status(200).send("No foods found")
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})



router.post("/getfooddetails", async (req, res) => {
    try {
        let food = await Food.findOne({ _id: mongoose.Types.ObjectId(req.body.id) }); //find user here
        if (food) {
            res.status(200).send(food);
        } else {
            res.send("No food found").send(401);
        }
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
})




module.exports = router;