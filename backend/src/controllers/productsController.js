import { PrismaClient } from '@prisma/client';
import { mkdirSync, rename, renameSync } from 'fs';
import path from 'path'
const prisma = new PrismaClient();
// 

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: true, // Include related images
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Format the response to include products and their images in a clean structure
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            gender: product.gender,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            stock: product.stock,
            isAvailable: product.isAvailable,
            rating: product.rating,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            images: product.images.map((image) => ({
                id: image.id,
                url: image.url,
                altText: image.altText || "No description available",
            })),
        }));

        return res.status(200).json({
            message: "Products retrieved successfully",
            products: formattedProducts,
        });
    } catch (error) {
        console.error("Error while getting the products", error.toString());
        return res.status(500).json({
            message: "Error while getting the products",
        });
    }
};

const createProducts = async (req, res) => {
    try {
        const { images, ...productData } = req.body;

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(404).json({
                message: "Images not found or invalid format",
            });
        }

        // Create the product first
        const product = await prisma.product.create({
            data: {
                ...productData,
            },
        });

        // Create images linked to the product
        const imagePromises = images.map((img) =>
            prisma.image.create({
                data: {
                    url: img,
                    altText: img.altText || null,
                    productId: product.id,
                },
            })
        );

        const allImages = await Promise.all(imagePromises);

        return res.status(200).json({
            message: "Product created successfully",
            product,
            images: allImages,
        });
    } catch (error) {
        console.error("Error while creating the product:", error.message);
        return res.status(500).json({
            message: "Error while creating the product",
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        // Check if the product exists
        const productExists = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Delete images  with the product
        await prisma.image.deleteMany({
            where: {
                productId: parseInt(id),
            },
        });

        // Delete the product itself
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({
            message: "Deleted the product successfully",
            deletedProduct,
        });
    } catch (error) {
        console.error("Error while deleting the product:", error.message);
        return res.status(500).json({
            message: "Error while deleting the product",
        });
    }
};

//
const getCategoryWiseProducts = async (req, res) => {
    try {
        const { category } = req.query;
        // console.log("category :: ", category)
        const products = await prisma.product.findMany({
            where: {
                category
            },
            include: {
                images: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        //
        return res.status(200).json({
            message: "Retreived the products successfully",
            products
        })
    } catch (error) {
        console.log("Error while getting the products", error.toString());
        return res.status(500).json({
            message: "Error while getting the products",
        })
    }
}
const getNewProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: true, // Include related images
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10

        });

        // Format the response to include products and their images in a clean structure
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            gender: product.gender,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            stock: product.stock,
            isAvailable: product.isAvailable,
            rating: product.rating,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            images: product.images.map((image) => ({
                id: image.id,
                url: image.url,
                altText: image.altText || "No description available",
            })),
        }));

        return res.status(200).json(formattedProducts);
    } catch (error) {
        console.error("Error while getting the products", error.toString());
        return res.status(500).json({
            message: "Error while getting the products",
        });
    }
}
//
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure id is treated as an integer
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                images: true,
            },
        });

        if (!product) {
            return res.status(404).json({
                message: "No products found",
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.log("Error while getting the product", error.toString());
        return res.status(500).json({
            message: "Error while getting the product",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        // Extract formData from the request body
        const {
            formData: {

                name,
                brand,
                category,
                gender,
                price,
                description,
                discountPrice,
                stock,
                images
            },
            id,
        } = req.body;

        console.log("body :: ", req.body); // Log full request body to verify structure

        console.log(
            id,
            name,
            brand,
            category,
            gender,
            price,
            description,
            stock,
            images
        );

        if (!id) {
            return res.status(400).json({
                message: "Product ID is required."
            });
        }

        // Update product in the database
        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                brand,
                category,
                gender,
                price,
                description,
                discountPrice,
                stock,
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found!"
            });
        }

        return res.status(200).json({
            message: "Product Updated Successfully!",
            product, // Include updated product in response
        });
    } catch (error) {
        console.error("Error while updating the product:", error.toString());
        return res.status(500).json({
            message: "Error while updating the product",
        });
    }
};


const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required",
            })
        }
        const { file } = req;
        const timeStamp = Date.now();
        const uploadDir = path.join("uploads", "files");
        const fileName = `${timeStamp}_${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);

        // 
        mkdirSync(uploadDir, { recursive: true });
        // 
        renameSync(file.path, filePath);

        // 
        const filePathForResponse = filePath.replace(/\\/g, "/");
        return res.status(200).json({ filePath: filePathForResponse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
export default {
    getAllProducts,
    createProducts,
    getCategoryWiseProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct,
    uploadFile,
    getNewProducts
}