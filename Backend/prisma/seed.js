const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Hash password for all users
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Tenants
  const acmeTenant = await prisma.tenant.upsert({
    where: { slug: 'acme' },
    update: {},
    create: {
      slug: 'acme',
      name: 'Acme Corporation',
      subscription: 'FREE'
    }
  });

  const globexTenant = await prisma.tenant.upsert({
    where: { slug: 'globex' },
    update: {},
    create: {
      slug: 'globex',
      name: 'Globex Corporation',
      subscription: 'FREE'
    }
  });

  console.log('Tenants created:', { acmeTenant, globexTenant });

  // Create Users for Acme
  const acmeAdmin = await prisma.user.upsert({
    where: { email: 'admin@acme.test' },
    update: {},
    create: {
      email: 'admin@acme.test',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: acmeTenant.id
    }
  });

  const acmeUser = await prisma.user.upsert({
    where: { email: 'user@acme.test' },
    update: {},
    create: {
      email: 'user@acme.test',
      password: hashedPassword,
      role: 'MEMBER',
      tenantId: acmeTenant.id
    }
  });

  // Create Users for Globex
  const globexAdmin = await prisma.user.upsert({
    where: { email: 'admin@globex.test' },
    update: {},
    create: {
      email: 'admin@globex.test',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: globexTenant.id
    }
  });

  const globexUser = await prisma.user.upsert({
    where: { email: 'user@globex.test' },
    update: {},
    create: {
      email: 'user@globex.test',
      password: hashedPassword,
      role: 'MEMBER',
      tenantId: globexTenant.id
    }
  });

  console.log('Users created:', {
    acmeAdmin: acmeAdmin.email,
    acmeUser: acmeUser.email,
    globexAdmin: globexAdmin.email,
    globexUser: globexUser.email
  });

  // Create sample notes for each user
  const sampleNotes = [
    {
      title: 'Welcome to Acme',
      content: 'This is the first note for Acme Corporation.',
      tenantId: acmeTenant.id,
      authorId: acmeAdmin.id
    },
    {
      title: 'Meeting Notes',
      content: 'Discussed new project requirements and timelines.',
      tenantId: acmeTenant.id,
      authorId: acmeUser.id
    },
    {
      title: 'Globex Project Ideas',
      content: 'Brainstorming session for new initiatives.',
      tenantId: globexTenant.id,
      authorId: globexAdmin.id
    },
    {
      title: 'Weekly Report',
      content: 'Summary of this week activities and progress.',
      tenantId: globexTenant.id,
      authorId: globexUser.id
    }
  ];

  for (const noteData of sampleNotes) {
    await prisma.note.create({
      data: noteData
    });
  }

  console.log('Sample notes created');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });