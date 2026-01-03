#!/bin/sh

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding database (creating admin user if not exists)..."
node scripts/seed.js

echo "Starting application..."
exec node server.js

