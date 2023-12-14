"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onValue, off } from "firebase/database";
import { addressRef } from "../FirebaseConfig/FireBaseCong";

// Custom input component
const EditableInput = ({ value, onChange, onToggleEdit, isEditing }) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 border border-solid shadow-xl rounded-xl w-full"
        disabled={!isEditing}
      />
      <button
        onClick={onToggleEdit}
        className="p-3 border border-solid shadow-xl rounded-xl m-2"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </>
  );
};

const Address = () => {
  const initialFields = {
    Address: "",
    LandMark: "",
    City: "",
    State: "",
    Pincode: "",
    "Star rating": "",
    Country: "",
    "Country Code": "",
    Latitude: "",
    Longitude: "",
    Email: "",
    "Contact Number": "",
    "Map Url": "",
    "Hotel Authorization": "",
  };
  const [fields, setFields] = useState(initialFields);

  const [editingFields, setEditingFields] = useState({
    Address: false,
    LandMark: false,
    City: false,
    State: false,
    Pincode: false,
    "Star rating": false,
    Country: false,
    "Country Code": false,
    Latitude: false,
    Longitude: false,
    Email: false,
    "Contact Number": false,
    "Map Url": false,
    "Hotel Authorization": false,
  });

  const handleInputChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleToggleEdit = async (field) => {
    if (editingFields[field]) {
      // If isEditing is true (Save button clicked), save the data to the database
      await sendDataToDatabase(fields);
    }

    setEditingFields((prevEditingFields) => ({
      ...prevEditingFields,
      [field]: !prevEditingFields[field],
    }));
  };

  const sendDataToDatabase = async (data) => {
    try {
      const res = await fetch(
        "https://akashpedia-ebaf8-default-rtdb.firebaseio.com/address.json",
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
        console.log("Data saved successfully:", Data);
      }
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const fetchDataFromDatabase = () => {
    try {
      const handleData = (snapshot) => {
        const data = snapshot.val();

        if (data) {
          // Iterate through all keys in data
          Object.keys(data).forEach((AddresId) => {
            const AdressData = data[AddresId];
            
            setFields(AdressData);
          });
        }
      };

      onValue(addressRef, handleData);

      return () => off(addressRef, "value", handleData);
    } catch (error) {
      console.error("Error setting up real-time listener: ", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center ml-[11%]">
        {Object.keys(initialFields).map((field) => (
          <div key={field} className="flex items-center">
            <div className="w-44 m-2 text-green-900 font-semibold">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            </div>
            <div className="flex justify-center items-center m-3">
              <EditableInput
                value={fields[field]}
                onChange={(value) => handleInputChange(field, value)}
                onToggleEdit={() => handleToggleEdit(field)}
                isEditing={editingFields[field]}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center m-11">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => sendDataToDatabase(fields)}
          >
            <Link href="/Description">Save & Next</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;
