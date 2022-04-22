const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});
router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});
router.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});
router.post("/products", async (req, res, next) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
