/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridFilterModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { Box, ButtonGroup, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setRepos } from '../slices/reposSlice';
import { IRepo } from '../types';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const dispatch = useAppDispatch();
  const repos: IRepo[] = useAppSelector((state) => state.repos.repos);
  const rows: GridRowsProp = repos;
  const languages: string[] = [];
  const addButtons = () => {
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
  };
  addButtons();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/repos');
      // eslint-disable-next-line no-shadow
      const { repos } = response.data;
      dispatch(setRepos(repos));
      // setRows(repos);
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!repos.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/repo/${params.row.id}`);
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
        onRowClick={handleRowClick}
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
