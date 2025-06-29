
# Project Scripts Documentation

This document provides detailed information about all available npm/yarn/bun scripts in the project.

## Available Scripts

### 🚀 Development Scripts

#### `dev`
**Purpose**: Starts the development server with hot module replacement (HMR)
**Command**: `bun run dev` or `npm run dev`

**Functionality**:
- Launches Vite development server
- Enables hot module replacement for instant updates
- Provides source maps for debugging
- Serves the application on `http://localhost:5173`

**Usage Examples**:
```bash
# Start development server
bun run dev

# Start with specific port
bun run dev -- --port 3000

# Start with host binding (for network access)
bun run dev -- --host
```

**Expected Output**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Common Use Cases**:
- Daily development workflow
- Testing changes in real-time
- Debugging application issues
- UI/UX development and testing

**Required Environment Variables**: None

---

#### `build`
**Purpose**: Creates an optimized production build of the application
**Command**: `bun run build` or `npm run build`

**Functionality**:
- Compiles TypeScript to JavaScript
- Bundles and minifies all assets
- Optimizes images and other static files
- Generates static HTML, CSS, and JS files
- Creates source maps for production debugging
- Performs tree-shaking to remove unused code

**Usage Examples**:
```bash
# Standard production build
bun run build

# Build with analysis (if configured)
bun run build -- --analyze

# Build for specific environment
NODE_ENV=production bun run build
```

**Expected Output**:
```
vite v5.x.x building for production...
✓ xx modules transformed.
dist/index.html                  x.xx kB │ gzip: x.xx kB
dist/assets/index-xxxxx.css      x.xx kB │ gzip: x.xx kB
dist/assets/index-xxxxx.js     xxx.xx kB │ gzip: xx.xx kB
✓ built in xxxms
```

**Common Use Cases**:
- Preparing for deployment
- Performance testing
- Bundle size analysis
- CI/CD pipeline integration

**Required Environment Variables**: 
- `NODE_ENV=production` (automatically set)

---

#### `preview`
**Purpose**: Serves the production build locally for testing
**Command**: `bun run preview` or `npm run preview`

**Functionality**:
- Serves the built files from `dist/` directory
- Simulates production environment locally
- Allows testing of the optimized build
- Useful for catching build-specific issues

**Usage Examples**:
```bash
# Preview production build
bun run preview

# Preview on specific port
bun run preview -- --port 4000

# Preview with host binding
bun run preview -- --host
```

**Expected Output**:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

**Common Use Cases**:
- Testing production build locally
- Verifying build optimization
- Pre-deployment validation
- Performance testing

**Required Environment Variables**: None
**Prerequisites**: Must run `bun run build` first

---

### 🔍 Quality Assurance Scripts

#### `lint`
**Purpose**: Runs ESLint to check code quality and style consistency
**Command**: `bun run lint` or `npm run lint`

**Functionality**:
- Analyzes JavaScript and TypeScript files
- Checks for code quality issues
- Enforces coding standards
- Identifies potential bugs and anti-patterns
- Provides suggestions for improvements

**Usage Examples**:
```bash
# Run linter on all files
bun run lint

# Fix auto-fixable issues
bun run lint -- --fix

# Lint specific files
bun run lint src/components/Chat.tsx

# Show detailed output
bun run lint -- --format=detailed
```

**Expected Output**:
```bash
# No issues found
✨ All files pass linting!

# Issues found
src/components/Chat.tsx
  10:5  warning  Prefer const assertion  prefer-const
  15:3  error    Missing return type      @typescript-eslint/explicit-function-return-type

✖ 2 problems (1 error, 1 warning)
```

**Common Use Cases**:
- Code review preparation
- Maintaining code quality
- CI/CD quality gates
- Pre-commit hooks

**Required Environment Variables**: None

---

### 🧪 Testing Scripts (Future Implementation)

#### `test` (Not currently implemented)
**Purpose**: Runs the test suite
**Command**: `bun run test` or `npm run test`

**Functionality** (when implemented):
- Executes unit tests
- Runs component tests
- Provides coverage reports
- Supports watch mode for development

**Future Usage Examples**:
```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test -- --watch

# Run tests with coverage
bun run test -- --coverage

# Run specific test file
bun run test Chat.test.tsx
```

---

#### `test:watch` (Future)
**Purpose**: Runs tests in watch mode for development
**Command**: `bun run test:watch`

**Functionality** (when implemented):
- Continuously runs tests on file changes
- Provides instant feedback during development

---

#### `test:coverage` (Future)
**Purpose**: Generates test coverage report
**Command**: `bun run test:coverage`

**Functionality** (when implemented):
- Measures code coverage
- Generates HTML and text reports
- Identifies untested code paths

---

### 🔧 Utility Scripts

#### `type-check` (Can be added)
**Purpose**: Runs TypeScript compiler in check mode
**Command**: `bun run type-check`

**To add this script**:
```json
{
  "scripts": {
    "type-check": "tsc --noEmit"
  }
}
```

**Functionality**:
- Validates TypeScript types
- Checks for type errors without emitting files
- Useful for CI/CD type validation

---

#### `format` (Can be added with Prettier)
**Purpose**: Formats code using Prettier
**Command**: `bun run format`

**To add this script**:
```bash
# Install Prettier
bun add -D prettier

# Add script to package.json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,css,md}\""
  }
}
```

---

### 📦 Dependency Management Scripts

#### Installing Dependencies
```bash
# Add production dependency
bun add package-name

# Add development dependency
bun add -D package-name

# Install all dependencies
bun install
```

#### Updating Dependencies
```bash
# Update all dependencies
bun update

# Update specific package
bun update package-name

# Check for outdated packages
bun outdated
```

---

### 🚀 Deployment Scripts

#### `deploy:staging` (Custom script example)
**Purpose**: Deploy to staging environment
**Command**: `bun run deploy:staging`

**Example implementation**:
```json
{
  "scripts": {
    "deploy:staging": "bun run build && vercel --target staging"
  }
}
```

#### `deploy:production` (Custom script example)
**Purpose**: Deploy to production environment
**Command**: `bun run deploy:production`

**Example implementation**:
```json
{
  "scripts": {
    "deploy:production": "bun run build && vercel --prod"
  }
}
```

---

### 📊 Analysis Scripts

#### `analyze` (Can be added)
**Purpose**: Analyze bundle size and composition
**Command**: `bun run analyze`

**To add this script**:
```bash
# Install bundle analyzer
bun add -D vite-bundle-analyzer

# Add script
{
  "scripts": {
    "analyze": "vite-bundle-analyzer"
  }
}
```

---

## Script Execution Environment

### Node.js Environment Variables
- `NODE_ENV`: Set automatically by Vite (`development` for dev, `production` for build)
- `VITE_*`: Custom environment variables (accessible in code)

### Common Patterns
```bash
# Chain commands
bun run lint && bun run build

# Run with environment variables
NODE_ENV=production bun run build

# Pass arguments to underlying commands
bun run dev -- --port 3000 --host
```

### Performance Tips
- Use `bun` instead of `npm` for faster execution
- Run `build` and `preview` to test production builds
- Use `lint --fix` to automatically fix style issues
- Consider adding pre-commit hooks for quality assurance

### Troubleshooting Scripts
- **Script not found**: Check `package.json` scripts section
- **Permission errors**: Ensure proper file permissions
- **Port conflicts**: Use `--port` flag to change ports
- **Memory issues**: Increase Node.js memory limit with `--max-old-space-size`
