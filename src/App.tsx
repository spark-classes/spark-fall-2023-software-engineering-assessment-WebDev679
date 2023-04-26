import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography, MenuItem } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID } from "./globals";
import { IFinalGrades, IUniversityClass } from "./types/api_types";
import {calcAllFinalGrade} from "./utils/calculate_grade";
import {GradeTable} from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [finalGrades, setFinalGrades] = useState<IFinalGrades[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */

  // function to fetch data by inputting the prompt after the BASE_API_URL (excluding the parameters)
  const fetchSomeData = async (prompt: string) => {
    const url = BASE_API_URL + prompt + "?buid=" + MY_BU_ID;
    const res = await fetch(url, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS(),
    });
    const json = await res.json();
    console.log(json);
    return json;
  };

  // this function is run whenever the dropdown is changed and a new value is selected
  const handleChange = (e: any) => {
    setIsLoading(true); // loading until the grades are calculated
    setCurrClassId(e.target.value);
    //call to the the fuction to calculate the grades for the newly selected class
    calcAllFinalGrade(e.target.value).then((model) => {
      setFinalGrades(model);
      setIsLoading(false); //loading shoudl stop as grades have been calculated
    }); 
  }


  // this runs at the first render, gets the list of classes for the dropdown and calculates the grades for the class
  useEffect(() => {
    fetchSomeData("/class/listBySemester/fall2022").then((listOfClasses: IUniversityClass[]) => {
      setIsLoading(true);
      calcAllFinalGrade(listOfClasses[0].classId).then((model) => {
        setFinalGrades(model);
        setIsLoading(false)
      }); 
      setClassList(listOfClasses);
      setCurrClassId(listOfClasses[0].classId); //taken as the default value for the currently selected class on the dropdown
    }
    );
  }, [])


  // props for the GradeTable component
  const props = {
    isLoading: isLoading, 
    finalGrades: finalGrades,
  }
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select fullWidth={true} label="Class" value={currClassId} onChange={handleChange}>
              {classList.map((item: IUniversityClass) => (
               <MenuItem key={item.classId} value={item.classId}>{item.title}</MenuItem>
              ))}
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
         <GradeTable {...props}></GradeTable>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
