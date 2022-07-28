import React, {useEffect, useState} from 'react'
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api';
import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../components/RepoCard";

export function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length <= 1,
    refetchOnFocus: true
  });

  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 1 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  }

  return (
    <div className="flex items-center flex-wrap flex-col pt-10 pb-10 mx-auto">
      {isError && <p className="text-center text-red-600 pb-2">Something went wrong...</p>}

      <div className="relative w-[560px]">
        <input type="text" className="border mb-2 py-2 px-4 w-full h-[42px]"
               placeholder="Search for GitHub username..." value={search} onChange={e => setSearch(e.target.value)}/>

        {dropdown && <ul
          className="list-none absolute top-[42px] left-0 right-0 max-h-[300px] shadow-md bg-white overflow-y-scroll">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map(user => (
            <li key={user.id}
                onClick={() => clickHandler(user.login)}
                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
              {user.login}
            </li>
          ))}
        </ul>}

        <div className="container">
          {areReposLoading && <p className="text-center">Repos are loading...</p>}
          {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
        </div>
      </div>
    </div>
  )
}

export default HomePage;
