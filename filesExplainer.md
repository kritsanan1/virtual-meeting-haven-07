
# Project File Structure Documentation

## Root Directory
```
/
├── README.md 🟢 - Project overview and setup instructions
├── package.json 🟢 - Dependencies and scripts configuration
├── package-lock.json 🟡 - Locked dependency versions
├── bun.lockb 🟡 - Bun package manager lock file
├── vite.config.ts 🟢 - Vite build configuration
├── tailwind.config.ts 🟢 - Tailwind CSS configuration
├── tsconfig.json 🟢 - TypeScript configuration
├── tsconfig.app.json 🟡 - App-specific TypeScript config
├── tsconfig.node.json 🟡 - Node-specific TypeScript config
├── postcss.config.js 🟡 - PostCSS configuration for Tailwind
├── components.json 🟡 - Shadcn/ui components configuration
├── eslint.config.js 🟡 - ESLint linting configuration
├── index.html 🟢 - Main HTML entry point
└── .gitignore 🟡 - Git ignore patterns
```

## Public Directory
```
public/
├── favicon.ico 🟡 - Website favicon
├── placeholder.svg 🔴 - Placeholder image asset
└── robots.txt 🔴 - Search engine crawler instructions
```

## Source Directory
```
src/
├── main.tsx 🟢 - Application entry point, renders App component
├── App.tsx 🟢 - Main app component with routing configuration
├── App.css 🟡 - Global application styles
├── index.css 🟢 - Global CSS imports and Tailwind directives
├── vite-env.d.ts 🟡 - Vite environment type definitions
```

### Components Directory
```
src/components/
├── VideoPlayer.tsx 🟢 - Video stream display component for meeting participants
├── ControlPanel.tsx 🟢 - Meeting controls (audio, video, screen share, leave)
├── Chat.tsx 🟢 - Meeting chat functionality with messaging and voice notes
├── ChatMessage.tsx 🟡 - Individual chat message display component
├── InlineReplyBox.tsx 🟡 - Inline reply interface for chat messages
├── HostTools.tsx 🟡 - Host-specific meeting management tools
├── MeetingInfo.tsx 🟡 - Meeting ID and information display
├── ParticipantInfo.tsx 🟡 - Participant list and status display
├── PreviewOptions.tsx 🟡 - Audio/video preview before joining
└── Reactions.tsx 🟡 - Meeting reaction/emoji system
```

### Meeting Components Directory
```
src/components/meeting/
├── types.ts 🟢 - TypeScript interfaces for meeting form data
├── DateTimeSection.tsx 🟢 - Date and time picker for meeting scheduling
├── AttendeesSection.tsx 🟡 - Attendee management interface
├── MeetingIdSection.tsx 🟡 - Meeting ID generation options
├── MeetingForm.tsx 🟢 - Main meeting scheduling form component
├── ConnectionBanners.tsx 🟡 - Calendar connection and trial promotion banners
└── TrialDialog.tsx 🟡 - Free trial activation dialog
```

### UI Components Directory
```
src/components/ui/
├── button.tsx 🟢 - Reusable button component with variants
├── input.tsx 🟢 - Form input component
├── form.tsx 🟢 - Form wrapper and field components
├── calendar.tsx 🟢 - Calendar picker component
├── select.tsx 🟢 - Dropdown select component
├── popover.tsx 🟢 - Popover/dropdown content container
├── dialog.tsx 🟢 - Modal dialog component
├── drawer.tsx 🟢 - Bottom drawer component for mobile
├── scroll-area.tsx 🟡 - Scrollable area component
├── avatar.tsx 🟡 - User avatar display component
├── card.tsx 🟡 - Card layout component
├── checkbox.tsx 🟡 - Checkbox input component
├── hover-card.tsx 🟡 - Hover information card
├── collapsible.tsx 🟡 - Collapsible content component
├── dropdown-menu.tsx 🟡 - Dropdown menu component
├── textarea.tsx 🟡 - Multi-line text input
├── toast.tsx 🟡 - Toast notification component
├── toaster.tsx 🟡 - Toast notification container
├── use-toast.ts 🟡 - Toast hook for notifications
└── [22 other UI components] 🔴 - Additional Shadcn/ui components
```

### Hooks Directory
```
src/hooks/
├── use-media-stream.tsx 🟢 - WebRTC media stream management
├── use-chat.ts 🟢 - Chat functionality and state management
├── use-toast.ts 🟡 - Toast notification hook
└── use-mobile.tsx 🟡 - Mobile device detection hook
```

### Pages Directory
```
src/pages/
├── Index.tsx 🟢 - Home page with meeting join/create options
├── Meeting.tsx 🟢 - Main meeting room interface
├── ScheduleMeeting.tsx 🟢 - Meeting scheduling interface
└── NotFound.tsx 🟡 - 404 error page
```

### Types Directory
```
src/types/
└── chat.ts 🟢 - TypeScript interfaces for chat functionality
```

### Library Directory
```
src/lib/
└── utils.ts 🟢 - Utility functions for class names and common operations
```

## Key Dependencies and Relationships

### Core Dependencies
- **React 18.3.1** - Main UI framework
- **TypeScript** - Type safety and development experience
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Pre-built component library

### Meeting Functionality
- **WebRTC APIs** - Video/audio streaming (native browser APIs)
- **React Hook Form** - Form state management
- **Date-fns** - Date manipulation and formatting
- **React Router DOM** - Client-side routing

### UI and Interaction
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Vaul** - Drawer component library
- **React Query** - Server state management

## Import Relationships

### High-Impact Files (🟢)
- `App.tsx` imports all page components
- `Meeting.tsx` imports VideoPlayer, ControlPanel, Chat
- `Chat.tsx` imports ChatMessage, UI components, hooks
- `ControlPanel.tsx` imports all meeting control components
- `DateTimeSection.tsx` imports calendar and form components

### Medium-Impact Files (🟡)
- UI components are imported by multiple pages and components
- Hook files are imported by components that need their functionality
- Type definition files are imported throughout the application

### Low-Impact Files (🔴)
- Configuration files affect build process but aren't directly imported
- Asset files are referenced but not imported as modules
