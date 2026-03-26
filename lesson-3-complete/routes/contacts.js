const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect'); // MongoDB connection module

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const contacts = await db.collection('contacts').find().toArray();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Create a new contact (All fields required)
router.post('/', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' });
    }

    try {
        const db = getDB();
        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await db.collection('contacts').insertOne(newContact);
        res.status(201).json({ id: result.insertedId });  // Return new contact ID
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Update an existing contact by ID
router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required to update the contact' });
    }

    try {
        const db = getDB();
        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).json({ message: 'Contact updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE - Delete a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;