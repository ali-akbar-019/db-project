import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const getAllFavProducts = async (req, res) => {
    try {
        const userId = req.userId;

        const favProducts = await prisma.fav.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                product,
                user
            }
        })
        // 
        if (!favProducts) {
            return res.status(404).json({
                message: "No Fav Products are found"
            })
        }
        ///
        return res.status(200).json(favProducts)
    } catch (error) {
        console.log("Error while fetching the fav products ", error.toString());
        return res.status(500).json({
            message: "Error while fetching the favorite products "
        })
    }
}

// 
const addFavProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body; // Assuming the product ID is sent in the request body

        // Check if the product is already in the user's favorites
        const existingProduct = await prisma.fav.findFirst({
            where: {
                userId: parseInt(userId),
                productId: productId // Match the productId
            }
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product already in favorites"
            });
        }

        // If the product is not in the favorites, add it
        const product = await prisma.fav.create({
            data: {
                userId: parseInt(userId),
                productId: productId, // Assuming productId is provided in the body
                ...req.body
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(201).json(product);
    } catch (error) {
        console.log("Error while adding the fav product ", error.toString());
        return res.status(500).json({
            message: "Error while adding to the fav product"
        });
    }
};

// 
const removeFromFav = async (req, res) => {
    try {
        const userId = req.userId;
        // 
        const { id } = req.body;
        const removedProduct = await prisma.fav.delete({
            where: {
                id: id, userId: parseInt(userId)
            }
        })
        //
        if (!removedProduct) {
            return res.status(404).json({
                message: "Product not found",

            })
        }
        //
        return res.status(200).json(removedProduct)
    } catch (error) {
        console.log("Error while removing the fav product ", error.toString());
        return res.status(500).json({
            message: "Error while removing from the fav product "
        })

    }
}
// 

export default {
    getAllFavProducts,
    addFavProduct,
    removeFromFav
}