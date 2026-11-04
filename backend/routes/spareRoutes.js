const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ADD SPARE PART
router.post('/', async (req, res) => {
  try {
    const { product_id, part_name, description, image_path } = req.body;
    const [result] = await db.query(
      'INSERT INTO spare_parts (product_id, part_name, description, image_path) VALUES (?, ?, ?, ?)',
      [product_id, part_name, description, image_path]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// UPDATE SPARE PART
router.put('/:id', async (req, res) => {
  try {
    const { part_name, description, image_path } = req.body;
    await db.query(
      'UPDATE spare_parts SET part_name=?, description=?, image_path=? WHERE id=?',
      [part_name, description, image_path, req.params.id]
    );
    res.json({ success: true, message: "Spare Part Updated" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// DELETE SPARE PART
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM spare_parts WHERE id=?', [req.params.id]);
    res.json({ success: true, message: "Spare Part Deleted" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
