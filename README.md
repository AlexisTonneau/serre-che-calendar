# Chantemerle - Apartment Booking System

A modern, responsive single-page web application for managing family apartment bookings. Built with React, Vite, and Tailwind CSS with a beautiful glassmorphism design.

## Features

✨ **Key Features:**
- Beautiful glassmorphism UI with mountain background
- Real-time booking management
- Visual calendar with conflict detection
- Responsive design for all screen sizes
- Modal-based booking creation
- Status tracking (Booked/Tentative)
- FastAPI backend integration

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite (lightning-fast development)
- **Styling:** Tailwind CSS with custom glassmorphism effects
- **Icons:** Lucide React
- **Date Handling:** date-fns with French locale
- **Backend:** FastAPI (separate project)

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Header with title and weather widget
│   ├── BookingsList.tsx     # Table of upcoming bookings
│   ├── BookingModal.tsx     # Modal for creating new bookings
│   └── CalendarView.tsx     # Interactive calendar view
├── App.tsx                  # Main application component
├── main.tsx                 # React DOM render entry
├── types.ts                 # TypeScript interfaces
└── index.css                # Global styles and utilities
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- FastAPI backend running on `http://localhost:8000`

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

3. **Build for production:**

```bash
npm run build
```

## API Integration

The application connects to a FastAPI backend with the following endpoints:

- `GET /` - Fetch all bookings
- `POST /` - Create a new booking
- `DELETE /{slot_id}` - Delete a booking

### Backend Setup

Ensure your FastAPI backend is running:

```bash
# From your backend project
uvicorn main:app --reload
```

The frontend automatically falls back to mock data during development if the API is unavailable.

## Components Overview

### Header
- Displays "Chantemerle" branding
- Weather widget placeholder
- User profile icon
- Sticky positioning with glassmorphism effect

### BookingsList
- Table view of upcoming bookings
- Columns: Name, Start Date, End Date, Status, Delete Action
- Color-coded status badges (Green for confirmed, Amber for tentative)
- Sorted by start date

### BookingModal
- Form for creating new bookings
- Input fields: Name, Start Date, End Date
- Validation:
  - Required fields check
  - Date logic validation (end > start)
  - Conflict detection with existing bookings
- Confirmation dialog on delete

### CalendarView
- Visual month calendar
- Booked dates highlighted with status colors
- Legend showing available/booked/tentative states
- Today highlighted with blue ring
- Hover to see occupant name

## Mock Data

The application includes mock data for immediate testing:

```typescript
- Alice: 2024-12-27 to 2025-01-03 (Booked)
- Aymeric: 2025-07-11 to 2025-07-14 (Booked)
- Aymeric: 2025-01-31 to 2025-02-07 (Tentative)
- Alexis: 2025-01-14 to 2025-01-26 (Booked)
- Del & Clery: 2025-01-25 to 2025-02-02 (Booked)
- Brioist: 2025-02-14 to 2025-02-21 (Booked)
```

## Design System

### Glassmorphism Effects

The UI uses custom glassmorphism with:
- Semi-transparent white backgrounds (10% opacity)
- Backdrop blur effect
- Subtle borders and shadows
- Smooth hover transitions

### Color Palette

- **Primary:** Blue/Cyan gradient buttons
- **Status - Confirmed:** Green (#10b981)
- **Status - Tentative:** Amber (#f59e0b)
- **Background:** Dark slate gradient
- **Text:** Light slate

### Responsive Breakpoints

- Mobile: Full-width single column
- Tablet: Stack with some adjustments
- Desktop (lg): 3-column layout (2-col bookings, 1-col calendar)

## Configuration

### Tailwind CSS

Custom configurations in `tailwind.config.js`:
- Extended color palette with primary shades
- Custom shadow effects (`glass`, `glass-lg`)
- Custom utilities for glassmorphism effects

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_API_URL=http://localhost:8000
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Modern mobile browsers

## Performance Optimizations

- ✅ Lazy component loading with React.lazy
- ✅ Vite's native ES modules bundling
- ✅ Optimized images with Unsplash CDN
- ✅ CSS-in-JS with Tailwind purging
- ✅ Smooth animations with GPU acceleration

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

### Hot Module Replacement (HMR)

Vite provides instant HMR for:
- React components
- Tailwind CSS changes
- TypeScript type updates

## Troubleshooting

### API Connection Issues

If the backend is unavailable:
- The app uses mock data automatically
- Check that `http://localhost:8000` is accessible
- Ensure CORS is configured on the backend

### Calendar Display Issues

- Clear browser cache if dates appear incorrect
- Ensure date-fns locale is properly imported
- Check browser timezone settings

### Styling Issues

- Rebuild Tailwind CSS: `npm run build`
- Clear `.next` or `dist` folder
- Ensure `tailwind.config.js` is correctly configured

## Contributing

When adding new features:
1. Create components in `src/components/`
2. Add types to `src/types.ts`
3. Use the existing Tailwind utility classes
4. Maintain the glassmorphism design language

## License

MIT License - Feel free to use this template for your projects!

## Support

For issues or questions:
- Check the documentation at `/docs`
- Review existing GitHub issues
- Create a new issue with detailed reproduction steps
