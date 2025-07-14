import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';

export default function AuthForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(t('auth.loginError', { message: error.message }));
    }
    setLoading(false);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
        setMessage(t('auth.signupError', { message: error.message }));
    } else {
        setMessage(t('auth.signupSuccess'));
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{t('auth.title')}</h1>
      <p className="text-center text-gray-600 mb-6">{t('auth.description')}</p>
      {message && <div className="mb-4 text-center text-sm font-semibold text-blue-600 bg-blue-100 p-3 rounded-md">{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            {t('auth.emailLabel')}
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            {t('auth.passwordLabel')}
          </label>
          <input
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? t('auth.loading') : t('auth.signIn')}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? t('auth.loading') : t('auth.signUp')}
          </button>
        </div>
      </form>
    </div>
  );
}
