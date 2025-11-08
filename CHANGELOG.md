# Changelog

All notable changes to Railway Engineering Utilities will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
