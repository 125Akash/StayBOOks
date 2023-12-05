import React from 'react';

const EndPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Congratulations!</h1>
          <p className="text-lg text-gray-200">You've completed the challenge. Well done!</p>
        </div>
      </div>
    </>
  );
}

export default EndPage;
