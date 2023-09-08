import React, { useState } from 'react';
import { UpdatePrices } from '../../../services/api/products/productsService';

export interface CsvToJsonConverterProps {
  onConvert: (jsonDataArray: UpdatePrices[]) => void;
}

export const CsvToJsonConverter: React.FC<CsvToJsonConverterProps> = ({onConvert}) => {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Add selectedFile state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const csvContent = e.target.result as string;
          setCsvData(csvContent);
          setSelectedFile(file); // Store the selected file
        }
      };
      reader.readAsText(file);
    }
  };

  const convertCsvToJson = () => {
    if (csvData) {
      const lines = csvData.split('\n');
      const headers = lines[0].replace(/\r/g, '').split(',');

      const jsonDataArray: UpdatePrices[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].replace(/\r/g, '').split(',');

        // Check if the line is not empty before processing
        if (currentLine.length === headers.length) {

          if (currentLine.length === headers.length) {
            const jsonDataObject: UpdatePrices = {
              product_code: Number(currentLine[0]), // Assuming product_code is the first column
              new_price: parseFloat(currentLine[1]) // Assuming new_price is the second column
            };
  
            jsonDataArray.push(jsonDataObject);
          }
        }
      }
      onConvert(jsonDataArray);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
     

      {selectedFile && (
        <div>
          <h2>Selected File</h2>
          <p>{selectedFile.name}</p>
          <button onClick={convertCsvToJson}>Validar</button>
        </div>
      )}
    </div>
  );
};

export default CsvToJsonConverter;
