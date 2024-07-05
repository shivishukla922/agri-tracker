import { Table } from "@mantine/core";
import "./DataTable.css";

const CropAverageTable = ({ data }) => {
  return (
    <Table className="custom-table">
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (1950-2020)</th>
          <th>Average Cultivation Area (1950-2020)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ crop, averageYield, averageArea }) => (
          <tr key={crop}>
            <td>{crop}</td>
            <td>{averageYield}</td>
            <td>{averageArea}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CropAverageTable;
