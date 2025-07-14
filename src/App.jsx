import React, { useState, useEffect } from 'react';
import './App.css'; // Keep for any global styles you might have
import { supabase } from './supabaseClient'; // Your Supabase client
import AuthForm from './AuthForm'; // The login/signup form
import LanguageSwitcher from './LanguageSwitcher.jsx'; // The language toggle component
import CompanionshipRequestForm from './CompanionshipRequestForm'; // The companionship request form
import OpenRequestsList from './OpenRequestsList'; // The open requests list component

/**
 * A placeholder for the main component shown to logged-in users.
 * @param {{ user: object, onSignOut: () => void }} props
 */
const Dashboard = ({ user, onSignOut }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            Welcome back, <strong className="text-indigo-600">{user.email}</strong>!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            User ID: {user.id}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This is where your main application content will go. You can now fetch user-specific data from your database.
          </p>
        </div>
        {/* Companionship Request Form */}
        <CompanionshipRequestForm user={user} />
        {/* Open Requests List */}
        <OpenRequestsList user={user} />
      </div>
    </div>
  );
};


/**
 * The main App component that handles session management and routing.
 */
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true initially
    setLoading(true);

    // 1. Fetch the initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Set loading to false after session is fetched
    });

    // 2. Set up a listener for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // 3. Clean up the listener when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  /**
   * Handles the sign-out process.
   */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener will automatically update the session to null
  };

  // Display a loading indicator while the initial session is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {/* The LanguageSwitcher will float in the top-right corner */}
      <LanguageSwitcher />

      {/* Conditionally render AuthForm or Dashboard based on the session */}
      {!session ? (
        // If there is no session, render the authentication form
        <AuthForm />
      ) : (
        // If a session exists, render the main dashboard
        // We use the user's ID as a key to force a re-render on user change
        <Dashboard key={session.user.id} user={session.user} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
