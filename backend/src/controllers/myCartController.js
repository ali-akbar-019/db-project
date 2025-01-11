import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


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

const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await prisma.cartItem.findMany({
            where: { userId: parseInt(userId), isOrdered: false },
            include: {
                product: {
                    include: {
                        images: true
                    }
                },
            },
        });

        if (!cartItems) {
            return res.status(404).json({
                message: "Cart items not found",
            });
        }

        return res.status(200).json(cartItems);
    } catch (error) {
        console.log("Error while fetching the cart", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// 
const addCartProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {

                userId: parseInt(userId),
                productId: parseInt(productId),
                isOrdered: false
            },
        });

        if (existingCartItem) {
            // If the product already exists, increase the quantity
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + 1 },
            });
        } else {
            // If the product doesn't exist, create a new cart item
            await prisma.cartItem.create({
                data: {
                    userId: parseInt(userId),
                    productId: parseInt(productId),
                    quantity: 1,
                },
            });
        }

        return res.status(201).json({ message: "Product added/updated in cart successfully" });
    } catch (error) {
        console.error("Error while adding to the cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// 
const deleteFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;
        // 
        const deletedProduct = await prisma.cartItem.delete({
            where: { userId: parseInt(userId), id: parseInt(id) }
        })
        // 
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found!!"
            })
        }
        //
        return res.status(200).json({
            message: "Deletd from cart successfully",
            data: deletedProduct,
        })
    } catch (error) {
        console.log("Error while deleting from the cart ", error)
        return res.status(500).json({
            message: "Error while deleting the product from the cart"
        })
    }
}
//
const editFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { id, quantity } = req.body;
        //
        const editiedProduct = await prisma.cartItem.update({
            where: {
                userId: parseInt(userId),
                id: parseInt(id)
            },
            data: {
                quantity: quantity
            }
        })
        // 
        if (!editiedProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        // 
        return res.status(200).json({
            message: "Product Edited Successfully",
            data: editiedProduct
        })
    } catch (error) {
        console.log("Error while editing from the cart")
        return res.status(500).json({
            message: "Error while editing the product from the cart"
        })
    }
}
// 

export default {
    getCart,
    addCartProduct,
    deleteFromCart,
    editFromCart
}