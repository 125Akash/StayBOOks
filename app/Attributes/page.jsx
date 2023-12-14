"use client";
import React, { useState ,useEffect} from "react";
import ImageComponent from "../Component/ImageComponent";
import Link from "next/link";
import { onValue , off } from "firebase/database";
import { attributesRef } from "../FirebaseConfig/FireBaseCong";


const Attributes = () => {

  const options = {
    AirConditined: "Air Conditined",
    AllInclusionAvailable: "All Inclusion Available",
    ChildFriendly: "Child Friendly",
    BeachAcces: "Beach Access",
    AffilatedGolfCourse: "Affilated Golf Course",
    BussinessCentre: "Business Center",
    AirportShuffle: "Airport Shuffle",
    fitnessCenter: "Fitness Center",
    BarLounge: "Bar & Lounge",
    FreeBreakfast: "Free Breakfast",
    HotTub: "Hot Tub",
    swimmingPool: "Swimming Pool",
    Laundary: "Laundary Service",
    PetAllowed: "Pet-Allowed",
    Restaurant: "Restaurant",
    SmokeFreeproperty: "Smoke-free property",
    RoomService: "Room Service",
    WheelChairAccess: "Wheelchair Access",
    Spa: "Spa",
    KitchenAvailable: "Kitchen Available",
  };

  const [state, setState] = useState({
    ...options,
    hotelBrand: "",
    starRating: "",
    parkingType: "",
    wifiType: "",
    brandId: "",
  });

  const handleCheckboxChange = (option) => {
    setState((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const handleInputChange = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

 const sendDataToDatabase = async(data) => {
  try {
   const res = await fetch("https://akashpedia-ebaf8-default-rtdb.firebaseio.com/attributes.json",{
    method: "POST",
    body: JSON.stringify(data),
    headers: {
     "Content-Type": "application/json"
    },
    timestamp: new Date().toISOString(),
   });
   if(!res.ok){
    throw new Error("Failed to save document");
   }
   if(res.ok){
    const Data = await res.json();
    
 
   }
  
  } catch (error) {
    console.error('Error saving document: ', error);
  }
 }



 const fetchDataFromDatabase = () => {
  try {
    const handleData = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Iterate through all keys in data
        Object.keys(data).forEach((attributesId) => {
          const attributesData = data[attributesId];
          setState(attributesData);
        });
      }
    };

    onValue(attributesRef, handleData);
    return () => off(attributesRef, "value", handleData);
  } catch (error) {
    console.error("Error setting up real-time listener: ", error);
  }
};

useEffect(() => {
  fetchDataFromDatabase();
}, []);



  return (
    <>
      <ImageComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {Object.entries(options).map(([stateKey, label]) => (
          <div key={stateKey} className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="w-56 m-2 text-green-900 font-semibold">
                <label>{`${label} :`}</label>
              </div>
              <div className="w-40 border border-solid p-3 rounded-xl flex justify-around items-center m-3 shadow-xl">
                <label>
                  <input
                    type="checkbox"
                    checked={state[stateKey]}
                    onChange={() => handleCheckboxChange(stateKey)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={!state[stateKey]}
                    onChange={() => handleCheckboxChange(stateKey)}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex sm:flex-row justify-around items-center flex-col">
        <div className="flex justify-center items-center ">
          <div className="w-28 m-2 text-green-900 font-semibold ">
            <label>Hotel Brand :</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <input
                type="text"
                value={state.hotelBrand}
                onChange={(e) =>
                  handleInputChange("hotelBrand", e.target.value)
                }
                className="p-3 border boder-solid shadow-xl rounded-xl"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Star rating :</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <input
                type="text"
                value={state.starRating}
                onChange={(e) =>
                  handleInputChange("starRating", e.target.value)
                }
                className="p-3 border boder-solid shadow-xl rounded-xl"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around ml-[11%]">
        <div className="flex items-center">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Parking Type:</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <input
                type="text"
                value={state.parkingType}
                onChange={(e) =>
                  handleInputChange("parkingType", e.target.value)
                }
                className="p-3 border border-solid shadow-xl rounded-xl"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center w-full">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Wifi Type:</label>
          </div>
          <div className="flex justify-center items-center m-3 ">
            <label>
              <input
                type="text"
                value={state.wifiType}
                onChange={(e) => handleInputChange("wifiType", e.target.value)}
                className=" p-3 border border-solid shadow-xl rounded-xl w-full"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-28 m-2 text-green-900 font-semibold">
            <label>Brand id:</label>
          </div>
          <div className="flex justify-center items-center m-3">
            <label>
              <input
                type="text"
                value={state.brandId}
                onChange={(e) => handleInputChange("brandId", e.target.value)}
                className="p-3 border border-solid shadow-xl rounded-xl"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center m-11">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>sendDataToDatabase(state)}>
          <Link href="/ARIDetails"> Save & Next</Link> 
          </button>
        </div>
      </div>
    </>
  );
};

export default Attributes;
