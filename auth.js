/**
 * Authentication Module for Railway Engineering Utilities
 * This script handles session management and authentication checks
 */

(function() {
    'use strict';

    const AUTH_CONFIG = {
        sessionKey: 'railwayAuthSession',
        loginPage: 'login.html'
    };

    /**
     * Check if user is authenticated
     */
    function isAuthenticated() {
        const session = localStorage.getItem(AUTH_CONFIG.sessionKey);

        if (!session) {
            return false;
        }

        try {
            const sessionData = JSON.parse(session);
            const now = new Date().getTime();

            // Check if session exists and hasn't expired
            if (sessionData.authenticated && sessionData.expiry && sessionData.expiry > now) {
                return true;
            } else {
                // Session expired, clean up
                localStorage.removeItem(AUTH_CONFIG.sessionKey);
                return false;
            }
        } catch (e) {
            // Invalid session data, clean up
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
            return false;
        }
    }

    /**
     * Redirect to login page if not authenticated
     */
    function requireAuth() {
        if (!isAuthenticated()) {
            // Get current page path for redirect after login
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `${AUTH_CONFIG.loginPage}?redirect=${encodeURIComponent(currentPage)}`;
        }
    }

    /**
     * Logout function - clears session and redirects to login
     */
    function logout() {
        localStorage.removeItem(AUTH_CONFIG.sessionKey);
        window.location.href = AUTH_CONFIG.loginPage;
    }

    /**
     * Get session info
     */
    function getSessionInfo() {
        const session = localStorage.getItem(AUTH_CONFIG.sessionKey);
        if (session) {
            try {
                return JSON.parse(session);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Export functions to global scope
    window.RailwayAuth = {
        isAuthenticated: isAuthenticated,
        requireAuth: requireAuth,
        logout: logout,
        getSessionInfo: getSessionInfo
    };

    // Auto-check authentication on page load
    // This will redirect to login if not authenticated
    requireAuth();
})();
