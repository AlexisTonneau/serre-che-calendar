# Quick Start Guide - Chantemerle Booking System

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit `http://localhost:5173` in your browser

**That's it!** You'll see the Chantemerle booking system with mock data pre-loaded.

## 📋 What You'll See

### Left Panel - "Prochains occupants"
A table showing all upcoming bookings with:
- ✅ Occupant names
- 📅 Start and end dates
- 🏷️ Status badges (Confirmed = green, Tentative = amber)
- 🗑️ Delete buttons

### Right Panel - Calendar
An interactive month calendar showing:
- 🟢 Green dates = Booked reservations
- 🟡 Amber dates = Tentative bookings
- ⚪ Gray dates = Available slots
- 📍 Blue ring = Today's date

## 🎯 Key Features to Try

### 1. Create a New Booking
- Click "Réserver un créneau" button
- Fill in name, start date, and end date
- Click "Confirmer"
- The booking appears immediately in the list and calendar

### 2. Delete a Booking
- Click the trash icon on any booking
- Confirm the deletion
- The booking is removed from both list and calendar

### 3. Navigate Months
- Use the left/right arrows next to "Calendrier"
- See bookings update as you navigate

### 4. View Booking Details
- Hover over calendar dates to see occupant names
- Click on booking rows to see full details (if expanded feature added)

## 🔗 Backend Integration

The app connects to your FastAPI backend at `http://localhost:8000`.

If your backend isn't running, don't worry! The app uses mock data automatically.

### To use your backend:

1. **Ensure your FastAPI server is running:**
```bash
cd /path/to/backend
uvicorn main:app --reload
```

2. **The frontend will automatically connect** to `http://localhost:8000`

## 📱 Responsive Design

The layout automatically adjusts:
- **Mobile (< 768px):** Single column, full-width
- **Tablet (768px - 1024px):** Stacked layout
- **Desktop (> 1024px):** 3-column layout (bookings + calendar)

## 🎨 Design Features

- **Glassmorphism:** Semi-transparent cards with blur effects
- **Mountain Background:** Beautiful scenic backdrop
- **Dark Theme:** Easy on the eyes with high contrast
- **Smooth Animations:** Hover effects and transitions
- **Responsive:** Works on all devices

## 🛠️ Development Tools

### Available Commands
```bash
npm run dev      # Development server with HMR
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

### Edit Any File and See Changes Instantly!

Vite's Hot Module Replacement (HMR) means:
- Edit a component → see it update in real-time
- Change CSS → instant refresh
- No full page reload needed

## 📂 File Locations

When you want to customize:

| Feature | File |
|---------|------|
| Main app logic | `src/App.tsx` |
| Booking list | `src/components/BookingsList.tsx` |
| Booking form modal | `src/components/BookingModal.tsx` |
| Calendar view | `src/components/CalendarView.tsx` |
| Header/navigation | `src/components/Header.tsx` |
| Styling system | `src/index.css` |
| Tailwind config | `tailwind.config.js` |

## 🎓 Common Customizations

### Change Colors
Edit `tailwind.config.js` in the `theme.extend.colors` section.

### Modify API URL
Edit the `API_BASE_URL` in `src/types.ts`.

### Add Your Logo
Replace the "Chantemerle" text in `src/components/Header.tsx`.

### Change Background Image
Modify the image URL in `src/App.tsx` line with `backgroundImage`.

## 🔧 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Failing
```bash
npm run build
# Check the error message and review the affected file
```

## 📚 Next Steps

1. **Customize colors** to match your brand
2. **Add your company logo** to the header
3. **Connect to your FastAPI backend**
4. **Deploy** using Vercel, Netlify, or your preferred platform

## 💡 Pro Tips

- Use browser DevTools (F12) to inspect elements
- Check the Network tab to see API calls
- Use React DevTools extension for component debugging
- Tailwind CSS IntelliSense extension for better IDE support

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `src/App.tsx` - Main component with API integration
- `src/types.ts` - TypeScript interfaces and API configuration

---

**Happy booking! 🎉**
