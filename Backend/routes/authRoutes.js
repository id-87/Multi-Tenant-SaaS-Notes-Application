const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const authenticateToken = require('./middleware'); 

const saltRounds = 10;
const jwtSecret = "ver";

router.use(express.json());

router.post("/signup", async (req, res) => {
    const { email, password, role, tenantSlug } = req.body;
    
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const tenant = await prisma.tenant.findUnique({
            where: { slug: tenantSlug }
        });

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        };

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role.toUpperCase(),
                tenantId: tenant.id
            }
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        };

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

router.post("/tenants/:slug/upgrade", authenticateToken, async (req, res) => {
    const { slug } = req.params;

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Access denied" });
    };

    try {
        const tenantToUpgrade = await prisma.tenant.findUnique({
            where: { slug: slug }
        });

        if (!tenantToUpgrade) {
            return res.status(404).json({ message: "Tenant not found" });
        };

        const requestingTenantId = req.user.tenantId;
        if (tenantToUpgrade.id !== requestingTenantId) {
            return res.status(403).json({ message: "Access denied" });
        };
        
        await prisma.tenant.update({
            where: { slug: slug },
            data: { subscription: 'Pro' }
        });

        res.status(200).json({ message: "Subscription upgraded" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
});

module.exports = router;