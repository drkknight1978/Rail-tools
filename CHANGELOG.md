# Changelog

All notable changes to Railway Engineering Utilities will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-11-09

### Added - PDF Stamper Date Functionality

#### Enhanced Files
- **pdf-stamper.html** - Added comprehensive date stamping functionality
  - New "Date Options" control group in UI
  - Date text rendering in preview canvas
  - Date text embedding in final PDF output
  - Integration with existing stamp positioning system
  - Real-time preview updates

#### Features

- **Date Stamping Controls**
  - "Add date to stamp" checkbox to enable/disable date functionality
  - All date controls disabled until checkbox is checked and files are loaded
  - Seamless integration with existing PDF Stamper workflow

- **Date Position Presets**
  - **Middle**: Date centered in the middle of the stamp (Stamp_Width × 0.5, Stamp_Height × 0.5)
  - **Top**: Date positioned above stamp with date_bottom = stamp_top, horizontally centered
  - **Bottom**: Date positioned below stamp with stamp_bottom = date_top, horizontally centered
  - Mutually exclusive radio button selection

- **Date Customization**
  - **Date Picker**: HTML5 date input with default value set to today's date
  - **Color Picker**: Full color selection with default blue (#0000ff)
  - **Font Size Slider**: Adjustable from 8px to 72px (default 24px)
  - Real-time slider value display

- **Precision Position Adjustment**
  - **X-axis controls**: −10, −1, +1, +10 pixel adjustment buttons
  - **Y-axis controls**: −10, −1, +10 pixel adjustment buttons
  - Fine movement: ±1 pixel for precise positioning
  - Rough movement: ±10 pixels for quick adjustments
  - Real-time offset value display
  - Offsets applied relative to selected position preset
  - Separate rows for X and Y controls for better layout

- **Date Formatting**
  - British date format (DD/MM/YYYY) using 'en-GB' locale
  - Automatically formats selected date for display
  - Consistent formatting in both preview and PDF output

- **Preview Integration**
  - Date text rendered on preview canvas with proper positioning
  - Font size scaled according to zoom factor
  - Color applied from user selection
  - Center-aligned text with middle baseline
  - Offset adjustments visible in real-time

- **PDF Generation**
  - Date text embedded using pdf-lib drawText() method
  - Hex color converted to RGB for PDF rendering
  - Font size scaled proportionally with PDF dimensions
  - Text width approximation for centering
  - Y-axis coordinate inversion handling for PDF coordinate system
  - Offset adjustments applied with proper scaling

#### Technical Implementation

- **State Management**
  - `addDate`: Boolean flag for date feature toggle
  - `datePosition`: String ('middle', 'top', 'bottom')
  - `dateValue`: ISO date string (YYYY-MM-DD format)
  - `dateColor`: Hex color string (default '#0000ff')
  - `dateFontSize`: Integer (8-72, default 24)
  - `dateOffsetX`: Integer offset in pixels (default 0)
  - `dateOffsetY`: Integer offset in pixels (default 0)

- **DOM Elements**
  - 8 new radio buttons and checkboxes
  - 12 new adjustment buttons (X/Y controls)
  - 3 new input elements (date picker, color picker, font size slider)
  - 2 new display spans for offset values

- **Event Handlers**
  - `handleAddDateChange()`: Toggle date feature on/off
  - `handleDatePositionChange()`: Update position preset
  - `handleDateInputChange()`: Update selected date
  - `handleDateColorChange()`: Update text color
  - `handleDateFontSizeChange()`: Update font size
  - `adjustDateOffset()`: Handle position adjustment buttons

- **Rendering Logic**
  - Canvas date rendering in `updatePreview()` function
  - PDF date rendering in `handleProcess()` function
  - Zoom factor applied to font size and offsets in preview
  - Scale factor applied to font size and offsets in PDF
  - Y-axis inversion handling for PDF coordinates

#### User Interface

- **Layout**
  - New "Date Options" section below "Stamp Controls"
  - Vertically stacked radio buttons for position selection
  - Horizontal button groups for X/Y adjustment
  - Slider with real-time value display for font size
  - Standard color picker input
  - Date picker input with calendar popup

- **Accessibility**
  - All controls properly labeled
  - Disabled state management based on feature enablement
  - Visual feedback for current offset values
  - Intuitive button layout with minus/plus symbols

### Changed

- **pdf-stamper.html** - UI Layout
  - Added new control group between "Stamp Controls" and "Page Options"
  - Updated control sections to accommodate date options
  - Enhanced state management for new date-related properties

### Testing

Manual testing completed:
- ✅ Date checkbox enables/disables all date controls
- ✅ Position presets (Middle, Top, Bottom) work correctly
- ✅ Date picker defaults to today's date
- ✅ Color picker works with real-time preview
- ✅ Font size slider updates preview dynamically
- ✅ X/Y position adjustment buttons work correctly
- ✅ Fine movement (±1px) provides precise control
- ✅ Rough movement (±10px) allows quick positioning
- ✅ Offset values display correctly
- ✅ Preview shows date text in correct position
- ✅ Final PDF embeds date text correctly
- ✅ British date format (DD/MM/YYYY) displays properly
- ✅ Zoom factor correctly scales date text in preview
- ✅ Date text scales proportionally in PDF output
- ✅ All controls disabled until PDF and stamp loaded
- ✅ Date controls disabled until "Add date" checked

### Known Limitations

1. **Font Selection**: Only Arial font available (pdf-lib limitation)
2. **Text Width**: Uses approximation for centering (no precise font metrics)
3. **Date Format**: Fixed to British format (DD/MM/YYYY)
4. **Single Date**: Only one date can be added per stamp
5. **No Rotation**: Date text always horizontal
6. **No Shadow/Outline**: Plain text only, no effects

### Migration Notes

For existing users upgrading from v2.1:
1. **No Breaking Changes**: All existing PDF Stamper functionality preserved
2. **Optional Feature**: Date stamping is opt-in via checkbox
3. **Backward Compatible**: PDFs can be processed without dates as before
4. **New Controls**: Date section appears below Stamp Controls

## [2.1.0] - 2025-11-08

### Added - Voltage Drop Calculator

#### New Files
- **calc.html** - Voltage drop calculator tool
  - Railway Engineering themed design matching application suite
  - CSV-based conductor data upload functionality
  - Iterative voltage drop calculation algorithm
  - Real-time calculation with detailed results
  - Input validation and error handling
  - Authentication integration with auth.js
  - Back navigation to index.html
  - Responsive design for mobile devices

- **classic_style.css** - Classic styling for calculator
  - Consistent Railway Engineering aesthetic
  - Dark theme with gold/copper accents
  - Matching typography and decorative elements

#### Modified Files
- **index.html**
  - Replaced "Technical Drawings" placeholder with "Voltage Drop Calculator" card (line 277-289)
  - Added link to calc.html
  - Changed icon to ⚡ (electrical symbol)
  - Updated description to reflect voltage drop calculation functionality
  - Changed card from "coming-soon" to active/available status

#### Features
- **CSV Upload for Conductor Data**
  - FileReader API integration for client-side CSV parsing
  - Header row detection and skipping
  - Dynamic dropdown population from CSV data
  - Support for custom conductor size naming (e.g., "2.5mm²", "2.5 (f)")
  - Validation of resistance values
  - Success/error feedback to user
  - Proprietary data protection (no hardcoded conductor values in repository)

- **Iterative Calculation Algorithm**
  - Voltage drop calculation using iterative convergence method
  - Tolerance-based error checking (0.01V)
  - Infinite loop protection (max 100,000 iterations)
  - Calculates voltage at load, current drawn, and voltage drop
  - Displays both absolute voltage drop and percentage

- **User Interface**
  - Disabled conductor dropdown until CSV is uploaded
  - Disabled calculate button until valid data is loaded
  - Form validation for all input fields
  - Clear error messaging for invalid inputs
  - Results display with detailed breakdown:
    - Voltage at Load (V)
    - Current Drawn (A)
    - Voltage Drop (V and %)
    - Iteration count
  - Decorative rivet effects and railway-themed styling
  - Responsive layout for mobile devices

### Changed
- **index.html**
  - Removed "Technical Drawings" placeholder card
  - Added "Voltage Drop Calculator" as second available tool
  - Updated utility grid with active calculator link

### Security
- **Proprietary Data Protection**
  - No conductor resistance data stored in repository
  - Users must provide their own CSV files with conductor specifications
  - Prevents disclosure of proprietary engineering data
  - CSV format documented for user reference

### Documentation
- Updated README.md with:
  - Voltage Drop Calculator in Available Tools section
  - Detailed usage instructions
  - CSV format specifications and examples
  - File structure updates
  - Troubleshooting section for calculator issues
  - Version history update
- Updated CHANGELOG.md with comprehensive v2.1.0 changes

### Technical Details
- **Input Parameters**:
  - Conductor resistance (Ω/km) - from CSV
  - Cable length (km)
  - Power load (VA)
  - Supplied voltage (V)

- **Calculation Method**:
  ```
  Iterative approach:
  1. Initial assumption: V_load = V_supplied (no drop)
  2. Calculate current: I = P / V_load
  3. Calculate voltage drop: V_drop = I × R × L
  4. Update V_load: V_load_new = V_supplied - V_drop
  5. Check error: |V_load_new - V_load|
  6. Repeat until error < tolerance (0.01V)
  ```

- **Browser Requirements**:
  - FileReader API support
  - ES6+ JavaScript features
  - localStorage API (for authentication)

### Testing
Manual testing completed:
- ✅ CSV upload with valid data populates dropdown
- ✅ CSV upload with invalid data shows error
- ✅ Calculate button disabled until CSV loaded
- ✅ Input validation works for all fields
- ✅ Calculation produces accurate results
- ✅ Results display correctly formatted
- ✅ Authentication check redirects to login
- ✅ Back navigation returns to index.html
- ✅ Responsive design works on mobile
- ✅ Railway styling matches application theme

### Known Limitations
1. **CSV Format Requirement**: Users must provide CSV files in specific format
2. **Client-Side Only**: No server-side validation or storage
3. **No CSV Template**: Users must create their own CSV files
4. **Single File Upload**: Cannot merge multiple CSV files
5. **No Data Persistence**: Uploaded CSV data cleared on page refresh

### Migration Notes
For existing users upgrading from v2.0:
1. **No Breaking Changes**: Existing tools continue to work
2. **New Tool Available**: Voltage Drop Calculator accessible from index.html
3. **CSV Required**: Users need to prepare conductor data CSV files
4. **Same Authentication**: Uses existing auth.js and session management

## [2.0.0] - 2025-11-08

### Added - Authentication System

#### New Files
- **login.html** - Password-based authentication page
  - Railway Engineering themed design matching index.html
  - SHA-256 password hashing using Web Crypto API
  - Session management with configurable expiration
  - Auto-redirect to intended page after successful login
  - Error messaging for invalid credentials
  - Responsive design for mobile devices

- **auth.js** - Shared authentication module
  - Session validation and management
  - Automatic redirect to login for unauthorized access
  - `isAuthenticated()` - Check current authentication status
  - `requireAuth()` - Enforce authentication requirement
  - `logout()` - Clear session and redirect to login
  - `getSessionInfo()` - Retrieve current session data
  - 24-hour session duration by default

- **AUTH_README.md** - Comprehensive authentication documentation
  - Quick start guide
  - Password change instructions (browser console & command line)
  - Session duration configuration
  - Security notes and limitations
  - Troubleshooting guide
  - Multiple password support documentation

- **CHANGELOG.md** - This file

#### Modified Files
- **index.html**
  - Added `<script src="auth.js"></script>` for authentication
  - Added logout button in header (top-right on desktop, full-width on mobile)
  - Updated CSS with logout button styles
  - Now redirects to login.html if not authenticated

- **pdf-stamper.html**
  - Added `<script src="auth.js"></script>` for authentication
  - Replaced single h1 with header controls section
  - Added "Back to Home" button to return to index.html
  - Added logout button in header
  - Updated CSS with header controls and button styles
  - Responsive design for header on mobile
  - Now redirects to login.html if not authenticated

#### Security Features
- **Password Hashing**: Passwords hashed with SHA-256 before storage/comparison
- **No Cleartext Storage**: Only password hashes stored in code (initially had cleartext, fixed in commit 63406ff)
- **Session Management**: 24-hour sessions stored in localStorage
- **Automatic Expiry**: Sessions expire and are cleaned up automatically
- **Logout Functionality**: Users can manually end sessions
- **Client-Side Security**: All authentication happens client-side (suitable for basic access control)

#### Configuration Options
- Default password: `railway123` (hash: `7b1f63a3393616b63dcef714d01d5664bce8c9293c0f11c88cc190ec76e8f5cb`)
- Session duration: 24 hours (configurable in login.html)
- Multiple password support via hash array in validPasswords

### Changed
- **README.md** - Complete rewrite
  - Changed title from "PDF Stamper Web App" to "Railway Engineering Utilities"
  - Added authentication requirements section
  - Added quick start guide with login instructions
  - Added security features documentation
  - Added authentication flow diagram
  - Added configuration instructions
  - Added authentication troubleshooting
  - Updated file structure documentation
  - Updated version history
  - Enhanced technical details section

### Security Fixes
- **Commit bb26f5d**: Initial authentication implementation (had cleartext password)
- **Commit 63406ff**: Removed cleartext password from login.html
  - Replaced `await hashPassword('railway123')` with pre-computed hash
  - Prevents password discovery via source code inspection
  - Updated AUTH_README.md with security best practices
  - Added documentation about client-side security limitations

### Documentation
- Added warning about changing default password
- Documented security limitations of client-side authentication
- Added browser compatibility requirements (Web Crypto API)
- Provided instructions for password hash generation
- Included troubleshooting for common authentication issues

### Testing
Manual testing completed:
- ✅ Login with correct password redirects to intended page
- ✅ Login with incorrect password shows error message
- ✅ Session persists across page refreshes
- ✅ Session expires after 24 hours
- ✅ Logout clears session and redirects to login
- ✅ Unauthenticated access redirects to login
- ✅ Redirect parameter works correctly
- ✅ Password hash comparison works
- ✅ Multiple browser tabs share session (localStorage)
- ✅ Responsive design works on mobile

### Known Limitations
1. **Client-Side Only**: Authentication can be bypassed by manipulating localStorage
2. **Not Production-Grade**: Suitable for basic access control, not sensitive data
3. **Session Sharing**: All tabs/windows share the same session (localStorage behavior)
4. **No Password Recovery**: Forgot password requires code edit
5. **No User Management**: Single password for all users (or array of hashes)
6. **No Audit Trail**: No logging of login attempts or access

### Migration Guide
For existing users upgrading from v1.0:

1. **No Breaking Changes**: Existing functionality preserved
2. **New Login Required**: Users must now login before accessing tools
3. **Default Password**: Use `railway123` initially
4. **Change Password**: Follow instructions in AUTH_README.md to change default password
5. **Session Duration**: 24-hour sessions may require re-login for long sessions
6. **Logout Available**: Users can now explicitly logout

### Recommended Actions
1. ✅ Change default password immediately
2. ✅ Review AUTH_README.md for setup instructions
3. ✅ Test authentication flow in your environment
4. ✅ Configure session duration if 24 hours doesn't suit your needs
5. ✅ Add multiple passwords if needed for different users
6. ⚠️ Consider server-side authentication for production deployments with sensitive data

---

## [1.0.0] - Initial Release

### Added
- **index.html** - Railway Engineering themed gateway page
  - Beautiful 19th century railway engineering aesthetic
  - Dark theme with gold/copper accents
  - Grid layout for utility cards
  - Decorative rivet effects
  - Responsive design

- **pdf-stamper.html** - PDF stamping tool
  - PDF preview with PDF.js integration
  - Zoom controls (10-300%)
  - Page navigation
  - Stamp positioning (presets and custom)
  - Drag-and-drop stamp positioning
  - Opacity control (0-100%)
  - Scale control (10-200%)
  - Page range support
  - Real-time preview
  - Client-side processing (no server needed)

### Features
- 100% client-side processing
- No data upload to servers
- Privacy-focused design
- Offline capable (after initial CDN load)
- Modern browser support

### Dependencies
- PDF.js v3.11.174 (CDN)
- pdf-lib v1.17.1 (CDN)

---

## Upcoming Features

### Planned for v2.1
- [ ] Remember me option (extend session beyond 24 hours)
- [ ] Password strength indicator
- [ ] Configurable password policy
- [ ] Login attempt limiting

### Planned for v3.0
- [ ] Technical Drawings Converter
- [ ] Rail Calculator
- [ ] Data Converter
- [ ] User preferences storage

### Future Considerations
- [ ] Server-side authentication option
- [ ] Multi-user support with roles
- [ ] Audit logging
- [ ] Password recovery mechanism
- [ ] Two-factor authentication
- [ ] OAuth integration options

---

## Security Advisories

### [2.0.0] Client-Side Authentication
**Severity**: Informational
**Impact**: Authentication can be bypassed by determined users
**Recommendation**: Use server-side authentication for production applications with sensitive data
**Mitigation**: This is a known limitation of client-side authentication, suitable only for basic access control

### [2.0.0] Default Password
**Severity**: High (if not changed)
**Impact**: Default password is documented and well-known
**Recommendation**: Change default password immediately before deployment
**Mitigation**: Follow instructions in AUTH_README.md to generate and set new password hash

---

## Contributors
- Claude (Anthropic) - Initial authentication implementation and documentation

## Links
- [Authentication Guide](AUTH_README.md)
- [Main Documentation](README.md)
