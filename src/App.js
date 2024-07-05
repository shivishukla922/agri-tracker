import "./App.css";
import { MantineProvider } from "@mantine/core";
import data from "./data/manufacIndiaAgroDataset.json";
import { processData } from "./utils/dataProcessing";
import YearlyTable from "./Table/YearlyTable";
import CropAverageTable from "./Table/DataTable";

function App() {
  const { yearlyData, cropAverages } = processData(data);
  return (
    <MantineProvider withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: "light",
      fontFamily: "Poppins , sans-serif",
      components: {
        Input: {
          styles: (theme) => ({
            input: {
              "&:focus-within": {
                borderColor: "#1f7a1f",
              },
            },
          }),
        },
    }}} >
      <div>
        <h1>Indian Agriculture Data Analysis</h1>
        <div>

        <h2>Yearly Data</h2>
        <YearlyTable data={yearlyData} />
        </div>
        <div>
        <h2>Crop Averages (1950-2020)</h2>
        <CropAverageTable data={cropAverages} />
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
