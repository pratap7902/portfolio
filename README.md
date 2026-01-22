# Portfolio - Chandra Pratap Singh Chauhan

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ Modern UI with dark mode support
- 📱 Fully responsive design
- 🎨 Smooth animations with Framer Motion
- 🖼️ Optimized images with Next.js Image
- 🎯 SEO optimized
- ⚡ Fast performance with Next.js Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t portfolio .
```

### Run Docker Container

```bash
docker run -p 3000:3000 portfolio
```

## 🌐 Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js app:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

Vercel will automatically detect Next.js and configure everything!

### Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   │   ├── layout/    # Layout components
│   │   ├── sections/  # Page sections
│   │   └── ui/        # UI components
│   └── lib/           # Utility functions
├── Dockerfile          # Docker configuration
└── next.config.ts     # Next.js configuration
```

## 🎨 Customization

### Update Personal Information

Edit the following files:
- `src/components/sections/hero.tsx` - Hero section
- `src/components/sections/about.tsx` - About section
- `src/components/sections/experience.tsx` - Experience
- `src/components/sections/projects.tsx` - Projects
- `src/components/sections/achievements.tsx` - Achievements

### Add Your Photos

Place your images in the `public/` directory and reference them in components.

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Chandra Pratap Singh Chauhan**
- GitHub: [@pratap7902](https://github.com/pratap7902)
- Portfolio: [Your deployed URL]

---

Built with ❤️ using Next.js
