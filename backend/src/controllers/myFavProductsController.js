import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const getAllFavProducts = async(req,res)=>{
    try {
        const userId = req.userId;
        const favProducts = await prisma.fav.findMany({
            where:{
                user: userId
            }
        })
        // 
        if(!favProducts){
            return res.status(404).json({
                message:"No Fav Products are found"
            })
        }
        ///
        return res.status(200).json({
            message:"Fav products fetched successfully",
            data:favProducts
        })
    } catch (error) {
        console.log("Error while fetching the fav products ",error.toString());
        return res.status(500).json({
            message:"Error while fetching the favorite products "
        })
    }
}

// 
const addFavProduct = async(req,res)=>
{
    try {
        const userId = req.userId;
        ///
        const product = await prisma.fav.create({
            data:
            {
                user: userId,
                ...req.body
            }
        })
        // 
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        //
        return res.status(201).json({
            message:"Product Added to Fav Successfully",
            data: product
        })
    } catch (error) {
        console.log("Error while adding the fav product ",error.toString());
        return res.status(500).json({
            message:"Error while adding to the fav product "
        })
    }
}
// 
const removeFromFav = async(req,res)=>{
    try {
        const userId =req.userId;
        // 
        const {id}  = req.body;
        const removedProduct = await prisma.fav.delete({
            where:{
                id:id, user:userId
            }
        })
        //
        if(!removedProduct){
            return res.status(404).json({
                message:"Product not found",

            })
        }
        //
        return res.status(200).json({
            message:"Removed Successfully from the fav products ",
            data:removedProduct
        })
    } catch (error) {
        console.log("Error while removing the fav product ",error.toString());
        return res.status(500).json({
            message:"Error while removing from the fav product "
        })
        
    }
}
// 

export default {
    getAllFavProducts,
    addFavProduct,
    removeFromFav
}