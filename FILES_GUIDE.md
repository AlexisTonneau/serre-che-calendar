# 📂 Complete Files Guide - Chantemerle Booking System

## Project Root Structure

```
serre-che-calendar-front/
│
├── 📄 CONFIGURATION & BUILD
│   ├── package.json                # npm dependencies & scripts
│   ├── vite.config.ts              # Vite build configuration  
│   ├── tailwind.config.js          # Tailwind CSS theme config
│   ├── postcss.config.js           # PostCSS plugins
│   ├── tsconfig.json               # TypeScript compiler options
│   ├── tsconfig.node.json          # TypeScript for build files
│   └── index.html                  # HTML entry point
│
├── 📄 DOCUMENTATION
│   ├── README.md                   # Full documentation
│   ├── QUICKSTART.md               # 3-minute setup guide
│   ├── PROJECT_STRUCTURE.md        # Architecture documentation
│   ├── FEATURES.md                 # Feature showcase
│   ├── DELIVERY_SUMMARY.md         # Delivery overview
│   ├── FILES_GUIDE.md              # This file
│   ├── SETUP_INSTRUCTIONS.txt      # Setup instructions
│   └── .env.example                # Environment variables template
│
├── 📄 GIT CONFIGURATION
│   └── .gitignore                  # Files to ignore in git
│
└── 📁 src/ (SOURCE CODE)
    ├── 📄 APPLICATION CORE
    │   ├── App.tsx                 # Main application component
    │   ├── main.tsx                # React entry point
    │   ├── types.ts                # TypeScript interfaces
    │   └── index.css               # Global styles & utilities
    │
    └── 📁 components/ (REACT COMPONENTS)
        ├── Header.tsx              # Header & navigation
        ├── BookingsList.tsx        # Bookings table view
        ├── BookingModal.tsx        # Booking form modal
        └── CalendarView.tsx        # Interactive calendar
```

---

## 📋 File-by-File Description

### ROOT CONFIGURATION FILES

#### `package.json`
**Purpose**: Manage npm dependencies and scripts
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "date-fns": "3.0.0",
    "lucide-react": "0.294.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```
**Key Scripts**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### `vite.config.ts`
**Purpose**: Configure Vite build tool
**Key Settings**:
- React plugin enabled
- Dev server on port 5173
- API proxy to localhost:8000
**Edit when**: Changing port, adding plugins, or updating build settings

#### `tailwind.config.js`
**Purpose**: Customize Tailwind CSS theme
**Key Customizations**:
- Primary color palette (blue/cyan)
- Custom shadow effects (glass, glass-lg)
- Extended color palette
**Edit when**: Changing colors, adding custom utilities, or modifying theme

#### `postcss.config.js`
**Purpose**: Configure PostCSS plugins
**Includes**: Tailwind CSS, Autoprefixer
**Edit when**: Adding new PostCSS plugins

#### `tsconfig.json`
**Purpose**: Configure TypeScript compiler
**Key Settings**:
- Target: ES2020
- Module: ESNext
- JSX: react-jsx
**Edit when**: Changing TypeScript strictness or module settings

#### `tsconfig.node.json`
**Purpose**: TypeScript config for build files
**Used for**: vite.config.ts
**Don't edit** unless you know what you're doing

#### `index.html`
**Purpose**: HTML entry point for the app
**Key Content**:
- Root div for React mounting
- Link to fonts
- Script tag for main.tsx
**Edit when**: Adding meta tags, title, or favicon

---

### DOCUMENTATION FILES

#### `README.md`
**Purpose**: Complete project documentation
**Contents**:
- Feature overview
- Tech stack
- Installation instructions
- API integration guide
- Customization guide
- Troubleshooting

**When to read**: First-time setup or understanding the project

#### `QUICKSTART.md`
**Purpose**: Get running in 3 minutes
**Contents**:
- Step-by-step setup
- What you'll see
- Key features to try
- Responsive design info

**When to read**: Impatient developers who want to see it working fast

#### `PROJECT_STRUCTURE.md`
**Purpose**: Deep dive into architecture
**Contents**:
- Directory layout
- Data flow diagram
- Component hierarchy
- File explanations
- API integration points
- State management

**When to read**: Understanding how things work or adding new features

#### `FEATURES.md`
**Purpose**: Showcase all features in detail
**Contents**:
- Core features explained
- Design system details
- Interaction patterns
- Data validation rules
- Performance features
- Future enhancement ideas

**When to read**: Learning what the app can do or planning enhancements

#### `DELIVERY_SUMMARY.md`
**Purpose**: Executive summary of the delivery
**Contents**:
- What's included
- Statistics
- Quick start
- Tech stack
- Checklists

**When to read**: Getting an overview of everything that was delivered

#### `SETUP_INSTRUCTIONS.txt`
**Purpose**: Detailed setup guide in text format
**Contents**:
- Step-by-step instructions
- Available commands
- API integration guide
- Troubleshooting
- Deployment options

**When to read**: Setting up the project or troubleshooting issues

#### `.env.example`
**Purpose**: Template for environment variables
**Contains**:
- VITE_API_URL
- VITE_APP_NAME
- Feature flags

**To use**: Copy to `.env.local` and edit values

---

### SOURCE CODE FILES

#### `src/App.tsx` ⭐ MAIN FILE
**Purpose**: Main application component
**Responsibilities**:
- Global state management (bookings, modal, month)
- API communication (fetch, create, delete)
- Error handling and loading states
- Layout orchestration
- Mock data fallback

**Key Functions**:
```typescript
fetchBookings()          // Fetch from API or use mock
handleAddBooking()       // Create new booking
handleDeleteBooking()    // Delete booking
getMockData()            // Provide fallback data
```

**State Variables**:
```typescript
bookings[]               // Array of all bookings
isModalOpen             // Modal visibility
currentMonth            // Currently displayed month
isLoading               // API loading state
error                   // Error message (if any)
```

**Key JSX Sections**:
- Background with overlay
- Header
- Error notification
- Loading spinner
- Main grid layout
- Bookings list (left)
- Calendar view (right)
- Booking modal

**Edit when**: Changing app logic, adding state, connecting backend

#### `src/main.tsx`
**Purpose**: React DOM entry point
**Contains**: Simple React.StrictMode wrap with App component
**Don't edit** unless changing React version or adding providers

#### `src/types.ts`
**Purpose**: TypeScript interfaces and constants
**Exports**:
```typescript
interface Booking          // Booking data structure
interface SlotInput        // API request type
API_BASE_URL              // Backend endpoint
```

**Edit when**: 
- Changing API URL
- Adding new data fields
- Modifying API contract

#### `src/index.css`
**Purpose**: Global styles and utilities
**Contains**:
- Tailwind imports (base, components, utilities)
- Custom CSS utilities
- Glassmorphism effect classes
- Button styles
- Form input styles
- Color badges
- Scrollbar styling

**Key Custom Classes**:
- `.glass` - Basic glassmorphism
- `.glass-lg` - Large glass effect
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.badge-tentative` - Tentative status badge
- `.badge-booked` - Confirmed status badge

**Edit when**: Changing global styles or adding new utility classes

---

### COMPONENT FILES

#### `src/components/Header.tsx`
**Purpose**: App header with branding
**Displays**:
- Logo: "Chantemerle"
- Subtitle: "Réservation de l'appartement"
- Weather widget placeholder
- User profile icon

**Features**:
- Sticky positioning
- Glassmorphism styling
- Responsive layout
- Sticky to top when scrolling

**Props**: None (uses hardcoded content)

**Edit when**: Changing branding, adding menu items, or modifying header layout

---

#### `src/components/BookingsList.tsx`
**Purpose**: Display bookings in table format
**Displays**:
- Table of bookings sorted by date
- Columns: Name, Start, End, Status, Delete
- Status badges with colors
- Delete buttons

**Features**:
- Responsive table layout
- Color-coded status badges
- Delete confirmation dialog
- Hover effects

**Props**:
```typescript
bookings: Booking[]                    // Array of bookings to display
onDelete: (id: number) => void         // Delete handler
```

**Key Logic**:
- Sorts bookings by start date
- Shows max 10 bookings
- Color codes status (green/amber)
- Deletes with confirmation

**Edit when**: Changing table layout, adding columns, or modifying row styling

---

#### `src/components/BookingModal.tsx`
**Purpose**: Modal form for creating new bookings
**Displays**:
- Centered modal overlay
- Form with 3 inputs: name, start date, end date
- Validation error messages
- Cancel and Confirm buttons

**Features**:
- Form validation (required fields, date logic)
- Conflict detection with existing bookings
- Real-time error messages
- Disabled state while submitting
- Closes on cancel or success

**Props**:
```typescript
isOpen: boolean                        // Show/hide modal
onClose: () => void                    // Close handler
onSubmit: (booking) => void            // Create handler
existingBookings: Booking[]            // For conflict detection
```

**Validation Rules**:
1. Name must be non-empty
2. Start date required
3. End date required
4. End date must be after start date
5. No overlapping with existing bookings

**Edit when**: Adding form fields, changing validation, or modifying error messages

---

#### `src/components/CalendarView.tsx`
**Purpose**: Interactive month calendar
**Displays**:
- Full month grid (7 columns for days)
- Day abbreviations (Lun, Mar, etc.)
- Date cells with status colors
- Navigation arrows
- Legend with color explanation

**Features**:
- Month navigation (previous/next)
- Date cells color-coded by booking status
- Hover to see occupant name
- Blue ring on today's date
- Legend explaining colors

**Props**:
```typescript
bookings: Booking[]                    // All bookings to display
month: Date                            // Month to display
```

**Color Scheme**:
- Green: Booked (confirmed)
- Amber: Tentative
- Gray: Available
- Blue ring: Today

**Key Logic**:
- Calculate month start/end dates
- Generate calendar grid
- Check if date is booked
- Highlight today
- Show legend

**Edit when**: Changing calendar layout, date colors, or navigation

---

## 🔄 Data Flow

```
User Action (Create/Delete)
    ↓
Event Handler in App.tsx
    ↓
API Call (fetch/POST/DELETE)
    ↓
State Update (setBookings)
    ↓
Re-render Components:
    ├─ BookingsList (updated list)
    ├─ CalendarView (updated dates)
    └─ Header (stays same)
    ↓
UI Updated (visible to user)
```

---

## 📊 Component Dependencies

```
App.tsx
├── Header.tsx (imports: lucide-react)
├── BookingsList.tsx (imports: lucide-react, date-fns, types)
├── BookingModal.tsx (imports: lucide-react, date-fns, types)
└── CalendarView.tsx (imports: date-fns, types)

types.ts
└── (no dependencies)

index.css
└── (imported in main.tsx)
```

---

## 🎨 Import Patterns

### Common Imports
```typescript
// React
import { useState, useEffect } from 'react'

// Icons
import { Trash2, Plus, Cloud, User } from 'lucide-react'

// Date handling
import { format, parseISO, isWithinInterval } from 'date-fns'
import { fr } from 'date-fns/locale'

// Types
import { Booking, API_BASE_URL } from '../types'
```

---

## ✏️ Editing Guide

### To Change Colors
**File**: `tailwind.config.js`
```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change this
  }
}
```

### To Change Background Image
**File**: `src/App.tsx` (~30 lines in)
```typescript
backgroundImage: 'url("YOUR_NEW_IMAGE_URL")'
```

### To Change API Endpoint
**File**: `src/types.ts`
```typescript
export const API_BASE_URL = 'YOUR_NEW_URL'
```

### To Change Header Text
**File**: `src/components/Header.tsx`
```typescript
<h1>Your New Title</h1>
```

### To Add a New Component
1. Create file: `src/components/YourComponent.tsx`
2. Export component with props interface
3. Import in `src/App.tsx`
4. Use in JSX
5. Style with Tailwind classes

---

## 🚀 File Purpose Quick Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `package.json` | Dependencies | Adding new packages |
| `vite.config.ts` | Build config | Changing build options |
| `tailwind.config.js` | Theme | Changing colors/fonts |
| `tsconfig.json` | TypeScript | Changing compiler options |
| `index.html` | HTML entry | Changing page title/meta |
| `App.tsx` | Main logic | Changing app behavior |
| `types.ts` | Type defs | Changing data structure |
| `index.css` | Global styles | Changing global styles |
| `Header.tsx` | Header UI | Changing header layout |
| `BookingsList.tsx` | Bookings table | Changing table layout |
| `BookingModal.tsx` | Booking form | Changing form |
| `CalendarView.tsx` | Calendar | Changing calendar |

---

## 🔍 Finding Things

### To find where bookings are loaded
→ `src/App.tsx` - `fetchBookings()` function

### To find where dates are formatted
→ `src/components/BookingsList.tsx` - Uses `date-fns` with `fr` locale

### To find where validation happens
→ `src/components/BookingModal.tsx` - `handleSubmit()` function

### To find where API calls are made
→ `src/App.tsx` - `fetch()` calls in `fetchBookings()`, `handleAddBooking()`, `handleDeleteBooking()`

### To find where styles are defined
→ `src/index.css` - Custom Tailwind utilities
→ `tailwind.config.js` - Theme configuration

### To find where mock data is defined
→ `src/App.tsx` - `getMockData()` function

---

## 💾 File Sizes (Approximate)

| File | Size | Lines |
|------|------|-------|
| `src/App.tsx` | 8 KB | 150 |
| `src/components/BookingsList.tsx` | 2 KB | 60 |
| `src/components/BookingModal.tsx` | 5 KB | 120 |
| `src/components/CalendarView.tsx` | 4 KB | 100 |
| `src/components/Header.tsx` | 2 KB | 40 |
| `src/index.css` | 4 KB | 120 |
| `tailwind.config.js` | 1 KB | 30 |
| **TOTAL** | **~26 KB** | **~620** |

---

## 🔄 File Relationships

```
index.html
    └── src/main.tsx
        └── src/App.tsx
            ├── src/types.ts (imports)
            ├── src/index.css (imports)
            ├── src/components/Header.tsx
            ├── src/components/BookingsList.tsx
            ├── src/components/BookingModal.tsx
            └── src/components/CalendarView.tsx

Configuration Files:
├── package.json ← vite.config.ts
├── vite.config.ts ← tsconfig.json, tsconfig.node.json
├── tailwind.config.js ← src/index.css
└── postcss.config.js ← tailwind.config.js
```

---

## ✅ Quick Checklist When Making Changes

- [ ] Identified the file to edit
- [ ] Understand its purpose and dependencies
- [ ] Made the change
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Tested in development (`npm run dev`)
- [ ] Built successfully (`npm run build`)

---

**Happy editing! 🎉**

*Last updated: 2025-12-09*
