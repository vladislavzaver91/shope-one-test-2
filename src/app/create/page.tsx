'use client'

import { useState, FormEvent } from 'react';
import axios from 'axios';

interface Shipment {
  trackingId: string;
  cost: number;
  status: string;
}

const CreateShipment = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateShipment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/shipping/create', { orderId });
      setShipment(response.data.shipment);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to create shipment');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Shipment</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleCreateShipment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Order ID</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !orderId}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Shipment'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {shipment && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Shipment Created Successfully</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Tracking ID:</span>
                <span>{shipment.trackingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cost:</span>
                <span>${shipment.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="capitalize">{shipment.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateShipment;
