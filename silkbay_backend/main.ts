import { Prisma, PrismaClient, Product, PurchaseItem } from "@prisma/client";
import bodyParser from "body-parser";
import express, { response } from "express";
import cors from "cors";
const server = express();

const port = 3000;
const prisma = new PrismaClient();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors())
 

server.get("/api/products", async (request, response)  => {
    const queryOptions:Prisma.ProductFindManyArgs = {};
    if(request.query.limit !== undefined && typeof request.query.limit === "string"){
        queryOptions.take = parseInt(request.query.limit);
    }
    if (request.query.q !== undefined && typeof request.query.q === "string"){
        queryOptions.where = {
            title: {
                contains: request.query.q
            }
        }
    }
    const products = await prisma.product.findMany(queryOptions);
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

server.route("/api/user/check").post(async (request, response) => {
    const {username} = request.body;   

    if (username === undefined || username === ""){
        response.status(404).json({errorMsg: "Bad username"})
        return;
    }
    const userCount = await prisma.user.count({
        where: {
            username: {
                equals: username
            }
        }
    })
 
    const isTaken = userCount > 0;
    response.status(200).json({isTaken});
 
})

type PurchaseBody = {
    amount: number | undefined,
    purchaseItems: PurchaseItem[] | undefined,
    userId: number | undefined
}
server.route("/api/purchase").post(async (request, response) => {
    const {amount, userId, purchaseItems} = request.body as PurchaseBody

    if(amount == undefined || typeof amount !== "number"){
        response.status(404).json({text: "Bad Request"});
        return;
    }
    if(purchaseItems == undefined || purchaseItems.length === 0){
        response.status(404).json({text: "Bad Request"});
        return;
    }
    if (userId == undefined || typeof userId !== "number"){
        response.status(404).json({text: "Bad Request"});
        return;
    }
    const createdPurchase = await prisma.purchase.create({
        data: {
            amount,
            userId,
            PurchaseItems: {
                create: purchaseItems
            }
        }
    })
    response.status(200).json(createdPurchase);

})
server.route("/api/purchase/:userId").get(async (request, response) => {
    const userId = parseInt(request.params.userId);
    if(!userId){
        response.status(404).json({
            error: "Bad Request"
        })
        return;
    }

    const purchases = await prisma.purchase.findMany({
        where: {
            userId
        },
        include: {
            PurchaseItems: {
                select: {
                    id: true,
                    count: true,
                    product: true,
                },
            },
        }
    })
    response.status(200).json(purchases);
})  

server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})
