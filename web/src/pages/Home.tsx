/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridFilterModel,
  GridRowParams,
} from '@mui/x-data-grid';

import { IRepo } from '../types';

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<IRepo[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/repos');
      // eslint-disable-next-line no-shadow
      const { repos } = response.data;
      setRows(repos);
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>      
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        loading={loading}        
      />
    </Box>
  );
}
const columns: GridColumns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 3 },
  { field: 'language', headerName: 'Language', flex: 1, type: 'singleSelect' },
  { field: 'forks_count', headerName: 'Forks Count', flex: 1 },
];

export default Home;
