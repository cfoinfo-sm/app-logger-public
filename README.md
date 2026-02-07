# Event Logger PWA

A simple Progressive Web App for logging everyday events by type.

## Features

- **User Authentication**: Register, login, and password reset functionality
- **Event Logging**: Quick event logging with custom types and notes
- **Event Types Management**: Create and manage your own event categories
- **Reports**: View filtered event history with pagination
- **Offline Support**: Works offline once installed
- **Mobile-First Design**: Optimized for mobile devices

## How to Install on Android

### Method 1: Using a Web Server (Recommended)

1. **Host the files on a web server** (GitHub Pages, Netlify, Vercel, etc.)
   - Upload all files (index.html, app.js, sw.js, manifest.json, icons) to your hosting service
   - Make sure the files are served over HTTPS

2. **Open in Chrome on your Android phone**
   - Navigate to your hosted URL
   - Tap the menu (three dots) in Chrome
   - Select "Add to Home screen"
   - Follow the prompts to install

### Method 2: Local Testing

1. **Using Python's built-in server**:
   ```bash
   # Navigate to the folder containing the files
   python3 -m http.server 8000
   ```

2. **Access from your phone**:
   - Find your computer's IP address (e.g., 192.168.1.100)
   - On your phone's browser, go to: http://YOUR_IP:8000
   - Add to home screen as above

### Method 3: Using GitHub Pages (Easiest)

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Enable GitHub Pages from the main branch
5. Access the URL provided (e.g., https://username.github.io/repo-name/)
6. Install the PWA from your phone

## Usage

### First Time Setup

1. **Register an Account**
   - Click "Create an account" on the login page
   - Enter your name, email, and password
   - Click "Register"

2. **Login**
   - Use your email and password to login

### Logging Events

1. **Quick Log**
   - From the dashboard, click the big "📝 Log Event" button
   - Select an event type from the dropdown
   - Optionally add notes
   - Click "Log Event"

2. **View Recent Events**
   - The dashboard shows your 10 most recent events
   - Each event displays the type, notes, and timestamp

### Managing Event Types

1. Navigate to "Manage Types" from the dashboard
2. To add a new type:
   - Enter the type name
   - Click "Add Type"
3. To delete a type:
   - Click "Delete" next to any event type
   - Confirm the deletion

### Viewing Reports

1. Navigate to "Reports" from the dashboard
2. Select an event type from the dropdown
3. View all events for that type, sorted by most recent first
4. Use "Previous" and "Next" buttons to navigate through pages (10 events per page)

## Default Event Types

The app comes with these default event types:
- Exercise
- Meal
- Work
- Social
- Sleep

You can add more or delete these as needed.

## Data Storage

- All data is stored locally in your browser's localStorage
- Data persists between sessions
- Data is specific to each user account
- Clear browser data will delete all stored information

## Files Included

- `index.html` - Main HTML structure
- `app.js` - Application logic
- `sw.js` - Service worker for offline support
- `manifest.json` - PWA manifest
- `icon-192.png` - App icon (192x192)
- `icon-512.png` - App icon (512x512)

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage
- **PWA Features**: Service Worker, Web App Manifest
- **No Backend Required**: Runs entirely in the browser

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser supporting PWA standards

## Security Note

This is a client-side only application. Passwords are stored in plain text in localStorage. For production use with sensitive data, implement proper backend authentication and encryption.

## Troubleshooting

**App won't install:**
- Make sure you're accessing via HTTPS (or localhost)
- Clear browser cache and try again
- Make sure all files are accessible

**Events not saving:**
- Check browser console for errors
- Ensure localStorage is enabled in browser settings

**Can't see my events:**
- Make sure you're logged in with the correct account
- Events are user-specific

## License

Free to use and modify as needed.
