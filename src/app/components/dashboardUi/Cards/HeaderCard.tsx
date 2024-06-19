// import React from 'react';

// const HeaderCard = () => {
//   return (
//     <div className="card bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white mt-2 ml-2 w-3/4 h-auto py-20 flex flex-col justify-center items-center sm:w-full sm:py-10 md:w-3/4 lg:w-3/4 xl:w-3/4">
//       <h2 className="text-lg font-bold">What will you design today?</h2>
//       <div className="mt-2 w-1/2 py-4">
//         <input
//           type="text"
//           placeholder="Search your content or Canva's"
//           className="w-full p-2 rounded"
//         />
//       </div>
//       <div className="flex flex-wrap justify-center space-x-2 mt-4 py-4">
//         {/* Icons for document types */}
//         {/* Replace with actual icons */}
//         <button className="rounded-full bg-white text-black p-2">For you</button>
//         <button className="rounded-full bg-white text-black p-2">Instagram post</button>
//         {/* ... other buttons */}
//         <button className="bg-white text-black rounded px-4 py-2 mr-2">Custom size</button>
//         <button className="bg-white text-black rounded px-4 py-2">Upload</button>
//       </div>
//     </div>
//   );
// };

// export default HeaderCard;
// import React from 'react';

// const HeaderCard = () => {
//   return (
//     <div className="card bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white mt-2 ml-2 w-full h-auto py-20 flex flex-col justify-center items-center">
//       <h2 className="text-lg font-bold">What will you design today?</h2>
//       <div className="mt-2 w-1/2 py-4">
//         <input
//           type="text"
//           placeholder="Search your content or Canva's"
//           className="w-full p-2 rounded"
//         />
//       </div>
//       <div className="flex flex-wrap justify-center space-x-2 mt-4 py-4">
//         {/* Icons for document types */}
//         {/* Replace with actual icons */}
//         <button className="rounded-full bg-white text-black p-2">For you</button>
//         <button className="rounded-full bg-white text-black p-2">Instagram post</button>
//         {/* ... other buttons */}
//         <button className="bg-white text-black rounded px-4 py-2 mr-2">Custom size</button>
//         <button className="bg-white text-black rounded px-4 py-2">Upload</button>
//       </div>
//     </div>
//   );
// };

// export default HeaderCard;

import React from 'react';

const HeaderCard = () => {
  return (
    <div className="card bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white mt-2 mx-2 w-full h-auto py-20 flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold">What will you design today?</h2>
      <div className="mt-2 w-1/2 py-4">
        <input
          type="text"
          placeholder="Search your content or Canva's"
          className="w-full p-2 rounded"
        />
      </div>
      <div className="flex flex-wrap justify-center space-x-2 mt-4 py-4">
        {/* Icons for document types */}
        {/* Replace with actual icons */}
        <button className="rounded-full bg-white text-black p-2">For you</button>
        <button className="rounded-full bg-white text-black p-2">Instagram post</button>
        {/* ... other buttons */}
        <button className="bg-white text-black rounded px-4 py-2 mr-2">Custom size</button>
        <button className="bg-white text-black rounded px-4 py-2">Upload</button>
      </div>
    </div>
  );
};

export default HeaderCard;
