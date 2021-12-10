import { useEffect, useState } from 'react';

import { GenreResponseProps } from '../interfaces/Genre';
import { api } from '../services/api';

import { Button } from './Button';

interface IProps {
  selectedGenreId: number;
  setSelectedGenreId(id: number): void;
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: IProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}