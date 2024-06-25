'use client';
import addProperty from '@/app/actions/addProperty';
import { toast } from 'react-toastify';
import {
  AMENITIES,
  LOCATION_FIELDS,
  PROPERTY_TYPES,
  RATE_LABELS,
  SELLER_FIELDS,
} from '@/utils/constants';
import SubmitButton from './SubmitButton';

const PropertyAddForm = () => {
  const handleImageChange = (e) => {
    if (e.target.files.length > 4) {
      e.target.value = '';
      toast.error('You can select up to 4 images in total.');
    }
  };

  return (
    <form action={addProperty}>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Add Property
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
          />
        </div>
      ))}

      <div className='mb-4'>
        <label
          htmlFor='images'
          className='block text-gray-700 font-bold mb-2'
        >
          Images (Select up to 4 images)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          className='border rounded w-full py-2 px-3'
          accept='image/*'
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
};
export default PropertyAddForm;
