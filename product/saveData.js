import fs from "fs";
import fetch from "node-fetch";

const url = "https://dummyjson.com/products";


fetch(url)
  .then((response) => response.json())
  .then((data) => {

    const products = data.products;

    const jsonData = JSON.stringify(products, null, 2);

    fs.writeFile("product.json", jsonData, (err) => {
      if (err) {
        console.error(" Error saving file:", err);
      } else {
        console.log("Data saved successfully to product.json!");
      }
    });
  })
  .catch((error) => {
    console.error(" Error fetching data:", error);
  });
