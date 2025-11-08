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

## Security Design

The password is **NOT** stored in cleartext in the code. Only the SHA-256 hash is stored. This means:
- The actual password cannot be read from the source code
- Users must know the correct password to authenticate
- The password is hashed client-side before comparison

## How to Change/Add Passwords

### Step 1: Generate the Password Hash

Open `login.html` in your browser, press F12 to open Developer Console, and run:

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

Replace `"your_new_password_here"` with your desired password. Copy the hash that appears in the console.

### Step 2: Add the Hash to login.html

1. Open `login.html` in a text editor
2. Find the `validPasswords` array (around line 279):
   ```javascript
   const validPasswords = [
       '7b1f63a3393616b63dcef714d01d5664bce8c9293c0f11c88cc190ec76e8f5cb', // Default password
       // Add more SHA-256 hashes here as needed
   ];
   ```
3. Either replace the existing hash or add your new hash to the array:
   ```javascript
   const validPasswords = [
       'YOUR_NEW_HASH_HERE',  // Your password
   ];
   ```

### Using Command Line (Alternative)

You can also generate the hash using command line:

```bash
echo -n "your_password" | sha256sum | cut -d' ' -f1
```

Then add the resulting hash to the `validPasswords` array in `login.html`.

## Multiple Passwords

You can support multiple valid passwords by adding more hashes to the `validPasswords` array in `login.html`:

```javascript
const validPasswords = [
    '7b1f63a3393616b63dcef714d01d5664bce8c9293c0f11c88cc190ec76e8f5cb', // Password 1
    'a3f8d7e2c9b1f5e8d4a6c2b9e1f3d8c5a7b4e9f2d6c3a8e5b1f7d9c4a2e6b8f3', // Password 2
    // Add more hashes as needed
];
```

**Important**: Never store plaintext passwords in the code! Always use pre-computed hashes.

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

1. **Client-Side Only**: This is a client-side authentication system suitable for basic access control
2. **Not for Sensitive Data**: For production use with sensitive data, implement server-side authentication
3. **No Cleartext Passwords**: Passwords are never stored in cleartext - only SHA-256 hashes are stored
4. **Hashing**: User input is hashed client-side using SHA-256 before comparison
5. **Session Storage**: Sessions are stored in localStorage (cleared on logout or expiry)
6. **Change Default Password**: Replace the default password hash immediately!
7. **Limitations**: As this is client-side only:
   - Determined users can bypass authentication by manipulating localStorage
   - This provides basic protection, not security against skilled attackers
   - Use server-side authentication for real security requirements

## Testing

1. Navigate to `index.html` or `pdf-stamper.html`
2. You should be redirected to `login.html`
3. Enter the password: `railway123`
4. You should be redirected back to the page you were trying to access
5. Click "Logout" to end your session
