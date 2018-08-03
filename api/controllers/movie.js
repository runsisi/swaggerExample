// movies
// runsisi AT hust.edu.cn

import * as db from '../../backend/db'

export let get_movies = (req, res) => {
  let movies = db.list_movies();

  res.json(movies);
};

export let post = (req, res) => {
  let params = req.swagger.params;
  let {title, year} = params.details.value;

  let movie = {"title": title, "year": year};
  db.create_movies(movie);

  res.json({"success": 1, "description": "created ok"});
};

export let get = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;

  let m = db.get_movie(id);
  if (m === undefined) {
    res.sendStatus(404);
  } else {
    res.json(m);
  }
};

export let put = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;
  // the body parameters could be extracted from req.swagger.params.details.value too
  let {title, year} = req.body;

  let movie = {"title": title, "year": year};
  let r = db.update_movie(id, movie);
  if (r === undefined) {
    res.sendStatus(404);
  } else {
    res.json({"success": 1, "description": "updated ok"});
  }
};

export let delete_ = (req, res) => {
  let params = req.swagger.params;
  let id = params.id.value;

  let r = db.delete_movie(id);
  if (r === undefined) {
    res.sendStatus(404);
  } else {
    res.json({"success": 1, "description": "deleted ok"});
  }
};