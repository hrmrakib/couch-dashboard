"use client";	

const Loading = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-center items-center h-80'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
