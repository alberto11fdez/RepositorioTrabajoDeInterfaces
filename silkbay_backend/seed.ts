import { PrismaClient } from "@prisma/client";
import products from "./data/products_test.json";
import users from "./data/users_test.json";
const prisma = new PrismaClient();

async function main(){
    for(const user of users){
        await prisma.user.create(
            {
                data: {
                    password: user.password,
                    id: user.id,
                    username: user.username, 
                }
            }
        )
    }

    for (const product of products){
        await prisma.product.create({
            data: {
                id: product.id,
                category: product.category,
                description: product.description,
                image: product.image,
                price: product.price,
                title: product.title
            }
        })
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})