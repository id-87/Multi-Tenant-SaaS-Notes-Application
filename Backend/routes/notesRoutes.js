const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require('./middleware');

router.use(express.json());

router.post("/", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const { tenantId, id: authorId } = req.user;

    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
        });

        if (tenant.subscription === "Free") {
            const notesCount = await prisma.note.count({
                where: { tenantId }
            });

            const FREE_NOTE_LIMIT = 3;
            if (notesCount >= FREE_NOTE_LIMIT) {
                return res.status(403).json({ message: "Upgrade to pro for adding more notes" });
            };
        };

        await prisma.note.create({
            data: {
                title,
                content,
                tenantId,
                authorId
            }
        });

        res.status(201).json({ message: "Note added" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.get("/", authenticateToken, async (req, res) => {
    const { tenantId } = req.user;
    
    try {
        const allNotes = await prisma.note.findMany({
            where: { tenantId }
        });
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.get("/:id", authenticateToken, async (req, res) => {
    const { id: noteId } = req.params;
    const { tenantId } = req.user;

    try {
        const note = await prisma.note.findUnique({
            where: { id: noteId }
        });

        if (!note || note.tenantId !== tenantId) {
            return res.status(404).json({ message: "Note not found or no access" });
        };

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.put("/:id", authenticateToken, async (req, res) => {
    const { id: noteId } = req.params;
    const body = req.body;
    const { tenantId, id: userId } = req.user;

    try {
        const noteToUpdate = await prisma.note.findUnique({
            where: { id: noteId }
        });

        if (!noteToUpdate || noteToUpdate.tenantId !== tenantId || noteToUpdate.authorId !== userId) {
            return res.status(403).json({ message: "No permission to update this note" });
        };

        const updatedNote = await prisma.note.update({
            where: { id: noteId },
            data: body
        });

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.delete("/:id", authenticateToken, async (req, res) => {
    const { id: noteId } = req.params;
    const { tenantId, id: userId } = req.user;

    try {
        const noteToDelete = await prisma.note.findUnique({
            where: { id: noteId }
        });

        if (!noteToDelete || noteToDelete.tenantId !== tenantId || noteToDelete.authorId !== userId) {
            return res.status(403).json({ message: "No permission to delete this note" });
        };

        await prisma.note.delete({
            where: { id: noteId }
        });

        res.status(200).json({ message: `Note deleted with id:${noteId}` });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

module.exports = router;