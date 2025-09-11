# Next.js Template - Copilot Agent Instructions

This repository is a comprehensive Next.js 14+ template with App Router, designed as a production-ready starting point for modern web applications. These instructions will help you work efficiently with the codebase.

## Repository Overview

**Tech Stack**: Next.js 15.2.4, React 19, TypeScript, TailwindCSS, Biome.js, Sentry, React Query, Zod, React Hook Form  
**Package Manager**: pnpm 9.1.0 (required)  
**Node Version**: 18.18.0 (specified in .nvmrc)  
**Size**: ~1,100 dependencies, medium-sized project with comprehensive tooling

**Key Features**: Type-safe environment variables, internationalization (en/sl), API client generation from OpenAPI specs, comprehensive UI component library (Shadcn/UI), error tracking, and modern development tooling.

## Build & Development Commands

### Essential Prerequisites
1. **Node.js 18.18.0** - Use `nvm use` to switch to the correct version
2. **pnpm 9.1.0** - Install with `npm install -g pnpm` if not available
3. **Install dependencies**: Always run `pnpm install` first (takes ~40-60 seconds)

### Core Commands (in order of typical usage)
```bash
# 1. Install dependencies (ALWAYS RUN FIRST)
pnpm install

# 2. Lint and format code (runs in ~35ms)
pnpm lint           # Check for issues
pnpm lint:fix       # Auto-fix issues

# 3. Type checking (critical for TypeScript projects)
pnpm tsc --noEmit   # Type check without compilation

# 4. Run tests (takes ~7 seconds, 8 tests)
pnpm test           # Run all tests once
pnpm test:watch     # Run tests in watch mode

# 5. Validate translations (if working with i18n)
pnpm i18n           # Validates translation files consistency

# 6. Development server (requires environment setup)
pnpm dev            # Start development server with hot reload

# 7. Production build (see known issues below)
pnpm build          # Build for production
pnpm start          # Start production server
```

### Known Build Issues & Workarounds

**Google Fonts Network Issue**: The build may fail with `getaddrinfo ENOTFOUND fonts.googleapis.com` in isolated environments. This affects the `Inter` font import in `src/app/layout.tsx`. If this occurs:
- For temporary fixes: Comment out the font import or use a local font
- For CI/CD: Ensure network access to fonts.googleapis.com or configure font fallbacks

**Infisical Dependency**: `pnpm dev` and `pnpm gen-api` require Infisical CLI for secrets management. In environments without Infisical:
- Use `next dev` directly instead of `pnpm dev`
- Set environment variables manually using `.env.local` based on `.env.example`

**Environment Variables**: Required for production builds:
- `SENTRY_AUTH_TOKEN` (server-side, for error tracking)
- `NEXT_PUBLIC_SENTRY_DSN` (optional, for client-side error tracking)
- `NEXT_PUBLIC_API_URL` (optional, for API client generation)

## Project Architecture & File Structure

### Core Directories
- **`src/app/`** - Next.js App Router pages, layouts, and API routes
- **`src/components/`** - Reusable UI components (common, examples, ui subdirectories)
- **`src/lib/`** - Utility functions, custom hooks, and shared logic
- **`src/i18n/`** - Internationalization files (currently supports en/sl)
- **`src/api/`** - Auto-generated API clients from OpenAPI specs (via Orval)
- **`scripts/`** - Development automation (API generation, translation validation)

### Configuration Files
- **`biome.jsonc`** - Linting, formatting, and import organization (replaces ESLint/Prettier)
- **`tailwind.config.ts`** - TailwindCSS with custom theme, animations, and plugins
- **`jest.config.ts`** - Testing configuration with Next.js integration
- **`next.config.mjs`** - Next.js configuration with Sentry integration and webpack customizations
- **`orval.config.ts`** - API client generation from OpenAPI specifications
- **`package.json`** - Defines all available scripts and dependencies

### Key Source Files
- **`src/env.ts`** - Type-safe environment variable validation using T3-oss/env-nextjs
- **`src/app/layout.tsx`** - Root layout with font configuration and providers
- **`src/middleware.ts`** - Next.js middleware for request processing
- **`src/i18n/i18n.ts`** - Internationalization configuration

## CI/CD & Validation Pipeline

### GitHub Workflows (all run automatically)
1. **Lint workflow** (`.github/workflows/lint.yml`) - Runs on every push/PR:
   - Executes `pnpm lint` for code quality
   - Runs `pnpm tsc` for type checking
   
2. **Test workflow** (`.github/workflows/test.yml`) - Runs on PRs:
   - Executes `pnpm test` with frozen lockfile installation
   
3. **i18n workflow** (`.github/workflows/i18n.yml`) - Runs on PRs to master:
   - Validates translation consistency with `pnpm i18n`

### Pre-commit Hooks (via Husky)
- **pre-commit**: Runs `lint-staged` which applies Biome formatting/linting to staged files
- **commit-msg**: Enforces conventional commits using commitlint

### Manual Validation Steps
```bash
# Full validation sequence before submitting changes:
pnpm install        # Ensure dependencies are current
pnpm lint           # Check code quality
pnpm tsc --noEmit   # Verify type safety
pnpm test           # Run test suite
pnpm i18n           # Validate translations (if modified)
# pnpm build        # Only if needed (may fail due to fonts issue)
```

## Development Best Practices

### Code Style & Quality
- **Biome.js handles all formatting** - configured for 80-character lines, 2-space indentation
- **Import organization** is automatic - non-relative imports are prioritized
- **TypeScript strict mode** is enabled - all code must be fully typed
- **Conventional commits** are enforced via commitlint

### Component Development
- Use **Shadcn/UI components** from `src/components/ui/` for consistent design
- **Example components** in `src/components/examples/` show best practices
- **Form handling** uses React Hook Form + Zod validation (see form examples)

### API Integration
- **Generate API clients** with `pnpm gen-api` from OpenAPI specs
- **React Query** is pre-configured for data fetching
- **Custom Axios instance** in `src/lib/axios-instance.ts` for request configuration

### Internationalization
- Add new translations in `src/i18n/[locale]/` directories
- Update `src/i18n/i18n.ts` when adding new locales
- Always run `pnpm i18n` after translation changes

## Common Troubleshooting

### Build Failures
1. **Font loading errors**: Network connectivity issue with Google Fonts
2. **Type errors**: Run `pnpm tsc --noEmit` to identify TypeScript issues
3. **Environment variables**: Check `src/env.ts` for required variables

### Development Issues
1. **Infisical not found**: Use `next dev` directly or set up local environment variables
2. **Import errors**: Biome auto-organizes imports - let it run or use `pnpm lint:fix`
3. **Test failures**: Ensure all dependencies are installed with `pnpm install`

## Trust These Instructions

These instructions are comprehensive and tested. Only search for additional information if:
- The instructions are incomplete for your specific task
- You encounter errors not covered in the troubleshooting section
- You need to understand implementation details not covered here

Always start with the essential prerequisites and core commands before exploring the codebase manually.