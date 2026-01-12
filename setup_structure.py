import os

folders = [
    # App root already exists as startup-web/app

    # Marketing (public)
    "startup-web/app/(marketing)",
    "startup-web/app/(marketing)/features",
    "startup-web/app/(marketing)/pricing",
    "startup-web/app/(marketing)/about",
    "startup-web/app/(marketing)/contact",

    # Authentication
    "startup-web/app/(auth)",
    "startup-web/app/(auth)/login",
    "startup-web/app/(auth)/register",
    "startup-web/app/(auth)/forgot-password",

    # Dashboard (protected)
    "startup-web/app/(dashboard)",
    "startup-web/app/(dashboard)/profile",
    "startup-web/app/(dashboard)/feedback",
    "startup-web/app/(dashboard)/reviews",
    "startup-web/app/(dashboard)/settings",

    # API routes
    "startup-web/app/api",
    "startup-web/app/api/auth",
    "startup-web/app/api/reviews",
    "startup-web/app/api/feedback",
    "startup-web/app/api/admin",

    # FEATURES — Business Logic (VERY IMPORTANT)
    "startup-web/features/auth",
    "startup-web/features/reviews",
    "startup-web/features/feedback",
    "startup-web/features/users",

    # LIB — Shared Logic
    "startup-web/lib",

    # DATABASE — Prisma
    "startup-web/prisma/migrations",

    # UI & COMPONENTS
    "startup-web/components/ui",
    "startup-web/components/layout",
    "startup-web/components/forms",
    "startup-web/components/feedback",
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

print("Project structure created successfully.")
