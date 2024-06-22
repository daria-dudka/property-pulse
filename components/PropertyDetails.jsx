import {
  FaBath,
  FaBed,
  FaMapMarker,
  FaRulerCombined,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import { RATE_LABELS } from '@/utils/constants';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{property.type}</div>
        <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          <FaMapMarker className='inline mr-2 text-lg text-orange-700' />
          <p className='text-orange-700'>
            {`${property?.location?.street}, ${property?.location?.city}, ${property?.location?.state}`}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          {Object.keys(RATE_LABELS).map((rateType) => (
            <div
              key={rateType}
              className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'
            >
              <div className='text-gray-500 mr-2 font-bold'>
                {RATE_LABELS[rateType].long}
              </div>
              <div className='text-2xl font-bold'>
                {property.rates[rateType] ? (
                  <span className='text-blue-500'>
                    ${property.rates[rateType].toLocaleString()}
                  </span>
                ) : (
                  <FaTimes className='text-red-700' />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>
          Description & Details
        </h3>
        <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
          <p>
            <FaBed className='inline-block mr-2' />
            {`${property.beds} `}
            <span className='hidden sm:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2' />
            {`${property.baths} `}
            <span className='hidden sm:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2' />
            {`${property.square_feet} `}
            <span className='hidden sm:inline'>sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4 text-center'>
          {property.description}
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none'>
          {property.amenities.map((amenity, index) => (
            <li key={index} className='p-2'>
              <FaCheck className='inline-block mr-2 text-green-600' />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <div id='map'></div>
      </div>
    </main>
  );
};
export default PropertyDetails;
