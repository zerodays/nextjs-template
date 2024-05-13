# Next.js Template

Welcome to the Next.js Template project! This template is designed to be the ideal starting point for your modern NextJS applications, streamlining the development process right from the get-go.

## 🚀 Quick Start

Getting started with this Next.js template is straightforward. Follow these steps to create your new project using this template:

1. **Create a new Next.js app using this template**:

   Run the following command in your terminal to create a new project with this template:

   ```bash
   npx create-next-app@latest your-project-name --example https://github.com/zerodays/nextjs-template
   ```

2. **Navigate into your new project folder**:

   ```bash
   cd your-project-name
   ```

3. **Install dependencies**:

   ```bash
   pnpm i
   ```

4. **Run the development server**:

   ```bash
   pnpm dev
   ```

## 📂 Project Structure

Here's an overview of the folder structure provided in this template:

```
.
├── .husky              # Husky configurations for Git hooks
├── .next               # Auto-generated folder for optimized production builds
├── .vscode             # VSCode settings for consistent development environment
├── node_modules        # Project dependencies
├── public              # Static assets like images and fonts
├── src                 # Source files for your Next.js application
│   ├── app             # Page components
│   ├── components      # Reusable components
|   |   ├── ui          # UI / Shadcn components
│   |   └── [name]      # Your custom component folders
│   └── utils           # Utility functions and helpers
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Specifies intentionally untracked files to ignore
├── .prettierrc.js      # Prettier configuration for code formatting
├── next-env.d.ts       # TypeScript definitions for Next.js
├── next.config.mjs     # Configuration for Next.js
├── package-lock.json   # Auto-generated file to keep track of exact dependency versions
├── package.json        # Project metadata and dependencies
├── postcss.config.mjs  # PostCSS configuration for processing CSS
├── README.md           # The file you are reading right now
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript compiler configuration
```

## 🔧 Configuration

This template comes pre-configured with ESLint, Prettier, and Husky to ensure your code remains clean and consistent. Here are a few highlights about the configurations:

- **ESLint**: Helps in identifying and reporting on patterns found in ECMAScript/JavaScript code, with the aim of making code more consistent and avoiding bugs.
- **Prettier**: An opinionated code formatter that supports many languages and integrates with most editors. It removes all original styling and ensures that all outputted code conforms to a consistent style.
- **Husky**: Used to apply pre-commit hooks, allowing you to run scripts before committing.

## 💡 Tips

- Customize the `.eslintrc.json`, `.prettierrc.js`, and `tailwind.config.ts` to suit your coding style and project requirements.
- Use the `public` directory to store static assets such as images, fonts, and `robots.txt`.
- Explore the Next.js [official documentation](https://nextjs.org/docs) for more in-depth information about its features and API.

This README is designed to get you up and running quickly with a new Next.js project based on this template. For more detailed information about configuring and extending your project, please refer to the individual configuration files and their respective documentation.

Feel free to clone, fork, and adapt this template to fit your needs. Happy coding! 🎉
