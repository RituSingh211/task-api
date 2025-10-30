import express from "express";
import fs from "fs";
import fetch from "node-fetch";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome! Go to /product to see saved data ");
});

app.get("/save-products", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    
    const data = await response.json();

    fs.writeFile("product.json", JSON.stringify(data.products, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Failed to save data.");
      }
      res.send(" Product data saved to product.json successfully!");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data from API.");
  }
});

app.get("/product", (req, res) => {
  fs.readFile("product.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
