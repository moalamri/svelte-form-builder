# Svelte Form Builder

A modern, drag-and-drop form builder built with Svelte 5

[![Test and Deploy](https://github.com/moalamri/svelte-form-builder/actions/workflows/test-and-deploy.yml/badge.svg)](https://github.com/moalamri/svelte-form-builder/actions/workflows/test-and-deploy.yml)

---

> [!IMPORTANT]
> This project is currently under active development. Many things may change as I continue to improve the form builder.

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

## Elements

### Form Fields

- Text Input
- Checkbox
- Radio Buttons
- Textarea

### UI Elements

- Title
- Divider

### Containers (soon)

- Group elements together

## Testing

This project includes testing with Playwright:

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
- [AutoAnimate](https://auto-animate.formkit.com/)
