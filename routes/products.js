var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var {connect } = require('../db')


/* GET home page. */
router.get("/:id", async function (req, res, next) {
  try
  {
    let id = req.params.id;
    console.log("Checking the product...",id);
    const db = await connect();
    const re = await db.collection('products').findOne({_id:new ObjectId(id)});
    console.log(re)
    if(!re)
    {
      console.log("Not found Data...");
      return res.status(404).json({});
    }
    re['id'] = String(re['_id']);
    return res.status(200).json(re);
  }
  catch(e)
  {
    console.log("Error while finding the prduct....",e);
    return res.status(400).json({ status: "failure", reason: e });
  }
});

// Add the product
router.post("/", async function (req, res, next) {
  try {
    let product = req.body;
    if (product.quantity < 0) {
      return res
        .status(416)
        .json({ status: "failure", reason: "Quantity is negative no." });
    }
    console.log("Adding the product...");
    const db = await connect();
    const re = await db.collection('products').insertOne(product);
    product['id'] = re.insertedId;
    console.log(product)
    return res.status(201).json(product);
  } catch (e) {
    console.log("Error while adding product---", e);
    return res.status(400).json({ status: "failure", reason: e });
  }
});

// Delete the product
router.delete("/:id", async function (req, res, next) {
  try
  {
    let id = req.params.id;
    console.log("Deleting the product...",id);
    const db = await connect();
    const re = await db.collection('products').deleteOne({_id:new ObjectId(id)});
    console.log(re)
    if(!re)
    {
      console.log("Not found Data...");
      return res.status(404).json({});
    }
    return res.status(204).json({
      "status": "success"
      });
  }
  catch(e)
  {
    console.log("Error while finding the prduct....");
    return res.status(400).json({ status: "failure", reason: e });
  }
});

module.exports = router;
