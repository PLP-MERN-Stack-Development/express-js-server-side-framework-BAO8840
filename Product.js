import products from "../models/products.js";
import { v4 as uuidv4 } from "uuid";

export const getAllProducts = (req, res) => {
  const { category, page = 1, limit = 5, search } = req.query;
  let result = [...products];

  if (category) result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  res.json(result.slice(start, start + Number(limit)));
};

export const getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !price) return res.status(400).json({ message: "Name and price required" });
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  Object.assign(product, req.body);
  res.json(product);
};

export const deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.status(204).send();
};
