import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';


const DeveloperList = () => {
  const [developers, setDevelopers] = useState({});

  const fetchDevelopers = async () => {
    const res = await axios.get("http://localhost:3000/developers/fetchAllDevelopers", {
      headers: {
        sessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE'
      }
    });

    setDevelopers(res.data.fetchedDevelopers);
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const renderedDevelopers = Object.values(developers).map(developer => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={developer.id}
      >
        <div className="card-body">
          <h3>{developer.fullname}</h3>

          {/* lista de assets */}
          {/* lista de licenses */}
          <Button variant="primary" className="mr-5">Add asset</Button >
          <Button variant="success">Add license</Button >
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedDevelopers}
    </div>
  );
};

export default DeveloperList;
