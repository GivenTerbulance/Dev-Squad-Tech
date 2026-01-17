import os

structure = [
    "src/app/(auth)/login",
    "src/app/(auth)/register",
    "src/app/(auth)/forgot-password",
    "src/app/(dashboard)",
    "src/components/ui",
    "src/components/forms",
    "src/components/navigation",
    "src/features/auth",
    "src/features/reviews",
    "src/features/feedback",
    "src/features/ratings",
    "src/lib",
    "src/styles",
    "src/types",
    "public",
    "prisma",
    "scripts",
]

files = [
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/(auth)/login/page.tsx",
    "src/app/(auth)/register/page.tsx",
    "src/app/(auth)/forgot-password/page.tsx",
    "src/app/(dashboard)/layout.tsx",
    "src/app/(dashboard)/page.tsx",
    "src/lib/auth.ts",
    "src/lib/validators.ts",
    "middleware.ts",
    ".env.example",
    "README.md",
]

def create_structure():
    for folder in structure:
        os.makedirs(folder, exist_ok=True)

    for file in files:
        if not os.path.exists(file):
            with open(file, "w") as f:
                pass

    print(" Project structure created successfully.")

if __name__ == "__main__":
    create_structure()
