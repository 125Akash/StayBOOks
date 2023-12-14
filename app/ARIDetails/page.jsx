"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onValue, off } from "firebase/database";
import { AriDetailsRef } from "../FirebaseConfig/FireBaseCong";

// Custom input component
const EditableInput = ({
  value,
  onChange,
  onToggleEdit,
  isEditing,
  isMultiple,
  sendDataToDatabase,
}) => {
  const handleAddItem = () => {
    onChange([...value, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedValue = [...value];
    updatedValue.splice(index, 1);
    onChange(updatedValue);
  };

  const handleSave = () => {
    onToggleEdit();
    sendDataToDatabase();
  };

  return (
    <>
      {isMultiple ? (
        <div>
          <ul>
            {value.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedValue = [...value];
                    updatedValue[index] = e.target.value;
                    onChange(updatedValue);
                  }}
                  className="p-3 border border-solid shadow-xl rounded-xl w-full"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-3 border border-solid shadow-xl rounded-xl m-2"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={handleAddItem}
              className="p-3 border border-solid shadow-xl rounded-xl text-center"
            >
              Add Item
            </button>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-3 border border-solid shadow-xl rounded-xl w-full"
          disabled={!isEditing}
        />
      )}
      <button
        onClick={handleSave}
        className="p-3 border border-solid shadow-xl rounded-xl m-2"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </>
  );
};

const ARIDetails = () => {
  const initialFields = {
    "Hotel Start Rating": "",
    "Hotel Starting Price": "",
    "Hotel Stories": "",
    "Property Type": "",
    "Hotel Brand": "",
    "Star rating": "",
    "Hotel Description": "",
    "Metro Description": "",
    "Metro Description List": [],
    "Hotel Address": "",
    "Hotel Location": "",
    "Hotel web Url": "",
  };

  const [fields, setFields] = useState(initialFields);
  const [editingFields, setEditingFields] = useState(
    Object.fromEntries(
      Object.keys(initialFields).map((field) => [field, false])
    )
  );

  const handleInputChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleToggleEdit = (field) => {
    setEditingFields((prevEditingFields) => ({
      ...prevEditingFields,
      [field]: !prevEditingFields[field],
    }));
  };

  const fetchDataFromDatabase = () => {
    try {
      const handleData = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((AriDetailsId) => {
            const AriDetailsdata = data[AriDetailsId];
            setFields(AriDetailsdata);
          });
        }
      };

      onValue(AriDetailsRef, handleData);

      return () => off(AriDetailsRef, "value", handleData);
    } catch (error) {
      console.error("Error setting up real-time listener: ", error);
    }
  };

  const sendDataToDatabase = async () => {
    try {
      const res = await fetch(
        "https://akashpedia-ebaf8-default-rtdb.firebaseio.com/aridetails.json",
        {
          method: "POST",
          body: JSON.stringify(fields),
          headers: {
            "Content-Type": "application/json",
          },
          timestamp: new Date().toISOString(),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to save document");
      }
      const data = await res.json();
     
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleSave = () => {
    // Determine if any field is in editing mode
    const isEditing = Object.values(editingFields).some((value) => value);

    if (isEditing) {
      // If any field is in editing mode, save the data to the database
      Object.keys(editingFields).forEach((field) => {
        if (editingFields[field]) {
          setEditingFields((prevEditingFields) => ({
            ...prevEditingFields,
            [field]: false,
          }));
        }
      });
      sendDataToDatabase();
    } else {
      // If not in editing mode, toggle the editing state
      Object.keys(editingFields).forEach((field) => {
        setEditingFields((prevEditingFields) => ({
          ...prevEditingFields,
          [field]: !prevEditingFields[field],
        }));
      });
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {Object.keys(initialFields).map((field) => (
          <div key={field} className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="w-56 m-2 text-green-900 font-semibold">
                <label>{`${
                  field.charAt(0).toUpperCase() + field.slice(1)
                } :`}</label>
              </div>
              <div className="w-40 border border-solid p-3 rounded-xl flex justify-around items-center m-3 shadow-xl">
                <label>
                  <input
                    type="checkbox"
                    checked={fields[field]}
                    onChange={() => handleInputChange(field, !fields[field])}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={!fields[field]}
                    onChange={() => handleInputChange(field, !fields[field])}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center ml-[11%]">
        {Object.keys(initialFields).map((field) => (
          <div key={field} className="flex items-center">
            <div className="w-44 m-2 text-green-900 font-semibold">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            </div>
            <div className="flex justify-center items-center m-3 border border-solid p-3 rounded-xl">
              <EditableInput
                value={fields[field]}
                onChange={(value) => handleInputChange(field, value)}
                onToggleEdit={() => handleToggleEdit(field)}
                isEditing={editingFields[field]}
                isMultiple={field === "Metro Description List"}
                sendDataToDatabase={sendDataToDatabase}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center m-11">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleSave}
        >
          <Link href="/AddressDetails"> Save & Next</Link>
        </button>
      </div>
    </div>
  );
};

export default ARIDetails;
