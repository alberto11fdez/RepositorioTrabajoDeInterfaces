import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
const server = express();

const port = 3000;
const prisma = new PrismaClient();
server.use(bodyParser.json());
server.use(cors())
server.get("/api/products", async (request, response)  => {
    const products = await prisma.product.findMany();
    response.status(200).json(products);
})

server.get("/api/products/:productId", async (request, response) => {
    const id = request.params.productId;

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!product){
        response.status(404).json({
            error: "PRODUCT NOT FOUND"
        })
        return;
    }

    response.status(200).json(product)
})

server.route("/api/user").get(async (request, response) => {
    const username = request.query.username;
    if(!username || username === ""){
        response.status(400).json({
            error: "BAD REQUEST"
        })
        return;
    }
    const user = await prisma.user.findUnique({
        where:{
            username: username as string
        }
    })
    if(!user){
        response.status(404).json({
            error: "USER NOT FOUND"
        })
        return;
    }
    response.status(200).json(user)
}).post(async (request, response) => {
    const {username, password, email=""} = request.body;
    const result = await prisma.user.create({
        data: {
            password,
            username,
            email,
        }
    })
    response.status(200).json(result);
});



server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})
