# Repository Guidelines

## Project Structure & Module Organization

This repository is a small React 18 mobile wedding invitation built with Vite. Application code lives in `src/`:

- `src/main.jsx` mounts the React application.
- `src/App.jsx` contains page sections, invitation data, countdown logic, gallery, and lightbox behavior.
- `src/App.css` contains component and section styling.
- `src/index.css` defines global resets, fonts, color variables, and shared animation rules.
- `src/assets/` stores bundled images such as `wedding-oil-painting.jpeg`.

Static HTML metadata is in `index.html`; Vite configuration is in `vite.config.js`. Generated `dist/` and dependency `node_modules/` directories must not be committed.

## Build, Test, and Development Commands

- `npm install` installs locked dependencies from `package-lock.json`.
- `npm run dev` starts Vite’s local development server with hot reload.
- `npm run build` produces the deployable site in `dist/` and catches import or compilation failures.
- `npm run preview` serves the production build locally for final verification.

Run `npm run build` before opening a pull request.

## Coding Style & Naming Conventions

Use modern JSX and ES modules with 2-space indentation. Follow the existing style: single quotes in JavaScript, no semicolons, and small function components. Name React components in PascalCase (`GallerySection`), hooks in camelCase with a `use` prefix (`useInView`), and CSS classes in lowercase kebab-case (`hero-artwork`). Keep editable invitation details centralized in the `INFO` and `SHUTTLE` constants rather than scattering literals through markup.

There is currently no configured formatter or linter; keep changes consistent with surrounding code and review `git diff --check` for whitespace errors.

## Testing Guidelines

No automated test framework or coverage requirement is configured. Validate every change with `npm run build`, then inspect the page through `npm run dev` at a narrow mobile viewport (for example, 390×844). Check countdown output, scroll animations, links, map embeds, gallery interactions, and text readability over artwork.

## Commit & Pull Request Guidelines

History uses Conventional Commit-style prefixes with concise Korean descriptions, for example `feat: 네이버맵 버튼 추가` and `fix: 히어로 이름/날짜 가독성 개선`. Continue using `feat:`, `fix:`, `style:`, or `chore:` with one focused change per commit.

Pull requests should explain the user-visible result, list verification performed, and include before/after mobile screenshots for visual changes. Link related issues when available. Never commit real phone numbers, private account details, or unlicensed image assets without explicit approval.
