import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//
/*
model Image {
  id        Int     @id @default(autoincrement())
  url       String  @db.Text
  altText   String?
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId Int
}
*/
const addImage = async (req, res) => {
    try {
        const {productId , url , altText}= req.body;
        //
        if(productId || url){
            return res.status(400).json({
                message:"Product id and url is required",
            })
        }
        //
        const image = await prisma.image.create({
            data:{
                ...req.body
            }
        })
        //
        return res.status(201).json({
            message:"Image added successfully",
            data:image
        });
    } catch (error) {
        console.log("error :: ", error.toString());
        return res.status(500);
    }
};
//
const removeImage = async (req, res) => {
    try {
        const {id} = req.body;
        const removedImage = await prisma.image.delete({
            where:{
                id
            }
        })
        // 
        if(!removedImage){
            return res.status(404).json({
                message:"Image not found!"
            })
        }
        //
        return res.status(200).json({
            message:"Image deleted successfully",
            data: removeImage
        })
    } catch (error) {
        console.log("error :: ", error.toString());
        return res.status(500);
    }
};
//
const upadateImage = async (req, res) => {
    try {
        const {id, url ,altText} = req.body;
        const updatedImage = await prisma.image.update({
            where:{
                id
            },
            data:{
                url,
                altText,
            }
        })
        // 
        if(!updatedImage){
            return res.status(404).json({
                message:"Image Updated Successfully"
            })
        }
        // 
        return res.status(200).json({
            message:"Image updated Successfully",
            data:updatedImage
        })
    } catch (error) {
        console.log("error :: ", error.toString());
        return res.status(500);
    }
};


export default{
    addImage,
    removeImage,
    upadateImage
}