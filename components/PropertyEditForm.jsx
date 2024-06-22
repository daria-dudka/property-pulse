'use client';

import {
  AMENITIES,
  LOCATION_FIELDS,
  PROPERTY_TYPES,
  RATE_LABELS,
  SELLER_FIELDS,
} from '@/utils/constants';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchProperty } from '@/utils/request';

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    type: '',
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    beds: '',
    baths: '',
    square_feet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      nightly: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);

        if (propertyData?.rates) {
          const defaultRates = { ...propertyData.rates };
          for (const rate in defaultRates) {
            if (!defaultRates[rate]) {
              defaultRates[rate] = '';
            }
          }
          propertyData.rates = defaultRates;
        }
        setFields(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    const updatedAmenities = [...fields.amenities];

    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        router.push(`/properties/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className='text-3xl text-center font-semibold mb-6'>
          Edit Property
        </h2>

        <div className='mb-4'>
          <label
            htmlFor='type'
            className='block text-gray-700 font-bold mb-2'
          >
            Property Type
          </label>
          <select
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3'
            required
            value={fields.type}
            onChange={handleChange}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Listing Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='eg. Beautiful Apartment In Miami'
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border rounded w-full py-2 px-3'
            rows='4'
            placeholder='Add an optional description of your property'
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Location
          </label>
          {LOCATION_FIELDS.map((field) => (
            <input
              key={field}
              type='text'
              id={field}
              name={`location.${field}`}
              className='border rounded w-full py-2 px-3 mb-2'
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={fields.location[field]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className='mb-4 flex flex-wrap'>
          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='beds'
              className='block text-gray-700 font-bold mb-2'
            >
              Beds
            </label>
            <input
              type='number'
              id='beds'
              name='beds'
              className='border rounded w-full py-2 px-3'
              required
              value={fields.beds}
              onChange={handleChange}
            />
          </div>
          <div className='w-full sm:w-1/3 px-2'>
            <label
              htmlFor='baths'
              className='block text-gray-700 font-bold mb-2'
            >
              Baths
            </label>
            <input
              type='number'
              id='baths'
              name='baths'
              className='border rounded w-full py-2 px-3'
              required
              value={fields.baths}
              onChange={handleChange}
            />
          </div>
          <div className='w-full sm:w-1/3 pl-2'>
            <label
              htmlFor='square_feet'
              className='block text-gray-700 font-bold mb-2'
            >
              Square Feet
            </label>
            <input
              type='number'
              id='square_feet'
              name='square_feet'
              className='border rounded w-full py-2 px-3'
              required
              value={fields.square_feet}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Amenities
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {AMENITIES.map((amenity) => (
              <div key={amenity}>
                <input
                  type='checkbox'
                  id={`amenity_${amenity
                    .replace(/ /g, '_')
                    .toLowerCase()}`}
                  name='amenities'
                  value={amenity}
                  className='mr-2'
                  checked={fields.amenities.includes(amenity)}
                  onChange={handleAmenitiesChange}
                />
                <label
                  htmlFor={`amenity_${amenity
                    .replace(/ /g, '_')
                    .toLowerCase()}`}
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Rates (Leave blank if not applicable)
          </label>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
            {Object.keys(RATE_LABELS).map((key) => (
              <div className='flex items-center' key={key}>
                <label htmlFor={`${key}_rate`} className='mr-2'>
                  {RATE_LABELS[key].long}
                </label>
                <input
                  type='number'
                  id={`${key}_rate`}
                  name={`rates.${key}`}
                  className='border rounded w-full py-2 px-3'
                  value={fields.rates[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {SELLER_FIELDS.map((field) => (
          <div key={field} className='mb-4'>
            <label
              htmlFor={`seller_${field}`}
              className='block text-gray-700 font-bold mb-2'
            >
              Seller {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={`seller_${field}`}
              name={`seller_info.${field}`}
              className='border rounded w-full py-2 px-3'
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={fields.seller_info[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};
export default PropertyEditForm;