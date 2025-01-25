'use client'

import { useState, FormEvent } from 'react';
import axios from 'axios';

interface Address {
  name: string;
  cityName: string;
  postalCode: string;
  countryCode: string;
  addressLine1: string;
}

interface Package {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

interface ShippingRate {
  serviceCode: string;
  serviceName: string;
  totalPrice: number;
}

const Calculate = () => {
  const [origin, setOrigin] = useState<Address>({
    name: '',
    cityName: '',
    postalCode: '',
    countryCode: '',
    addressLine1: '',
  });
  const [destination, setDestination] = useState<Address>({
    name: '',
    cityName: '',
    postalCode: '',
    countryCode: '',
    addressLine1: '',
  });
  const [packageDetails, setPackageDetails] = useState<Package>({
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/shipping/calculate', {
        origin: {
          name: origin.name,
          postalAddress: {
            cityName: origin.cityName,
            postalCode: origin.postalCode,
            countryCode: origin.countryCode,
            addressLine1: origin.addressLine1,
          },
        },
        destination: {
          name: destination.name,
          postalAddress: {
            cityName: destination.cityName,
            postalCode: destination.postalCode,
            countryCode: destination.countryCode,
            addressLine1: destination.addressLine1,
          },
        },
        packages: [packageDetails],
      });
      setShippingRates(response.data);
    } catch (error) {
      setError('Failed to calculate shipping rates');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Calculate Shipping Rates</h1>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Origin Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={origin.name}
                  onChange={(e) => setOrigin({ ...origin, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={origin.cityName}
                  onChange={(e) => setOrigin({ ...origin, cityName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={origin.postalCode}
                  onChange={(e) => setOrigin({ ...origin, postalCode: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country Code</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={origin.countryCode}
                  onChange={(e) => setOrigin({ ...origin, countryCode: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={origin.addressLine1}
                  onChange={(e) => setOrigin({ ...origin, addressLine1: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Destination Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Destination Address</h2>
            <div className="space-y-4">
              {/* Similar fields as origin */}
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Package Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={packageDetails.weight}
                onChange={(e) => setPackageDetails({
                  ...packageDetails,
                  weight: parseFloat(e.target.value)
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Length (cm)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={packageDetails.dimensions.length}
                onChange={(e) => setPackageDetails({
                  ...packageDetails,
                  dimensions: {
                    ...packageDetails.dimensions,
                    length: parseFloat(e.target.value)
                  }
                })}
              />
            </div>
            {/* Similar inputs for width and height */}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Calculating...' : 'Calculate Rates'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {shippingRates && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Rates</h2>
          <div className="space-y-2">
            {shippingRates.map((rate) => (
              <div
                key={rate.serviceCode}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <span className="font-medium">{rate.serviceName}</span>
                <span className="text-lg font-semibold">${rate.totalPrice}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculate;
