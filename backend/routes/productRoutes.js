const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.status = 'active' 
      ORDER BY p.id DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const [prodRows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (prodRows.length === 0) return res.status(404).json({ success: false, message: 'Not found' });
    
    const product = prodRows[0];
    product.features = typeof product.features === 'string' ? JSON.parse(product.features) : product.features;
    product.specifications = typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications;
    product.applications = typeof product.applications === 'string' ? JSON.parse(product.applications) : product.applications;

    const [imgRows] = await db.query('SELECT * FROM product_images WHERE product_id = ?', [req.params.id]);
    product.gallery = imgRows;

    const [spareRows] = await db.query('SELECT * FROM spare_parts WHERE product_id = ? AND status = "active"', [req.params.id]);
    product.spares = spareRows;

    res.json({ success: true, data: product });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// ADD NEW PRODUCT
router.post('/', async (req, res) => {
  try {
    const { name, description, main_image, category_id, features, specifications, applications } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const featuresJson = JSON.stringify(features || []);
    const specsJson = JSON.stringify(specifications || {});
    const appsJson = JSON.stringify(applications || {});

    const [result] = await db.query(
      'INSERT INTO products (name, slug, description, features, specifications, applications, category_id, main_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, description, featuresJson, specsJson, appsJson, category_id || 1, main_image]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// UPDATE PRODUCT (આ રાઉટ જ મિસિંગ હતો)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, main_image, category_id, features, specifications, applications } = req.body;
    const featuresJson = JSON.stringify(features || []);
    const specsJson = JSON.stringify(specifications || {});
    const appsJson = JSON.stringify(applications || {});

    await db.query(
      'UPDATE products SET name=?, description=?, features=?, specifications=?, applications=?, category_id=?, main_image=? WHERE id=?',
      [name, description, featuresJson, specsJson, appsJson, category_id || 1, main_image, req.params.id]
    );
    res.json({ success: true, message: "Product Updated" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
