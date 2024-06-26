import { RATE_LABELS } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';
import { getRateDisplay } from '@/utils/helpers';

const PropertyCard = ({ property }) => {
  return (
    <div className='rounded-xl shadow-md relative flex flex-col h-full'>
      <Image
        src={property?.images[0]}
        alt={property?.name}
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
        priority={true}
      />
      <div className='p-4 flex-grow flex flex-col justify-between'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property?.type}</div>
          <h3 className='text-xl font-bold'>{property?.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay(property?.rates)}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-2' /> {`${property.beds} `}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-2' /> {`${property.baths} `}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            {`${property.square_feet} `}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {Object.keys(property?.rates).map((rate) => (
            <p key={rate}>
              <FaMoneyBill className='inline mr-2' />{' '}
              {RATE_LABELS[rate].long}
            </p>
          ))}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-row md:flex-col lg:flex-row justify-between items-center'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='inline mr-2 text-orange-700 mt-1' />
            <span className='text-orange-700'>
              {`${property?.location?.city}, ${property?.location?.state}`}
            </span>
          </div>
          <Link
            href={`/properties/${property?._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm w-fit md:w-full lg:w-fit'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
