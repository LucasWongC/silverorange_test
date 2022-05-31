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
  const [languages, setLanguages] = useState<string[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/repos');
      // eslint-disable-next-line no-shadow
      const { repos } = response.data;
      setRows(repos);
      const langs: string [] = [];
      const obj: { [key: string]: boolean } = {};
      const arr = repos.map((repo: IRepo) => {
        return repo.language;
      });
      arr.forEach((lang: string) => (obj[lang] = true));
      for (const lang in obj) {
        if (lang) {
          languages.push(lang);
        }
      }
      setLanguages(langs);
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterByLang = (lang: string) => {
    setFilterModel({
      items: [
        {
          columnField: 'language',
          operatorValue: 'is',
          value: lang,
        },
      ],
    });
  };

  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {languages.map((lang) => (
            <Button
              key={lang}
              onClick={() => {
                filterByLang(lang);
              }}
            >
              {lang}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        loading={loading}
        filterModel={filterModel}        
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
