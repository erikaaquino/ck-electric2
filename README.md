# CK Electric Monorepo

A monorepo containing CK Electric's Next.js web application and WordPress headless CMS.

## Structure

```
ck-electric-monorepo/
├── client/          # Next.js web application
├── wordpress/        # WordPress headless CMS
└── README.md
```

## Web Application (client/)

A modern web application built with Next.js and WordPress as a headless CMS using the REST API.

### Features

- 🚀 **Next.js 16** with App Router
- 📝 **WordPress Headless CMS** integration
- 🔄 **REST API** for content fetching
- 🎨 **Tailwind CSS** with custom design tokens
- 📱 **Responsive design** with mobile-first approach
- ⚡ **SSR performance** with client-side enhancements
- 🖼️ **Material Icons** integration
- 📄 **Component-based architecture**
- 🔍 **Dynamic routing** for pages and posts

### Getting Started

#### Prerequisites

- Node.js 18+ installed
- A WordPress site with REST API enabled
- WordPress site should have some posts with featured images

#### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp client/.env.example client/.env.local
```

3. Update `client/.env.local` with your WordPress site URL:
```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## WordPress CMS (wordpress/)

WordPress configuration for the headless CMS setup.

### Features

- 📝 **REST API** enabled
- 🖼️ **Featured images** support
- 📄 **Custom post types**
- 🔍 **SEO optimization**
- 📱 **Responsive admin**

### Setup

1. Install WordPress in the `wordpress/` directory
2. Configure REST API endpoints
3. Set up custom post types and taxonomies
4. Configure featured images
5. Set up CORS for Next.js application

## Development Workflow

### Monorepo Commands

From the root directory:

```bash
# Install all dependencies
npm install

# Run web app development
npm run dev

# Build web app
npm run build

# Start production web app
npm run start

# Lint web app
npm run lint

# Type check web app
npm run type-check
```

### Workspace-Specific Commands

Navigate to specific workspace:

```bash
# Web app specific
cd client
npm run dev

# WordPress specific
cd wordpress
# WordPress CLI commands
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── posts/
│   │   ├── page.tsx          # Posts listing page
│   │   └── [slug]/
│   │       └── page.tsx      # Single post page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   └── wordpress.ts          # WordPress API service
└── components/               # Reusable components
```

## WordPress Configuration

### Enable REST API

Make sure your WordPress site has the REST API enabled. It's enabled by default in WordPress 4.7+.

### Required Plugins

For the best experience, install these WordPress plugins:

1. **Classic Editor** (if you prefer the classic editor)
2. **Regenerate Thumbnails** (to ensure proper image sizes)
3. **WP REST API Cache** (for better performance)

### API Endpoints Used

- `/wp/v2/posts` - Fetch posts
- `/wp/v2/posts/{slug}` - Fetch single post by slug
- `/wp/v2/categories` - Fetch categories
- `/wp/v2/tags` - Fetch tags

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Styling

The project uses Tailwind CSS. You can customize the theme in `tailwind.config.js`.

### WordPress API

The WordPress API service is located in `src/lib/wordpress.ts`. You can extend it with additional endpoints as needed.

### Components

Add reusable components in the `src/components/` directory.

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js applications.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, add this code to your WordPress theme's `functions.php`:

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

### Images Not Loading

Ensure your WordPress site allows hotlinking or configure proper CORS headers for media files.

### 404 Errors

Check that:
1. Your WordPress URL is correct in `.env.local`
2. The REST API is enabled on your WordPress site
3. Posts are published (not in draft status)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
