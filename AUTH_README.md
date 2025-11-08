# Authentication System

This repository now includes password-based authentication to protect access to the Railway Engineering Utilities apps.

## How It Works

1. **Login Required**: Users must enter a password at `login.html` before accessing any apps
2. **Session Management**: Once authenticated, the session lasts for 24 hours
3. **Automatic Redirect**: Attempting to access protected pages redirects to login
4. **Logout**: Users can logout from any page using the Logout button

## Default Password

**Default Password**: `railway123`

**IMPORTANT**: You should change this password before deploying to production!

## How to Change the Password

### Method 1: Using Browser Console (Recommended)

1. Open your browser's developer console (F12)
2. Run this command with your desired password:
   ```javascript
   (async () => {
     const password = "your_new_password_here";
     const encoder = new TextEncoder();
     const data = encoder.encode(password);
     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
     const hashArray = Array.from(new Uint8Array(hashBuffer));
     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
     console.log('Password Hash:', hashHex);
   })();
   ```
3. Copy the generated hash
4. Open `login.html` in a text editor
5. Find the line with `await hashPassword('railway123')`
6. Replace it with: `'YOUR_HASH_HERE'` (paste the hash you copied)

### Method 2: Direct Edit

1. Open `login.html`
2. Find the section around line 91 that looks like:
   ```javascript
   const validPasswords = [
       'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
       await hashPassword('railway123'),
   ];
   ```
3. Replace `'railway123'` with your desired password

## Multiple Passwords

You can support multiple valid passwords by adding more entries to the `validPasswords` array in `login.html`:

```javascript
const validPasswords = [
    await hashPassword('railway123'),    // Default password
    await hashPassword('admin_password'), // Admin password
    await hashPassword('user_password'),  // User password
];
```

## Session Duration

The default session duration is 24 hours. To change this:

1. Open `login.html`
2. Find the line: `sessionDuration: 24 * 60 * 60 * 1000`
3. Modify the calculation (it's in milliseconds):
   - 1 hour: `1 * 60 * 60 * 1000`
   - 12 hours: `12 * 60 * 60 * 1000`
   - 7 days: `7 * 24 * 60 * 60 * 1000`

## Files

- `login.html` - Login page with password authentication
- `auth.js` - Shared authentication module
- `index.html` - Protected gateway page (updated)
- `pdf-stamper.html` - Protected PDF stamper app (updated)

## Security Notes

1. This is a client-side authentication system suitable for basic access control
2. For production use with sensitive data, implement server-side authentication
3. Passwords are hashed using SHA-256 before comparison
4. Sessions are stored in localStorage (cleared on logout or expiry)
5. Change the default password immediately!

## Testing

1. Navigate to `index.html` or `pdf-stamper.html`
2. You should be redirected to `login.html`
3. Enter the password: `railway123`
4. You should be redirected back to the page you were trying to access
5. Click "Logout" to end your session
