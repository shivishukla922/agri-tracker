import "./App.css";
import { MantineProvider } from "@mantine/core";
import data from "./data/manufacIndiaAgroDataset.json";
import { processData } from "./utils/dataProcessing";
import YearlyTable from "./Table/YearlyTable";
import CropAverageTable from "./Table/DataTable";

function App() {
  const { yearlyData, cropAverages } = processData(data);
  return (
    <MantineProvider >
      <div>
        <h1  className="center-heading">Indian Agriculture Data Analysis</h1>
        <div >

        <h2  className="center-heading" >Yearly Data</h2>
        <YearlyTable data={yearlyData} />
        </div>
        <div>
        <h2  className="center-heading">Crop Averages (1950-2020)</h2>
        <CropAverageTable data={cropAverages} />
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
