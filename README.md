# Draftpen

Draftpen is a visual editor for creating and editing professional-quality visual assets, focusing on screenshot beautification, code snippets, tweet captures, and LinkedIn carousels.

## Features

- **Screenshot Editor**: Transform plain screenshots into professional-looking assets with frames, shadows, and backgrounds.
- **Code Image Generator**: Create beautiful, syntax-highlighted code snippets for documentation, social media, or presentations.
- **Tweet Importer**: Generate clean images of tweets for sharing on other platforms.

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

## Deployment

The easiest way to deploy your PixelPerfect app is to use the [Vercel Platform](https://vercel.com/new). Connect your GitHub repository to Vercel and it will automatically build and deploy your app.

## License

[MIT](LICENSE)
