const express = require('express');
const router = express.Router();
const axios = require('axios');

const fs = require('fs');
const multer = require('multer');
const file = multer({ dest: 'resource/temps/' });
const FormData = require('form-data');

const BASE_URL = process.env.PRODUCT_SERVICE;

//Get all
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories/`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.send(error.message);
    }
});

//Get by id
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

//Create
router.post('/', file.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath), req.file.originalname);
        for (const key in req.body) {
            form.append(key, req.body[key]);
        }
        const response = await axios.post(`${BASE_URL}/api/categories`, form, {
            headers: {
                ...form.getHeaders()
            },
        });
        fs.unlinkSync(filePath);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.send(error.message);
    }
});

router.put('/:id', file.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath), req.file.originalname);
        for (const key in req.body) {
            form.append(key, req.body[key]);
        }
        const response = await axios.put(`${BASE_URL}/api/categories/${req.params.id}`, form, {
            headers: {
                ...form.getHeaders()
            },
        });
        fs.unlinkSync(filePath);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

//Delete by id
router.delete('/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/categories/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

module.exports = router;