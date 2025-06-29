
# Meeting Application

A modern, web-based video conferencing application built with React, TypeScript, and WebRTC. This application provides a complete meeting experience with video/audio calls, screen sharing, real-time chat, and meeting scheduling capabilities.

## 🚀 Features

- **Video Conferencing**: High-quality video and audio calls using WebRTC
- **Screen Sharing**: Share your screen with meeting participants
- **Real-time Chat**: Text messaging with inline replies and voice notes
- **Meeting Scheduling**: Schedule meetings with calendar integration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS and Shadcn/ui

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **State Management**: TanStack React Query
- **Media**: WebRTC APIs
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **Bun** (recommended)
- **Modern web browser** with WebRTC support (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meeting-application
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using Bun (recommended)
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using Bun
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Environment Configuration

This application runs entirely on the client side and doesn't require environment variables for basic functionality. However, for future enhancements, you may need:

```env
# Future environment variables (when backend is added)
VITE_API_URL=your_api_url
VITE_WEBSOCKET_URL=your_websocket_url
VITE_TURN_SERVER_URL=your_turn_server_url
```

## 💻 Local Development Setup

### Development Server
```bash
bun run dev
```
- Starts Vite development server
- Hot module replacement enabled
- Accessible at `http://localhost:5173`

### Type Checking
```bash
bun run type-check
```
- Runs TypeScript compiler in check mode
- Validates all TypeScript files

### Linting
```bash
bun run lint
```
- Runs ESLint on all source files
- Checks for code quality and consistency

### Building for Production
```bash
bun run build
```
- Creates optimized production build
- Output directory: `dist/`

### Preview Production Build
```bash
bun run preview
```
- Serves the production build locally
- Useful for testing before deployment

## 🧪 Testing

Currently, the project uses manual testing. For automated testing setup:

```bash
# Install testing dependencies (when needed)
bun add -D vitest @testing-library/react @testing-library/jest-dom

# Run tests (future command)
bun run test
```

## 📦 Build and Deployment

### Building the Application
```bash
bun run build
```

The build process:
1. Compiles TypeScript to JavaScript
2. Bundles all modules using Vite
3. Optimizes assets and code splitting
4. Generates static files in `dist/` directory

### Deployment Options

1. **Lovable Platform** (Current)
   - Automatic deployment via Lovable
   - Click "Publish" in the Lovable interface

2. **Static Site Hosts**
   ```bash
   # Build the project
   bun run build
   
   # Deploy to Vercel
   vercel --prod
   
   # Deploy to Netlify
   netlify deploy --prod --dir=dist
   ```

3. **Self-hosted**
   - Serve the `dist/` folder with any static file server
   - Nginx, Apache, or Node.js static server

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing code formatting
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design for new UI components

### Component Guidelines

- Create small, focused components
- Use custom hooks for reusable logic
- Follow the existing file structure
- Include proper TypeScript types
- Test components manually in different browsers

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   └── meeting/        # Meeting-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🔧 Browser Support

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support (macOS/iOS)
- **Edge**: Full support

### WebRTC Requirements
- Camera and microphone permissions
- Secure context (HTTPS) for production
- Modern browser with WebRTC support

## 🐛 Troubleshooting

### Common Issues

1. **Camera/Microphone not working**
   - Check browser permissions
   - Ensure secure context (HTTPS)
   - Try refreshing the page

2. **Build errors**
   ```bash
   # Clear dependencies and reinstall
   rm -rf node_modules
   bun install
   ```

3. **TypeScript errors**
   ```bash
   # Run type checking
   bun run type-check
   ```

### Development Issues

- **Hot reload not working**: Restart the dev server
- **Port already in use**: Change port in `vite.config.ts`
- **Module not found**: Check import paths and file extensions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](docs/)
- Review the [troubleshooting guide](#-troubleshooting)

---

Built with ❤️ using modern web technologies
