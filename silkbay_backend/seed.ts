
import products from "./data/products_test.json";
import users from "./data/users_test.json";
import purchases from "./data/purchases_test.json";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	for (const user of users) {
		if (!(await prisma.user.count({ where: { id: user.id } }))) {
			await prisma.user.create({
				data: {
					password: user.password,
					id: user.id,
					username: user.username,
				},
			});
		}
	}

	for (const product of products) {
		if (!(await prisma.product.count({ where: { id: product.id } }))) {
			await prisma.product.create({
				data: {
					id: product.id,
					category: product.category,
					description: product.description,
					image: product.image,
					price: product.price,
					title: product.title,
				},
			});
		}
	}

    for (const purchase of purchases){
        if (!(await prisma.purchase.count({where: {id: purchase.id}}))){
            await prisma.purchase.create({
                data: {
                    id: purchase.id,
					amount: purchase.amount,
                    userId: purchase.user,
					PurchaseItems: {
						create: purchase.purchaseItems.map((purchaseItem) => {
							return {
								count: purchaseItem.count,
								productId: purchaseItem.product,
							}
						})
					}
                }	
            })

			await prisma.user.update({
				where: {
					id: purchase.user
				},
				data: {
					purchases: {
						connect: {id: purchase.id}
					}
				}
			})
        }
    }
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
