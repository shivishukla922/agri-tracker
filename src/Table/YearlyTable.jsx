import { Table } from "@mantine/core";
import './YearlyTable.css';
const YearlyTable = ({ data }) => {
  console.log(data, "data is ");

  return (
    <Table className="yaerly-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production</th>
          <th>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(data.entries()).map(([year, { max, min }]) => (
          <tr key={year}>
            <td>{year}</td>
            <td>{max}</td>
            <td>{min}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default YearlyTable;
