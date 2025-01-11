
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


const addOrder = async (req, res) => {
    try {
        const { cartItems, deliveryDetails, totalAmount, status } = req.body;

        // Create a new order without creating new cartItems
        const order = await prisma.order.create({
            data: {
                userId: parseInt(req.userId),
                deliveryDetails,
                totalAmount,
                status,
                cartItems: {
                    connect: cartItems.map(item => ({
                        id: item.id,  // Reference the existing cart items by their IDs
                    })),
                },
            },
        });

        // Mark cart items as ordered
        await prisma.cartItem.updateMany({
            where: {
                userId: cartItems[0].userId,  // Assuming all cart items are from the same user
                id: { in: cartItems.map(item => item.id) },  // Target only the ordered items
            },
            data: {
                isOrdered: true,  // Mark them as ordered
            },
        });

        return res.status(201).json({
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        console.error("Error while adding the order: ", error.message);
        return res.status(500).json({
            message: "Error while adding the order",
        });
    }
};




const removeOrder = async (req, res) => {
    try {
        const { id } = req.body;
        const removedProduct = await prisma.order.delete({
            where: {
                id
            }
        })
        // 
        if (!removedProduct) {
            return res.status(404).json({
                message: "Order not found",

            })
        }
        //
        return res.status(200).json({
            message: "Order removed successfully",
            data: removedProduct
        })

    } catch (error) {
        console.log("Error while removing the order ", error.toString())
        return res.status(500).json({
            message: "Error while removing the order"
        })
    }
}

//
// 
const updateOrder = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId

            },
            data: {
                status
            }
        })
        return res.status(200).json({
            message: "Order updated Successfully",
            data: updatedOrder
        })
    } catch (error) {
        console.log("Error while updating the order ", error.toString())
        return res.status(500).json({
            message: "Error while updating the order"
        })
    }
}
const getAllOrders = async (req, res) => {
    try {
        const order = await prisma.order.findMany(
            {
                include: {
                    cartItems: true,
                    user: true,
                }
            }
        );
        return res.status(200).json(order)
    } catch (error) {
        console.log("Error while getting all the orders", error.toString());
        return res.status(500).json({
            message: "Error while getting all the orders "
        })
    }
}
const getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const order = await prisma.order.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
        return res.status(200).json(order)
    } catch (error) {
        console.log("Error while getting the orders of the current user", error.toString());
        return res.status(500).json({
            message: "Error while getting the orders of the current user "
        })
    }
}
const markAllCartItemsOrdered = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const cartOfTheUser = await CartModel.find({ userId, isOrdered: false });
        // 
        if (!cartOfTheUser) {
            return res.status(404).json({
                message: "No items found"
            })
            // 
        }
        // 
        if (cartOfTheUser.length > 0) {
            cartOfTheUser.forEach(async (cartItem) => {
                cartItem.isOrdered = true;
                await cartItem.save();
            })
            return res.status(200).json({
                message: "Marked Ordered",
                data: cartOfTheUser,
            });
        }
        // will work
        return res.status(200).json({
            message: "Zero Items for the current user",
            data: cartOfTheUser,
        });
    } catch (error) {
        console.error("Error while Updating the cart", error);
        return res.status(500).json({
            message: "Something went wrong while Updating cart items",
            error: error, // Add the error message for better debugging
        });
    }
};
const getUserWiseOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await prisma.order.findMany({
            where: {
                user: userId
            }
        })
        // 
        if (!orders) {
            return res.status(404).json({
                message: "No orders found",
            })
        }
        // 
        return res.status(200).json({
            message: "Fetched Orders for the current user ",
            data: orders
        })
    } catch (error) {
        console.log("Error while getting all the orders", error.toString());
        return res.status(500).json({
            message: "Error while getting all the orders "
        })
    }
}
export default {
    getAllOrders,
    addOrder,
    removeOrder,
    updateOrder,
    getMyOrders,
    getUserWiseOrders,
    markAllCartItemsOrdered
}