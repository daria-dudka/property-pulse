'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertySearchForm from '@/components/PropertySearchForm';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center mb-4'
          >
            <FaArrowLeft className='inline mr-2' />
            Back to Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            {properties?.length ? (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
            ) : (
              <p>No search results found</p>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;
