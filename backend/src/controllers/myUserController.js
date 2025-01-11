import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const { auth0Id, name, email, addressLine1, city, country, phone } = req.body;

        if (!auth0Id) {
            return res.status(400).json({ message: "auth0Id is required" });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { auth0Id },
        });

        if (existingUser) {
            return res.status(200).json({
                message: "User already exists",
                user: existingUser,
            });
        }

        // Create data object dynamically
        const userData = {
            auth0Id,
            ...(name && {name}), // Include 'name' only if it exists
            ...(email && { email }), // Include 'email' only if it exists
            ...(addressLine1 && { addressLine1 }), // Include 'addressLine1' only if it exists
            ...(city && { city }), // Include 'city' only if it exists
            ...(country && { country }), // Include 'country' only if it exists
            ...(phone && { phone }), // Include 'phone' only if it exists
        };

        // Create a new user with filtered data
        const user = await prisma.user.create({
            data: userData,
        });

        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error("Error while creating the user: ", error);
        return res.status(500).json({
            message: "Error while creating the user",
        });
    }
};


// 
const updateUser = async (req, res) => {
    try {
        const { auth0Id } = req;
        console.log("auth0Id :: ", auth0Id);
        const exists = await prisma.user.findUnique({
            where: { auth0Id }
        })
        //
        if (!exists) {
            return res.stats(404).json({
                message: "User does not exists"
            })
        }
        //
        //updating the user 
        const updatedUser = await prisma.user.update({
            data: {
                ...req.body,
                isProfileSetup: true
            },
            where: {
                auth0Id
            }
        })

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser
        })
    }
    catch (error) {
        console.log("Error while updating the user ", error);
        return res.status(500).json({
            message: " Error while updating the user "
        })
    }
}

//
const getCurrentUser = async (req, res) => {
    try {
        const { auth0Id } = req;
       
        if (!auth0Id) {
            return res.status(400).json({ message: "auth0Id is required" });
        }
        const user = await prisma.user.findUnique({
            where: {
                auth0Id,
            },
        });
    
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
    
        return res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        console.log("Error while getting the user ", error);
        return res.status(500).json({
            message: "Error while getting the user",
            error: error.message, // Include error details for debugging
        });
    }
    
}
//
const getAllUsers = async(req, res)=>{
    try {
        const users =await prisma.user.findMany({
            orderBy:{name:"asc"}
        })
        // 
        return res.status(200).json({
            message:"Users retrieved Successfully",
            users
        })
    } catch (error) {
        console.log("Error while getting the user ", error);
        return res.status(500).json({
            message: " Error while getting the user "
        })
    }
}
export {
    createUser,
    updateUser,
    getCurrentUser,
    getAllUsers
}