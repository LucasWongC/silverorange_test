/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, CircularProgress } from '@mui/material';

import { useAppSelector } from '../app/hooks';
import { ICommit, IRepo } from '../types';

function Repositry() {
  const navigate = useNavigate();
  const { repoId } = useParams();
  const repos: IRepo[] = useAppSelector((state) => state.repos.repos);
  // const [repo, setRepo] = useState<IRepo>();
  const [commit, setCommit] = useState<ICommit>();
  const [readme, setReadme] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchCommits = async (repo: IRepo) => {
    setLoading(true);
    try {
      if (!repo) {
        return;
      }
      const response = await axios.get(repo.commits_url.slice(0, -6));
      const commits = response.data;
      // commits.sort((a: ICommit, b: ICommit) => (a.commit.author.date > b.commit.author.date ? -1 : a.commit.author.date < b.commit.author.date ? 1 : 0));
      setCommit(commits[0]);

      const res = await axios.get(
        `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
      );
      setReadme(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const id: number = parseInt(repoId || '0', 10);
    const repo = repos.filter((repo: IRepo) => {
      return repo.id === id;
    })[0];
    // setRepo(repo);
    fetchCommits(repo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoId, repos]);

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/');
          }}
        >
          Back
        </Button>
      </Box>
      {!loading ? (
        <Box sx={{ textAlign: 'left' }}>
          {commit && (
            <>
              <h1>Last Commit</h1>
              <h2>Date: {commit.commit.author.date}</h2>
              <h2>Author: {commit.commit.author.name}</h2>
              <h2>Message: {commit.commit.message}</h2>
            </>
          )}
          <pre style={{ fontSize: '1.4rem' }}>{readme}</pre>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Repositry;
