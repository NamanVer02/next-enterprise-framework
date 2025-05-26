I want you to integrate PocketBase with my Next.js application and create a complete authentication system that gets installed everytime the cli command is run. Here's what I need:

## Project Setup & Dependencies
1. Install the required packages: `pocketbase` and `cookies-next`
2. Create a PocketBase client configuration in `src/lib/pocketbase.ts`

## Database Client Setup
Create a centralized PocketBase client with the following features:
- Connection to http://127.0.0.1:8090
- Authentication methods (login, register, logout)
- Error handling
- Cookie management for auth persistence

## API Routes
Create the following API routes in the app directory:
- `/api/auth/login` - POST endpoint for user authentication
- `/api/auth/register` - POST endpoint for user registration  
- `/api/auth/logout` - POST endpoint for user logout
- `/api/auth/me` - GET endpoint to check current user status

Each route should:
- Handle proper error responses
- Set/clear authentication cookies
- Return appropriate JSON responses
- Include TypeScript types

## Authentication Context
Create a React context provider that:
- Manages global authentication state
- Provides the PocketBase instance
- Handles authentication persistence
- Includes loading states
- Prevents hydration errors

## Pages & Components
Create the following pages and components:

### 1. Login Page (`/login`)
- Clean, responsive login form with email and password fields
- Form validation and error handling
- Loading states during authentication
- Redirect to dashboard after successful login
- Link to registration page

### 2. Registration Page (`/register`)
- Registration form with email, password, and password confirmation
- Form validation (matching passwords, email format)
- Error handling and success messages
- Redirect to login after successful registration

### 3. Admin Dashboard (`/admin`)
- Protected route that requires authentication
- Welcome message with user info
- Logout functionality
- Basic navigation structure

### 4. Protected Route Middleware
- Create middleware to protect admin routes
- Redirect unauthenticated users to login
- Handle authentication state checking

## Styling & UX
- Use Tailwind CSS for all styling
- Create responsive, modern-looking forms
- Include proper loading states and error messages
- Add smooth transitions and hover effects
- Ensure mobile-friendly design

## Additional Features
- Implement proper TypeScript types for all PocketBase responses
- Add form validation with proper error messages
- Include success/error toast notifications
- Handle authentication persistence across browser sessions
- Add proper SEO meta tags to auth pages

## File Structure
Organize the code with this structure:

## Requirements
- Use Next.js 14+ App Router
- Implement proper error boundaries
- Add loading states for all async operations
- Ensure the app works without JavaScript (progressive enhancement where possible)
- Handle edge cases like expired tokens and network errors
- Include proper ARIA labels for accessibility
- Add proper TypeScript types throughout

Make sure to handle common issues like hydration errors, authentication state synchronization, and proper cookie management. The authentication should persist across browser sessions and handle both successful and failed authentication attempts gracefully.

Start by setting up the PocketBase client and authentication context, then build the API routes, and finally create the UI components and pages.
