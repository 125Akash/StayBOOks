"use client";
import React, { useState ,useEffect} from "react";
import Link from "next/link";
import {toast} from "react-toastify";

const Description = () => {
  // State object to hold all input values
  const [formDatas, setFormDatas] = useState({
    hotelDescription: "",
    descriptionList: "",
    airport: {
      hotelName: "",
      distance: "",
      time: "",
    },
    busStation: {
      hotelName: "",
      distance: "",
      time: "",
    },
    railwayStation: {
      hotelName: "",
      distance: "",
      time: "",
    },
  });


  

  // Function to handle input changes
  const handleInputChange = (e, section, field) => {
    setFormDatas((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: e.target.value,
      },
    }));
  };

  // Function to send data to the database (you need to implement your own logic here)

  const sendDataToDatabase = async (data) => {
    try {
      const res = await fetch(
        "https://akashpedia-ebaf8-default-rtdb.firebaseio.com/description.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          timestamp: new Date().toISOString(),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to save document");
      }
      if (res.ok) {
        const Data = await res.json();
        console.log(Data);
      }
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    fetchDataFromDatabase();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const fetchDataFromDatabase = async () => {
    try {
      const res = await fetch("https://akashpedia-ebaf8-default-rtdb.firebaseio.com/description.json");
  
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await res.json();
  
      // Check if there is any data
      if (data) {
        // Iterate through all keys in data
        Object.keys(data).forEach((descriptionId) => {
          const descriptionData = data[descriptionId];
         
  
          // Update the state with the extracted data
          setFormDatas({
            hotelDescription: descriptionData.hotelDescription || "",
            descriptionList: descriptionData.descriptionList || "",
            airport: descriptionData.airport || {},
            busStation: descriptionData.busStation || {},
            railwayStation: descriptionData.railwayStation || {},
          });
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  

  // JSX for the component
  return (
    <>
      {/* Hotel Description Section */}
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="flex items-center">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Hotel Description :</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <textarea
                placeholder="Write the Name"
                value={formDatas.hotelDescription.hotelName}
                onChange={(e) =>
                  handleInputChange(e, "hotelDescription", "hotelName")
                }
                className="p-3 border border-solid shadow-xl rounded-xl w-96"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Description List:</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <textarea
                type="text"
                placeholder="Write Description"
                value={formDatas.descriptionList.description}
                onChange={(e) =>handleInputChange(e, "descriptionList", "description")
                }
                className="p-3 border border-solid shadow-xl rounded-xl w-[100%]"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Hotel Near The Airport Section */}
      <div className="flex flex-col justify-center items-center mx-auto m-5">
        <h3 className="text-start w-[15%] m-2 text-green-900 font-semibold">
          Hotel Near The Airport
        </h3>
        <div className="flex">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Hotel Name :</label>
          </div>
          <div className="m-3">
            <label>
              <input
                type="text"
                placeholder="Write the Name"
                value={formDatas.airport.hotelName}
                onChange={(e) => handleInputChange(e, "airport", "hotelName")}
                className="p-3 border border-solid shadow-xl rounded-xl w-96"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center ml-[10%] gap-2">
          <label>
            <input
              type="text"
              placeholder="Distance"
              value={formDatas.airport.distance}
              onChange={(e) => handleInputChange(e, "airport", "distance")}
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Time"
              value={formDatas.airport.time}
              onChange={(e) => handleInputChange(e, "airport", "time")}
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
        </div>
      </div>

      {/* Hotel Near The bus Section */}
      <div className="flex flex-col justify-center items-center mx-auto m-5">
        <h3 className="text-start w-[15%] m-2 text-green-900 font-semibold">
          Hotel Near The Airport
        </h3>
        <div className="flex">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Hotel Name :</label>
          </div>
          <div className="m-3">
            <label>
              <input
                type="text"
                placeholder="Write the Name"
                value={formDatas.busStation.hotelName}
                onChange={(e) =>
                  handleInputChange(e, "busStation", "hotelName")
                }
                className="p-3 border border-solid shadow-xl rounded-xl w-96"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center ml-[10%] gap-2">
          <label>
            <input
              type="text"
              placeholder="Distance"
              value={formDatas.busStation.distance}
              onChange={(e) => handleInputChange(e, "busStation", "distance")}
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Time"
              value={formDatas.busStation.time}
              onChange={(e) => handleInputChange(e, "busStation", "time")}
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
        </div>
      </div>

      {/* Hotel Near TheRailway Section */}

      <div className="flex flex-col justify-center items-center mx-auto m-5">
        <h3 className="text-start w-[15%] m-2 text-green-900 font-semibold">
          Hotel Near The Airport
        </h3>
        <div className="flex">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Hotel Name :</label>
          </div>
          <div className="m-3">
            <label>
              <input
                type="text"
                placeholder="Write the Name"
                value={formDatas.railwayStation.hotelName}
                onChange={(e) =>
                  handleInputChange(e, "railwayStation", "hotelName")
                }
                className="p-3 border border-solid shadow-xl rounded-xl w-96"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center ml-[10%] gap-2">
          <label>
            <input
              type="text"
              placeholder="Distance"
              value={formDatas.railwayStation.distance}
              onChange={(e) =>
                handleInputChange(e, "railwayStation", "distance")
              }
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Time"
              value={formDatas.railwayStation.time}
              onChange={(e) => handleInputChange(e, "railwayStation", "time")}
              className="p-3 border border-solid shadow-xl rounded-xl w-44"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => sendDataToDatabase(formDatas)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <Link href="/EndPage">Save</Link>
        </button>
      </div>
    </>
  );
};

export default Description;
