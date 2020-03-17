const { Product } = require('../models') ;

class ProductController {
    static findAll (req,res,next) {
        Product.findAll()
            .then((products)=> {
                res.status(200).json({
                    data: products
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static create ( req, res, next) {
        let newProduct = {
            name : req.body.name, 
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }

        Product.create(newProduct)
            .then((response)=>{
                res.status(201).json({
                    data : response
                })
            })
            .catch((err)=> {
                next(err)
            })   
    }

    static update(req,res,next){
        let idToUpdate = req.params.id 

        Product.findOne({
            where : {
                id : idToUpdate
            }
        })
            .then ((found)=>{
                if (found) {
                    let updatedProduct = {
                        name : req.body.name,
                        image_url : req.body.image_url,
                        price : req.body.price,
                        stock : req.body.stock
                    }

                    return Product.update(updatedProduct, {
                        where : {
                            id : idToUpdate
                        },
                        returning : true
                    })

                } else {
                    let err = {
                        name : 'custom',
                        status : 400,
                        message : 'Product not found'
                    }
                    throw err
                }
            })
            .then((updated)=>{
                res.status(200).json({
                    data : updated[1]
                })
            })

            .catch ((err)=> {
                next(err)
            })
    }

    static destroy(req,res,next){
        let idToDelete = req.params.id 

        Product.findOne({
            where : {
                id : idToDelete
            }
        })
            .then ((found)=>{
                if (found) {

                    return Product.destroy({
                        where : {
                            id : idToDelete
                        }
                    })

                } else {
                    let err = {
                        name : 'custom',
                        status : 400,
                        message : 'Product not found'
                    }
                    throw err
                }
            })
            .then((deleted)=>{
                res.status(200).json({
                    data : 'deleted'
                })
            })

            .catch ((err)=> {
                next(err)
            })
    }


}

module.exports = ProductController