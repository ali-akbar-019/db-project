
/*
model Order {
  id              Int         @id @default(autoincrement())
  userId          Int
  user            User        @relation(fields: [userId], references: [id])
  deliveryDetails Json // Delivery details stored as JSON
  cartItems       CartItem[]
  totalAmount     Float       @default(0.0)
  status          OrderStatus @default(PLACED)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}
*/

import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();



const addOrder = async(req,res)=>{
    try {
        const order =await prisma.order.create({
            data:{
                ...req.body
            }
        })
        return res.status(201).json({
            message:"Order created successfully",
            data:order
        })
    } catch (error) {
        console.log("Error while adding the order ",error.toString())
        return res.status(500).json({
            message:"Error while adding the order"
        })
    }
}

const removeOrder = async(req,res)=>{
    try {
        const {id} = req.body;
        const removedProduct = await prisma.order.delete({
            where:{
                id
            }
        })
        // 
        if(!removedProduct){
            return res.status(404).json({
                message:"Order not found",

            })
        }
        //
        return res.status(200).json({
            message:"Order removed successfully",
            data:removedProduct
        })

    } catch (error) {
        console.log("Error while removing the order ",error.toString())
        return res.status(500).json({
            message:"Error while removing the order"
        })
    }
}
//
// 
const updateOrder = async(req,res)=>{
    try {
      const {id ,status} = req.body;
        const updatedOrder = await prisma.order.update({
            where:{
                id

            },
            data:{
                status
            }
        })
        return res.status(200).json({
            message:"Order updated Successfully",
            data: updatedOrder
        })
    } catch (error) {
        console.log("Error while updating the order ",error.toString())
        return res.status(500).json({
            message:"Error while updating the order"
        })
    }
}
const getAllOrders = async(req,res)=>{
    try {
        const order = await prisma.order.findMany();
        return res.status(200).json({
            message:"All order",
            data:order
        })
    } catch (error) {
        console.log("Error while getting all the orders", error.toString());
        return res.status(500).json({
            message:"Error while getting all the orders "
        })
    }
}

const getUserWiseOrders = async(req, res)=>{
try {
    const userId = req.userId;
    const orders = await prisma.order.findMany({
        where:{
            user:userId
        }
    })
    // 
    if(!orders){
        return res.status(404).json({
            message:"No orders found",
        })
    }
    // 
    return res.status(200).json({
        message:"Fetched Orders for the current user ",
        data:orders
    })
} catch (error) {
    console.log("Error while getting all the orders", error.toString());
    return res.status(500).json({
        message:"Error while getting all the orders "
    })
}
}
export default{
    getAllOrders,
    addOrder,
    removeOrder,
    updateOrder
    ,
    getUserWiseOrders
}