import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllProducts = async(req, res)=>{
    try {
        const products= await prisma.product.findMany({
            orderBy:{
                createdAt:"desc",
            }
        })
        return res.status(200).json({
            message:"Products retrieved Successfully",
           products
        })
    } catch (error) {
        console.log("Error while getting the products", error.toString());
        return res.status(500).json({
            message: "Error while getting the products",
        })
    }
}
const createProducts = async(req, res)=>{
    try {
        const product = await prisma.product.create({
            data:{
                ...req.body
            }
        })

        return res.status(200).json({
            message:"Product created successfully",
            product
        })
    } catch (error) {
        console.log("Error while creating the product", error.toString());
        return res.status(500).json({
            message: "Error while creating the product",
        })
    }
}
//
const deleteProduct =async (req, res)=>{
    const {id}= req.params;
    const deletedProduct = await prisma.product.delete({
        where:{
            id
        }
    })
    //
    return res.status(200).json({
        message:"Deleted the product  successfully",
        deleteProduct
    })

}
//
const getCategoryWiseProducts = async(req, res)=>{  
    try {
        const {category} = req.params;
        const products= await prisma.product.findMany({
            where:{
                category
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        //
        return res.status(200).json({
            message:"Retreived the products successfully",
            products
        })
    } catch (error) {
        console.log("Error while getting the products", error.toString());
        return res.status(500).json({
            message: "Error while getting the products",
        })
    }
}
//
const getSingleProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product=  await prisma.product.findUnique({
            where:{
                id
            }
        })
        //
        if(!product){
            return res.status(404).json({
                message:"No products found"
            })
        }
        //
        return res.status(200).json({
            message:"Retreived the product",
            product
        })
    } catch (error) {
        console.log("Error while getting the product", error.toString());
        return res.status(500).json({
            message: "Error while getting the product",
        })
    }
}
const updateProduct = async(req, res)=>{
    try {
        const {id, ame, brand, category, gender, price, description , discountedPrice, stock , isAvailable,rating} = req.body;
        // 
        const product = await prisma.product.update({
            where:{
                id
            }
            ,
            data:{
                ame, brand, category, gender, price, description , discountedPrice, stock , isAvailable,rating
            }
        })

        if(!product){
            return res.status(404).json({
                message:"Product not found!!"
            })
        }

        //
        return res.status(200).json({
            message: "Product Upadted Successfully!"
        })
        
    } catch (error) {
        console.log("Error while updating the product", error.toString());
        return res.status(500).json({
            message: "Error while updating the product",
        })
    }
}
export default {
    getAllProducts,
    createProducts,
    getCategoryWiseProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
}