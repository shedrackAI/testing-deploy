// import React, { useEffect, useState } from 'react'
// import GiphySearchBox from 'react-giphy-searchbox'
// import axios from 'axios';


// function GiphyTab() {
//     const [keyword, setKeyword] = useState("");
//     const [gifs, setGifs] = useState([]);

//     const searchForGif = async () => {
//         const apiEndPoint = `https://api.giphy.com/v1/gifs/search?api_key=LiB0uMY72hiJSr1kHfqAQOTS9i2RxH0I&q=${"money"}&limit=${25}&offset=0&rating=g&lang=en`;

//         const responses = await axios.get(apiEndPoint)
//         .then((response) => {
//             setGifs(response.data.data);
//         })
//         .catch((error) => {
//             console.log(error)
//         });
//     }

//     useEffect(() => {
//       searchForGif()
//     }, [])
    
//     searchForGif()
//   return (
//     <section className='w-full bg-white shadow-lg absolute -bottom-[400px] h-[400px] left-0 rounded-lg p-5 overflow-y-scroll'>
//         <div className='w-full'>
//             <input 
//              type="text" 
//              placeholder='Search for gif' 
//              className='w-full border-none bg-[#F4F4F4] rounded-lg'
//             />
//         </div>
//         <div className='w-full mt-3 flex flex-wrap'>
//             {gifs.map((gif, index) => {
//                 return (
//                     <div key={index}>
//                         <Image 
//                          src={gif.images.fixed_height.url} 
//                          width={gif.images.preview_gif.width} 
//                          height={gif.images.preview_gif.height}
//                          alt={gifs.title}
//                         />
//                     </div>
//                 )
//             })}
//         </div>
//     </section>
//   )
// }

// export default GiphyTab




// import Image from 'next/image';
// import React, { useState } from 'react';
// import axios from 'axios';

// const GiphyTab = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [gifs, setGifs] = useState([]);

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .get(
//         `https://api.giphy.com/v1/gifs/search?api_key=LiB0uMY72hiJSr1kHfqAQOTS9i2RxH0I&q=${searchTerm}&limit=${25}&offset=0&rating=g&lang=en`
//       )
//       .then((res) => {
//         setGifs(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search Gifs"
//           value={searchTerm}
//           onChange={handleChange}
//           style={{
//             padding: '10px',
//             fontSize: '16px',
//             borderRadius: '5px',
//             border: '1px solid #ccc',
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: '10px',
//             fontSize: '16px',
//             borderRadius: '5px',
//             backgroundColor: '#0099ff',
//             color: '#fff',
//             border: 'none',
//           }}
//         >
//           Search
//         </button>
//       </form>
//       <div
//         style={{
//           display: 'grid',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(800px, 1fr))',
//           gridGap: '1rem',
//           width: "300px"
//         }}
//       >
//         {gifs.map((gif) => (
//             <Image 
//             src={gif.images.fixed_height.url} 
//             width={gif.images.preview_gif.width} 
//             height={gif.images.preview_gif.height}
//             alt={gifs.title}
//             />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GiphyTab;


// 



import React, { useState } from 'react';

const GiphyTab = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400"
        onClick={() => setShowPopup(!showPopup)}
      >
        Open Popup
      </button>

      {showPopup && (
        <div
          className="fixed z-50 top-0 right-0 bottom-0 left-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold">Popup Title</h3>
            <p className="text-gray-600 mt-2">Popup Content</p>
            <button
              className="bg-red-500 text-white mt-4 p-2 rounded-lg hover:bg-red-400"
              onClick={() => setShowPopup(false)}
            >
              Close Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiphyTab;
