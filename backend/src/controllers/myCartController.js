import {PrismaClient} from '@prisma/client'
const prisma =new PrismaClient();


/* 
model CartItem {
    id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
  userId    Int
  productId Int
  Order     Order?   @relation(fields: [orderId], references: [id])
  orderId   Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/

// 

const getCart = async(req,res)=>{
    try {
        const userId = req.userId;
        // 
          // !TODO have to change it to createdAt
        const cartItems= await prisma.cartItem.findMany({
            where:{user: userId}
        });  
        if(!cartItems){
            return res.status(400).json({
                message:"Cart items not found"
            })
        }
        //
        return res.status(200).json({
            data: cartItems,
            message:"cart items fetched successfully"
        })
    } catch (error) {
        console.log("Error while fetching the cart", error);
        return  res.status(500).json({
            message:"Internal server error"
        })
    }

}
// 
const addCartProduct = async(req,res)=>{
    try {
        const userId = req.userId;
        //
        //easy lrte ha 
        const cartProduct = await prisma.cartItem.create({
            data:{
                user:userId,
                ...req.body
            }
        })

        return res.status(201).json({
            message:"Product added to cart successfully"
        })
    } catch (error) {
        console.log("Error while adding to the cart", error);
        return  res.status(500).json({
            message:"Internal server error"
        })
    }
}
// 
const deleteFromCart = async(req,res)=>{
    try {
        const userId = req.userId;
        const {id} = req.body;
        // 
        const deletedProduct = await prisma.cartItem.delete({
            where:{user: userId , id: id}
        })
        // 
        if(!deletedProduct){
            return res.status(404).json({
                message:"Product not found!!"
            })
        }
        //
        return res.status(200).json({
            message:"Deletd from cart successfully",
            data: deletedProduct,
        })
    } catch (error) {
        console.log("Error while deleting from the cart")
        return res.status(500).json({
            message:"Error while deleting the product from the cart"
        })
    }
}
//
const editFromCart =async(req,res)=>{
    try {
        const userId = req.userId;
        const {cartID} = req.body;
        //
        const editiedProduct = await prisma.cartItem.update({
            where:{user:userId,
            id :cartID
            },
            data:{
            ...req.body
            }
        })
        // 
        if(!editiedProduct){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        // 
        return res.status(200).json({
            message:"Product Edited Successfully",
            data: editiedProduct
        })
    } catch (error) {
        console.log("Error while editing from the cart")
        return res.status(500).json({
            message:"Error while editing the product from the cart"
        })
    }
}
// 

export default{
    getCart,
    addCartProduct,
    deleteFromCart,
    editFromCart
}