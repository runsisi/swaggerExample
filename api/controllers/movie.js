// movies
// runsisi AT hust.edu.cn

// [
//   {'id': '1', 'title': 'fake_mov1', 'year': 1999},
//   {'id': '2', 'title': 'fake_mov2', 'year': 2000},
//   {'id': '3', 'title': 'fake_mov3', 'year': 2001},
// ]
let movies = [];
let id = 0;

export let get_movies = (req, res) => {
  // fetch from db
  res.json(movies);
};

export let post = (req, res) => {
  let params = req.swagger.params;
  let {title, year} = params.details.value;

  // store to db
  movies.push({"id": id.toString(), "title": title, "year": year});
  id++;

  res.json({"success": 1, "description": "created ok"});
};

export let get = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;

  let m = undefined;
  for (const i of movies) {
    let {id: id_} = i;
    if (id_ === id.toString()) {
      m = {...i, "id": id.toString()};
      break;
    }
  }

  if (m !== undefined) {
    res.json(m);
  } else {
    res.sendStatus(404);
  }
};

export let put = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;

  // could be extracted from req.swagger.params.details.value too
  let {title, year} = req.body;

  // update db
  for (const [idx, m] of movies.entries()) {
    let {id: id_} = m;
    if (id_ === id.toString()) {
      movies[idx] = {...m, "title": title, "year": year};
      break;
    }
  }

  res.json({"success": 1, "description": "updated ok"});
};

export let delete_ = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;

  let eq = (e) => {
    return id === e.id.toString();
  };

  // update db
  let r = movies.splice(movies.findIndex(eq), 1);

  if (r.length === 0) {
    res.sendStatus(404);
  } else {
    res.json({"success": 1, "description": "deleted ok"});
  }
};