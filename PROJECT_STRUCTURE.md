# Chantemerle Project Structure

## 📁 Directory Layout

```
serre-che-calendar-front/
│
├── 📄 Configuration Files
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS customization
│   ├── postcss.config.js           # PostCSS plugins
│   ├── tsconfig.json               # TypeScript settings
│   ├── tsconfig.node.json          # TypeScript for Vite config
│   └── package.json                # Dependencies and scripts
│
├── 📄 Root Files
│   ├── index.html                  # HTML entry point
│   ├── README.md                   # Full documentation
│   ├── QUICKSTART.md               # Quick setup guide
│   ├── PROJECT_STRUCTURE.md        # This file
│   ├── .gitignore                  # Git ignore rules
│   ├── .env.example                # Environment template
│   └── .env.local                  # Local environment (gitignored)
│
└── 📁 src/                         # Source code
    │
    ├── 📄 Core Files
    │   ├── main.tsx                # React DOM entry point
    │   ├── App.tsx                 # Main application component
    │   ├── types.ts                # TypeScript interfaces & types
    │   └── index.css               # Global styles & utilities
    │
    └── 📁 components/              # React Components
        ├── Header.tsx              # App header & navigation
        ├── BookingsList.tsx        # Bookings table view
        ├── BookingModal.tsx        # New booking form modal
        └── CalendarView.tsx        # Interactive calendar
```

## 🔄 Data Flow

```
User Action
    ↓
App.tsx (State Management)
    ↓
├─→ Header.tsx (Display)
├─→ BookingsList.tsx (Display)
├─→ BookingModal.tsx (User Input)
└─→ CalendarView.tsx (Display)
    ↓
FastAPI Backend
    ↓
Database
```

## 📦 Component Hierarchy

```
<App />
├── <Header />
│   ├── Title & Subtitle
│   ├── Weather Widget
│   └── User Profile Icon
│
├── <BookingsList />
│   ├── Table Header
│   └── Booking Rows
│       ├── Name
│       ├── Start Date
│       ├── End Date
│       ├── Status Badge
│       └── Delete Button
│
├── <CalendarView />
│   ├── Month Navigation
│   ├── Calendar Grid
│   │   ├── Day Headers
│   │   └── Date Cells
│   └── Legend
│
└── <BookingModal />
    ├── Name Input
    ├── Start Date Picker
    ├── End Date Picker
    ├── Validation Messages
    └── Action Buttons
```

## 🎯 Key Files Explained

### `src/App.tsx` (Main Component)
**Responsibilities:**
- Global state management (bookings, modal, month)
- API communication (fetch, create, delete)
- Error handling
- Mock data fallback
- Layout orchestration

**Key Functions:**
- `fetchBookings()` - Loads bookings from API
- `handleAddBooking()` - Creates new booking
- `handleDeleteBooking()` - Removes booking

### `src/types.ts` (Type Definitions)
**Exports:**
- `Booking` interface - Booking data structure
- `SlotInput` interface - API request type
- `API_BASE_URL` constant - Backend endpoint

### `src/components/Header.tsx`
**Displays:**
- App title: "Chantemerle"
- Subtitle: "Réservation de l'appartement"
- Weather widget (placeholder)
- User profile icon

**Features:**
- Sticky positioning
- Glassmorphism styling
- Responsive layout

### `src/components/BookingsList.tsx`
**Displays:**
- Table of bookings sorted by start date
- Columns: Name, Start, End, Status, Action

**Status Indicators:**
- 🟢 Green "Confirmée" - Confirmed booking
- 🟡 Amber "À confirmer" - Tentative booking

**Interactions:**
- Delete button with confirmation
- Hover effects on rows

### `src/components/BookingModal.tsx`
**Features:**
- Centered modal overlay
- Form validation
- Conflict detection
- Error messaging

**Validations:**
- Non-empty name
- Valid date range (start < end)
- No overlapping bookings
- Required field checks

### `src/components/CalendarView.tsx`
**Displays:**
- Month calendar grid
- Day abbreviations (Lun, Mar, etc.)
- Date cells with status colors

**Interactions:**
- Navigation buttons (previous/next month)
- Hover tooltip with occupant name
- Legend explaining colors
- Highlights today with blue ring

### `src/index.css` (Global Styles)
**Defines:**
- Tailwind imports
- Custom utility classes (`.glass`, `.btn-primary`, etc.)
- Glassmorphism effects
- Scrollbar styling
- Animations

### `vite.config.ts`
**Configuration:**
- React plugin setup
- Development server port (5173)
- API proxy to backend (port 8000)

### `tailwind.config.js`
**Customizations:**
- Primary color palette (blue/cyan)
- Shadow effects (`.shadow-glass`)
- Backdrop blur utilities
- Font family configuration

## 🔌 API Integration Points

### In `src/App.tsx`:

**Fetch Bookings:**
```typescript
GET /
Response: Booking[]
```

**Create Booking:**
```typescript
POST /
Body: { name, start, end, status }
Response: Booking
```

**Delete Booking:**
```typescript
DELETE /{id}
Response: { success: true }
```

## 📊 State Management

All state is managed locally in `App.tsx`:

```typescript
const [bookings, setBookings] = useState<Booking[]>([])
const [isModalOpen, setIsModalOpen] = useState(false)
const [currentMonth, setCurrentMonth] = useState(new Date())
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

**State Flows:**
- Bookings → passed to BookingsList and CalendarView
- isModalOpen → passed to BookingModal
- currentMonth → passed to CalendarView
- isLoading/error → shown as UI feedback

## 🎨 Styling Architecture

**Layers:**
1. **Tailwind Base** - HTML elements reset
2. **Tailwind Components** - Custom utility classes (glass, btn, input)
3. **Tailwind Utilities** - Responsive & state variants
4. **Custom CSS** - Scrollbars, animations, special effects

**Theme Colors:**
- Primary: Blue (`#0ea5e9`) → Cyan (`#06b6d4`)
- Status-Booked: Green (`#10b981`)
- Status-Tentative: Amber (`#f59e0b`)
- Background: Slate-900 (dark)
- Text: Slate-100 (light)

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
# Starts with HMR on http://localhost:5173
```

### Production Build
```bash
npm run build
# Creates optimized dist/ folder
```

### Preview Production
```bash
npm run preview
# Serves dist/ locally for testing
```

## 📈 Performance Considerations

**Optimizations:**
- ✅ Lazy component loading (React.lazy compatible)
- ✅ CSS purging via Tailwind
- ✅ Image optimization (CDN hosted)
- ✅ Code splitting via Vite
- ✅ Minimal dependencies

**Best Practices:**
- Use `key` props in lists
- Memoize expensive computations
- Lazy load heavy components
- Optimize re-renders with useMemo

## 🔐 Security Considerations

**Current Implementation:**
- ✅ Input validation in modal
- ✅ Error boundaries with fallbacks
- ✅ CORS-aware API calls
- ✅ Confirmation dialogs for destructive actions

**To Implement:**
- [ ] Authentication/Authorization
- [ ] HTTPS enforcement
- [ ] Rate limiting
- [ ] XSS protection
- [ ] CSRF tokens

## 📝 Adding New Features

### New Component Template
```typescript
// src/components/NewComponent.tsx
import { SomeIcon } from 'lucide-react'
import { Component } from '../types'

interface NewComponentProps {
  data: Component[]
  onAction: (id: number) => void
}

export default function NewComponent({ data, onAction }: NewComponentProps) {
  return (
    <div className="glass-lg p-6">
      {/* Component JSX */}
    </div>
  )
}
```

### Integration Steps
1. Create file in `src/components/`
2. Add types to `src/types.ts`
3. Import in `src/App.tsx`
4. Pass props and handle events
5. Add styles to `src/index.css` if needed

## 🐛 Debugging Tips

**Browser Console:**
- Open DevTools: F12
- Check for TypeScript errors
- Monitor network requests
- View React component tree

**VS Code Extensions:**
- ESLint
- Tailwind CSS IntelliSense
- Prettier
- Thunder Client (API testing)

**HMR Issues:**
- Clear `.vite` cache
- Restart dev server
- Hard refresh browser (Ctrl+Shift+R)

## 📚 External Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [date-fns Documentation](https://date-fns.org)
- [Lucide Icons](https://lucide.dev)

---

**Last Updated:** 2024
**Version:** 1.0.0
