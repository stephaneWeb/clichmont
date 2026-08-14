# Clichmont

Clichmont is a Symfony-based landing page for an AI compute and GPU infrastructure brand.  
This repository includes the full website source code, templates, styles, images, and compiled frontend assets so the project can be installed and run locally on another machine.

## Tech Stack

- PHP 8.4+
- Symfony 8.1
- Twig
- Webpack Encore
- Sass
- Bootstrap 5
- Node.js / npm

## Repository Contents

The repository includes everything needed to run the project locally:

- `src/` for Symfony controllers and PHP code
- `templates/` for Twig templates
- `assets/` for source CSS/SCSS and JavaScript
- `public/` for the web root, images, and compiled frontend assets
- `config/` for Symfony configuration
- `composer.json` and `composer.lock` for PHP dependencies
- `package.json` and `package-lock.json` for frontend dependencies

## Prerequisites

Install the following before starting:

- PHP 8.4 or newer
- [Composer](https://getcomposer.org/)
- Node.js 20+ and npm
- Git

Optional but recommended:

- [Symfony CLI](https://symfony.com/download)

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/clichmont.git
cd clichmont
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Configure local environment

The project already contains a default `.env` file for development.

For local overrides, create a `.env.local` file if needed.

Example:

```env
APP_ENV=dev
APP_SECRET=change-this-to-a-random-string
```

Important:

- The current homepage works without a database connection because its content is rendered from static controller data.
- Doctrine is installed in the project, so if future features use the database, define `DATABASE_URL` in `.env.local`.

Example PostgreSQL config:

```env
DATABASE_URL="postgresql://app:password@127.0.0.1:5432/app?serverVersion=16&charset=utf8"
```

### 5. Build frontend assets

For a production-style local build:

```bash
npm run build
```

For local development with rebuilds on file change:

```bash
npm run watch
```

## Run the Project Locally

### Option A: Symfony CLI

```bash
symfony server:start
```

Then open:

```text
http://127.0.0.1:8000
```

### Option B: Native PHP server

```bash
php -S 127.0.0.1:8000 -t public
```

Then open:

```text
http://127.0.0.1:8000
```

## Useful Commands

Install backend dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Build assets:

```bash
npm run build
```

Watch assets during development:

```bash
npm run watch
```

Clear Symfony cache:

```bash
php bin/console cache:clear
```

## Notes for Sharing the Project

If you send this project as a ZIP instead of Git:

- include the full project root
- keep `public/` in the archive
- keep `public/images/` and compiled `public/build/` assets
- keep `templates/base.html.twig`
- keep `composer.lock` and `package-lock.json` for reproducible installs

## Troubleshooting

### Composer install fails

Make sure the target machine is using PHP 8.4+:

```bash
php -v
```

### Frontend assets do not load

Reinstall Node dependencies and rebuild:

```bash
npm install
npm run build
```

### Port 8000 is already in use

Run the local server on another port:

```bash
php -S 127.0.0.1:8080 -t public
```

## License

This project is private and proprietary unless the repository owner explicitly provides another license.
