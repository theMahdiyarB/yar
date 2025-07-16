import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthForm from './AuthForm.jsx'; // Assuming this is now a .jsx file
import LanguageSwitcher from './LanguageSwitcher.jsx';
import CompanionshipRequestForm from './CompanionshipRequestForm.jsx';
import OpenRequestsList from './OpenRequestsList.jsx';
import { useTranslation } from 'react-i18next';

/**
 * The main Dashboard component shown to logged-in users.
 * This component handles the layout of the application's core features.
 */
const Dashboard = ({ user, onSignOut }) => {
  const { t } = useTranslation();

  return (
    // Main container with a background color and padding
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {t('appTitle')}
          </h1>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            {t('auth.signOut')}
          </button>
        </header>

        {/* Main Content Grid (responsive) */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Request Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <CompanionshipRequestForm user={user} />
          </div>

          {/* Right Column: List of Open Requests */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <OpenRequestsList />
          </div>

        </main>
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
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="App">
      {/* Language switcher floats on top */}
      <LanguageSwitcher />
      
      {/* Conditionally render AuthForm or the new Dashboard */}
      {session ? (
        <Dashboard user={session.user} onSignOut={handleSignOut} />
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;
