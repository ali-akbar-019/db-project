import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const { auth0Id, name, email, addressLine1, city, country, phone } = req.body;
        // existing user
        const existingUser = await prisma.user.findUnique({
            where: { auth0Id }
        });
        if (existingUser) {
            return res.status(200).send();
        }
        // 
        const user = await prisma.user.create({
            data: {
                auth0Id,
                name,
                city,
                phone,
                country,
                email
            }
        })

        return res.status(201).json({
            message: "User created successfully",
        })
    } catch (error) {
        console.log("Error while creating the user ", error);
        return res.status(500).json({
            message: " Error while creating the user "
        })
    }
}

// 
const updateUser = async (req, res) => {
    try {
        const { auth0Id } = req.userId;
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
        const {auth0Id} = req.userId;
        const user = await prisma.user.findUnique({
            where:{
                auth0Id
            }
        })
        //
        if(!user){
            return res.status(404).json({
                message:"User does not exists"
            })
        }
        //
        return res.status(200).json({
            message:"User Fetched Successfully",
            data: user
        })
    } catch (error) {
        console.log("Error while getting the user ", error);
        return res.status(500).json({
            message: " Error while getting the user "
        })
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