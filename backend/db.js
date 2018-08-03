// [
//   {'id': '1', 'title': 'fake_mov1', 'year': 1999},
//   {'id': '2', 'title': 'fake_mov2', 'year': 2000},
//   {'id': '3', 'title': 'fake_mov3', 'year': 2001},
// ]
let movies = [];
let id = 0;

export let list_movies = () => {
  return movies;
};

export let create_movies = (movie) => {
  let m = {"id": id.toString(), ...movie};
  movies.push(m);
  id++;
  return m;
};

export let get_movie = (idstr) => {
  for (const m of movies) {
    if (m.id === idstr) {
      return m;
    }
  }
  return undefined;
};

export let update_movie = (idstr, movie) => {
  for (const [idx, m] of movies.entries()) {
    if (m.id === idstr) {
      movies[idx] = {...m, ...movie};
      return movies[idx];
    }
  }
  return undefined;
};

export let delete_movie = (idstr) => {
  let eq = (m) => {
    return m.id === idstr;
  };

  let idx = movies.findIndex(eq);
  if (idx !== -1) {
    let movie = movies[idx];
    movies.splice(idx, 1);
    return movie;
  }
  return undefined;
};
