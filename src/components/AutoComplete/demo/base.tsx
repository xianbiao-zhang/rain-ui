import type { FC } from 'react';
import React from 'react';
import { AutoComplete } from 'raind';
import type { DataSourceType } from '../interface';

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const App: FC = () => {
  // const lakers = ['bardley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'greeen', 'howard',
  // 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const handleFetch = (query:string) => {
  //     return lakers.filter(name => name.includes(query))
  // }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };
  // const testArray = [
  //     {value: 'ab', number: 11},
  //     {value: 'abc', number: 1},
  //     {value: 'b', number: 4},
  //     {value: 'c', number: 15},
  // ]
  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    return (
      <>
        <h2>name: {item.login}</h2>
        <p>url: {item.url}</p>
      </>
    );
  };
  return <AutoComplete fetchSuggestions={handleFetch} renderOption={renderOption} />;
};

export default App;
