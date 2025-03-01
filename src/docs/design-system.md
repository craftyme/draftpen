# Draftpen Design System

Draftpen uses an Apple-inspired design system that emphasizes clarity, simplicity, and elegant user interactions. This document outlines the key principles and components of our design system.

## Design Principles

1. **Clarity:** Content is the focus. UI elements should be clear and unobtrusive.
2. **Deference:** The UI helps users understand and interact with content, but never competes with it.
3. **Depth:** Visual layers and realistic motion convey hierarchy and enable understanding.

## Color System

Our color palette is inspired by Apple's design language and focuses on clean, minimal aesthetics:

- **Primary Blue (#0071e3):** Used for primary actions, highlights, and brand elements
- **Light Gray (#f5f5f7):** Used for backgrounds, subtle fills, and secondary elements
- **Dark Gray (#1d1d1f):** Used for text and UI in light mode
- **Text Gray (#86868b):** Used for secondary text and less important elements

The color system is defined using CSS variables in `src/styles/design-tokens.css` and automatically adapts to dark mode.

## Typography

We use a type system with specific weights to create a clean, minimal look:

- **Light (300):** Used for body text and general content
- **Regular (400):** Used for UI elements, buttons, and interactive elements
- **Medium (500):** Used for headings, titles, and emphasis
- **Semibold (600):** Used sparingly for extra emphasis

Font sizes follow a consistent scale defined in our design tokens.

## Components

Our UI components follow these guidelines:

### Buttons
- Small by default with minimal padding
- No shadows and subtle borders
- Clear hover states
- Thinner font weight (400)
- Use cursor pointer for all interactive states

### Cards
- Subtle borders instead of heavy shadows
- Clean internal spacing (24px padding)
- Lighter font weight for descriptions and content
- Rounded corners (16px)

### Navigation
- Compact tabs with small icons
- Lightweight text labels
- Subtle background change on hover and active states
- Cursor pointer to indicate clickable areas

### Form Elements
- Clean, minimal styling
- Light borders and subtle state changes
- No heavy outlines or shadows
- Appropriate cursor styles (pointer for clickable elements, text for text inputs)

## Animation

Animations follow Apple's smooth motion guidelines:

- Timing function: cubic-bezier(0.25, 0.1, 0.25, 1)
- Subtle, purposeful transitions
- Quick feedback for user interactions

## Interaction Design

Interaction cues are subtle but clear:

- **Cursors:** Hand cursor (pointer) for all clickable elements including buttons, links, tabs, and interactive components
- **Hover States:** Subtle background or opacity changes to indicate interactivity
- **Focus States:** Minimal but visible focus rings for accessibility
- **Transitions:** Smooth transitions between states using Apple's timing function
- **Disabled States:** Reduced opacity and default cursor for disabled elements

## Implementation

All design system elements are implemented through:

1. CSS variables (design tokens) in `src/styles/design-tokens.css`
2. Component styling in individual component files
3. Global styles in `src/app/globals.css`

When implementing new features, refer to the style guide at `/style-guide` to ensure consistency with our design system.

## Best Practices

- Use design tokens instead of hardcoded values
- Follow established patterns for new components
- Maintain a light, minimal aesthetic
- Prioritize clarity and usability over decoration
- Test components in both light and dark mode
- Ensure proper cursor feedback for all interactive elements
