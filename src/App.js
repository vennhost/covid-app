import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "react-data-table-component";
import DataCard from "./components/StateCard";

function App() {
  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("https://covidnigeria.herokuapp.com/api", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = await response.json();
      setData(result.data);

      setStates(result.data.states);
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const newStates = [].concat(states);
  const sortStates = newStates.sort((a, b) => (a.state > b.state ? 1 : -1));

  const info = [
    {
      title: "Sample Tested",
      number: data.totalSamplesTested,
      color: "green",
    },
    {
      title: "Confirmed Cases",
      number: data.totalConfirmedCases,
      color: "blue",
    },
    {
      title: "Active Cases",
      number: data.totalActiveCases,
      color: "brown",
    },
    {
      title: "Discharged",
      number: data.discharged,
      color: "black",
    },
    {
      title: "Death",
      number: data.death,
      color: "red",
    },
  ];

  const columns = [
    { selector: "state", name: "State", width: 70 },
    { selector: "confirmedCases", name: "Confirmed Cases", width: 130 },
    { selector: "casesOnAdmission", name: "Admission", width: 130 },
    { selector: "discharged", name: "Discharged", width: 130 },
    { selector: "death", name: "Death", width: 130 },
  ];

  return (
    <>
      <div>
        <header>
          <h2 style={{ color: "green" }}>COVID DATA IN NIGERIA</h2>
        </header>
        <main>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {info.map((item) => (
              <DataCard
                title={item.title}
                color={item.color}
                number={item.number}
              />
            ))}
          </div>
          <hr />
          <div style={{ height: "100%", width: "100%" }}>
          <h3>Data by States</h3>
            <DataTable columns={columns} data={sortStates} striped />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
