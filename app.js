const express = require("express");

const app = express();
const PORT = 3000;

// JSON data receive karne ke liye
app.use(express.json());

// Product data
let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        quantity: 10
    },
    {
        id: 2,
        name: "Mouse",
        category: "Electronics",
        price: 800,
        quantity: 25
    },
    {
        id: 3,
        name: "Notebook",
        category: "Stationery",
        price: 100,
        quantity: 50
    }
];


// 1. GET /products
// Display all products
app.get("/products", (req, res) => {
    res.json(products);
});


// 2. GET /products/:id
// Display particular product
app.get("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});


// 3. POST /products
// Add new product
app.post("/products", (req, res) => {

    const { name, category, price, quantity } = req.body;

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name,
        category,
        price,
        quantity
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});


// 4. PUT /products/:id
// Update existing product
app.put("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, category, price, quantity } = req.body;

    product.name = name;
    product.category = category;
    product.price = price;
    product.quantity = quantity;

    res.json({
        message: "Product updated successfully",
        product: product
    });
});


// 5. DELETE /products/:id
// Delete product
app.delete("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


// 6. GET /products/category/:category
// Filter products by category
app.get("/products/category/:category", (req, res) => {

    const category = req.params.category;

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    res.json(filteredProducts);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});