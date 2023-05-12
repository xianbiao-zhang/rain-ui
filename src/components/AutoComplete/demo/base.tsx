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
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };
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
