# Chantemerle Features & Capabilities

## 🎯 Core Features

### 1. Booking Management

#### Create Booking
- **Access:** Click "Réserver un créneau" button
- **Fields:** Name, Start Date, End Date
- **Validation:**
  - ✅ Non-empty name
  - ✅ Valid date range (end > start)
  - ✅ Conflict detection
  - ✅ User-friendly error messages
- **Status:** Auto-set to "Booked" (can be modified in modal if needed)

#### View Bookings
- **List Display:** Table with sortable columns
- **Columns:**
  - Occupant Name
  - Start Date (formatted: "1 Jan")
  - End Date (formatted: "10 Jan")
  - Status (Confirmée / À confirmer)
  - Delete Action
- **Sorting:** Automatically sorted by start date
- **Limit:** Shows 10 most recent bookings

#### Delete Booking
- **Access:** Click trash icon on any booking
- **Confirmation:** Requires user confirmation
- **Feedback:** Instant removal from list and calendar

### 2. Calendar View

#### Visual Calendar
- **Display:** Full month grid
- **Navigation:** Previous/Next month buttons
- **Day Headers:** Lun, Mar, Mer, Jeu, Ven, Sam, Dim
- **Date Cells:**
  - Show date number
  - Color-coded status
  - Show occupant name on hover

#### Status Indicators
| Status | Color | Meaning |
|--------|-------|---------|
| 🟢 Green | Booked | Confirmed reservation |
| 🟡 Amber | Tentative | Awaiting confirmation |
| ⚪ Gray | Available | No reservation |
| 🔵 Blue Ring | Today | Current date |

#### Interactive Features
- **Hover Effects:** See occupant name on hover
- **Month Navigation:** Jump to any month
- **Legend:** Color explanation at bottom
- **Today Indicator:** Highlighted with blue ring

### 3. User Interface

#### Header
- **Logo:** "Chantemerle" with gradient text
- **Subtitle:** "Réservation de l'appartement"
- **Weather Widget:** Temperature and condition (placeholder)
- **Profile Icon:** User account access point
- **Sticky:** Remains visible when scrolling

#### Background
- **Image:** Mountain landscape (Unsplash)
- **Overlay:** Dark semi-transparent blend
- **Effect:** Glassmorphism cards on top
- **Performance:** Optimized with blur on background image

#### Cards & Containers
- **Glassmorphism:** Semi-transparent with backdrop blur
- **Hover Effects:** Subtle brightness increase
- **Transitions:** Smooth 300ms animations
- **Shadows:** Subtle depth effects

#### Buttons & Controls
- **Primary Button:** Blue→Cyan gradient
- **Secondary Button:** Slate background
- **Icon Buttons:** Rounded hover backgrounds
- **States:**
  - Normal: Ready to click
  - Hover: Brighter with shadow
  - Active: Clicked state
  - Disabled: 50% opacity

#### Inputs & Forms
- **Date Pickers:** Native HTML5 input
- **Text Input:** Slate background with blue focus
- **Placeholders:** Helpful examples
- **Validation:** Real-time feedback
- **Error Messages:** Red background with explanation

### 4. Responsive Design

#### Mobile (< 768px)
- Single column layout
- Full-width bookings list
- Calendar below list
- Touch-friendly buttons
- Scrollable content

#### Tablet (768px - 1024px)
- Stacked but more spacious
- Larger touch targets
- Adjusted padding

#### Desktop (> 1024px)
- Three-column layout
- Bookings list (2 columns)
- Calendar sticky sidebar (1 column)
- Optimal information density

### 5. Data Management

#### Mock Data Included
```javascript
✓ Alice: Dec 27, 2024 - Jan 3, 2025
✓ Aymeric: Jul 11-14, 2025
✓ Aymeric (Tentative): Jan 31 - Feb 7, 2025
✓ Alexis: Jan 14-26, 2025
✓ Del & Clery: Jan 25 - Feb 2, 2025
✓ Brioist: Feb 14-21, 2025
```

#### Auto Fallback
- If API unavailable → Uses mock data
- Provides immediate visual feedback
- Enables offline development

#### Persistence
- API-backed when backend available
- Survives page refresh
- Real-time sync with backend

### 6. Error Handling

#### User-Friendly Messages
- ✅ "Veuillez entrer un nom" - Missing name
- ✅ "Cette période chevauche..." - Date conflict
- ✅ "Failed to load bookings" - API errors
- ✅ Confirmation dialogs before deletion

#### Loading States
- Spinner animation during fetch
- Disabled buttons while submitting
- Loading text: "En cours..."
- Prevents duplicate submissions

#### Fallback Mechanisms
- Mock data when API fails
- Continue working offline
- Graceful degradation

## 🎨 Design Features

### Glassmorphism Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}
```

### Color Scheme
- **Primary Gradient:** `from-blue-500 to-cyan-500`
- **Dark Background:** Slate-900 base
- **High Contrast Text:** Slate-100 (near white)
- **Status Colors:** Green/Amber for accessibility

### Animations
- **Transitions:** 300ms ease for color changes
- **Hover States:** Subtle brightness increase
- **Loading Spinner:** Continuous rotation
- **Smoothness:** All animations use GPU acceleration

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700, 900
- **Sizes:**
  - Header: 3xl (1.875rem)
  - Titles: 2xl/xl (1.5rem/1.25rem)
  - Body: base/sm (1rem/0.875rem)
  - Labels: xs (0.75rem)

## 🔄 Interaction Patterns

### Creating a Booking
```
User clicks "Réserver un créneau"
    ↓
Modal opens with form
    ↓
User fills in details
    ↓
Validation checks run
    ↓
User clicks "Confirmer"
    ↓
Request sent to API
    ↓
Success: Booking appears in list & calendar
    ↓
Modal closes, form resets
```

### Deleting a Booking
```
User clicks trash icon
    ↓
Confirmation dialog appears
    ↓
User confirms
    ↓
DELETE request to API
    ↓
Success: Booking removed from list & calendar
    ↓
Success message shown (or error if failed)
```

### Navigating Calendar
```
User clicks left/right arrow
    ↓
Month state updates
    ↓
Calendar re-renders with new month
    ↓
Bookings for new month highlighted
    ↓
Legend and controls stay same
```

## 📊 Data Validation

### Booking Form Validation
| Field | Validation | Error Message |
|-------|-----------|---------------|
| Name | Non-empty | "Veuillez entrer un nom" |
| Start Date | Required | "Veuillez sélectionner une date de début" |
| End Date | Required | "Veuillez sélectionner une date de fin" |
| Date Range | End > Start | "La date de fin doit être après la date de début" |
| Conflict | No overlap | "Cette période chevauche une réservation existante" |

### Conflict Detection Algorithm
1. Get new booking dates
2. Loop through existing bookings
3. Check if new dates overlap with existing
4. If any overlap found → Show error
5. Block submission if conflict detected

## 🚀 Performance Features

### Fast Load Time
- ✅ Vite optimized bundle
- ✅ React 18 fast refresh
- ✅ Minimal dependencies
- ✅ CSS-in-JS via Tailwind (no runtime overhead)

### Smooth Interactions
- ✅ 60fps animations (GPU accelerated)
- ✅ No layout thrashing
- ✅ Optimized re-renders
- ✅ Event delegation where possible

### Efficient Updates
- ✅ Only re-render affected components
- ✅ Use React keys in lists
- ✅ Memoization for expensive calculations
- ✅ Lazy loading ready

## 🔒 Security Features

### Input Handling
- ✅ Text trimming to prevent whitespace exploits
- ✅ Date parsing with validation
- ✅ No eval() or innerHTML usage
- ✅ React's XSS protection built-in

### User Actions
- ✅ Confirmation dialogs for destructive actions
- ✅ Error boundaries for crashes
- ✅ API error handling
- ✅ No sensitive data in console logs

## ♿ Accessibility Features

### Keyboard Navigation
- ✅ Tab through all interactive elements
- ✅ Enter key to submit forms
- ✅ Escape key to close modal
- ✅ Focus indicators visible

### Screen Readers
- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ Form labels associated with inputs
- ✅ Color not only indicator (badges have text)

### Visual Accessibility
- ✅ High contrast text (WCAG AA)
- ✅ Readable font sizes
- ✅ No color-only status indicators
- ✅ Hover states clearly visible

## 🌍 Internationalization

### Current Support
- **Language:** French (fr)
- **Locale:** French date formatting (date-fns)
- **Date Format:** "1 Jan 2024" style

### UI Text
- All labels in French
- Month/day names localized
- Error messages in French

### Ready for Expansion
- Easy to add more languages
- Separate content strings
- date-fns supports 30+ locales

## 📈 Future Enhancement Ideas

### Planned Features
- [ ] User authentication & accounts
- [ ] Booking confirmation emails
- [ ] Availability search
- [ ] Price/rate management
- [ ] Guest notes/comments
- [ ] Photo gallery per booking

### Technical Improvements
- [ ] Real-time updates (WebSocket)
- [ ] Export to calendar (iCal)
- [ ] Mobile app (React Native)
- [ ] Advanced filtering
- [ ] Dark/Light theme toggle
- [ ] Booking analytics

### Integration Opportunities
- [ ] Stripe for payments
- [ ] SendGrid for emails
- [ ] Slack notifications
- [ ] Google Calendar sync
- [ ] Airbnb integration

---

**Chantemerle is built to scale!** 🚀
