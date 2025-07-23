import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

/**
 * Displays a list of open companionship requests with an Accept button.
 * @param {{ user?: { id: string|null } }} props - Currently logged in user.
 *   Defaults to an object with a null id if not provided.
*/
function OpenRequestsList({ user = { id: null } }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);

  // Fetch open requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('status', 'open');
      if (error) setError(error.message);
      setRequests(data || []);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  // Accept a request
  const handleAccept = async (id) => {
    setAcceptingId(id);
    const { error } = await supabase
      .from('requests')
      .update({ status: 'matched', accepted_by: user.id })
      .eq('id', id);
    setAcceptingId(null);
    if (error) {
      setError(error.message);
    } else {
      // Remove accepted request from list
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  if (loading) return <div className="mt-8 text-center">Loading open requests...</div>;
  if (error) return <div className="mt-8 text-red-500 text-center">{error}</div>;
  if (requests.length === 0) return <div className="mt-8 text-center">No open requests found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Open Companionship Requests</h2>
      <ul>
        {requests.map(req => (
          <li key={req.id} className="flex justify-between items-center border-b py-3">
            <div>
              <span className="font-semibold">{req.patient_name}</span> - {req.location}
            </div>
            <button
              onClick={() => handleAccept(req.id)}
              className="px-4 py-1 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              disabled={acceptingId === req.id}
            >
              {acceptingId === req.id ? 'Accepting...' : 'Accept'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

OpenRequestsList.defaultProps = {
  user: { id: null },
};

export default OpenRequestsList;
