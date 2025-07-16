import React, { useState } from 'react';
import { supabase } from './supabaseClient';

/**
 * Form for creating a new companionship request.
 * @param {{ user: object }} props - The logged in user.
*/
function CompanionshipRequestForm({ user }) {
  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.from('requests').insert([
      {
        user_id: user.id,
        patient_name: patientName,
        location: location,
      },
    ]);

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setPatientName('');
      setLocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Create Companionship Request</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={e => setPatientName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">Request submitted successfully!</p>}
    </form>
  );
}

export default CompanionshipRequestForm;
