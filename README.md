# Svelte Form Builder

A modern, drag-and-drop form builder built with Svelte 5, featuring an intuitive visual interface for creating dynamic forms.

[![Deploy to Cloudflare Pages](https://github.com/moalamri/svelte-form-builder/actions/workflows/deploy.yml/badge.svg)](https://github.com/moalamri/svelte-form-builder/actions/workflows/deploy.yml)
[![Playwright Tests](https://github.com/moalamri/svelte-form-builder/actions/workflows/test.yml/badge.svg)](https://github.com/moalamri/svelte-form-builder/actions/workflows/test.yml)

---

> [!IMPORTANT]
> This project is currently under active development. Many things may change as I continue to improve the form builder.

## Features

- **Drag & Drop Interface** - Intuitive visual form building
- **Modern UI** - Clean, responsive interface built with Tailwind CSS
- **Real-time Settings** - Live form element configuration
- **Multiple Element Types** - Form fields, UI elements, and containers
- **JSON Export** - Export your forms as structured data

## Quick Start

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/moalamri/svelte-form-builder.git
   cd svelte-form-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Supported Elements

### Form Fields

- Text Input
- Checkbox
- Radio Buttons
- Textarea

### UI Elements

- Title
- Divider

### Containers

- Group elements together

## Customization

The form builder is designed to be easily extensible. You can:

- Add new form elements in `src/lib/components/elements/`
- Customize element settings in `src/lib/components/editor/`
- Modify the styling using Tailwind CSS classes

## Testing

This project includes comprehensive testing with Playwright:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Svelte](https://svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
