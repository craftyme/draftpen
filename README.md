# Draftpen

Draftpen is a visual editor for creating and editing professional-quality visual assets, focusing on screenshot beautification, code snippets, tweet captures, and LinkedIn carousels.

## Features

- **Screenshot Editor**: Transform plain screenshots into professional-looking assets with frames, shadows, and backgrounds.
- **Code Image Generator**: Create beautiful, syntax-highlighted code snippets for documentation, social media, or presentations.
- **Tweet Importer**: Generate clean images of tweets for sharing on other platforms.
- **Image Tools**: Comprehensive suite of image manipulation tools including resizing, cropping, compression, and more.
- **PDF Tools**: Convert between PDF and various image formats.
- **Style Guide**: Interactive documentation of the design system with live examples.

## Tech Stack

- Next.js 15 using App Router
- React 19+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- html-to-image for DOM-to-image conversion
- react-syntax-highlighter for code formatting

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/craftyme/draftpen.git
cd draftpen
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Screenshot Editor
1. Upload or drag and drop your screenshot
2. Customize the frame, size, roundness, shadow, and rotation
3. Adjust the canvas background color
4. Download the image or copy to clipboard

### Code Editor
1. Enter your code or use the default example
2. Select the programming language
3. Choose a theme (VSCode Dark+, VSCode Light, Atom Dark, etc.)
4. Customize padding, border radius, font size, and line numbers
5. Download the image or copy to clipboard

### Tweet Editor
1. Enter tweet content, author name, username, and other details
2. Toggle the verified badge
3. Choose between light and dark theme
4. Adjust padding, border radius, and font size
5. Download the image or copy to clipboard

### Style Guide
1. Navigate to `/style-guide` to view the interactive design system documentation
2. Explore design tokens, components, and utilities
3. View code examples and live previews for all UI elements

## Deployment

The easiest way to deploy your Draftpen app is to use the [Vercel Platform](https://vercel.com/new). Connect your GitHub repository to Vercel and it will automatically build and deploy your app.

For manual deployment:
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## License

[MIT](LICENSE)
