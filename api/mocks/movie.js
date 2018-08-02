// movies
// runsisi AT hust.edu.cn

export let get_movies = (req, res) => {
  let movies = [
    {'id': '1', 'title': 'fake_mov1', 'year': 1999},
    {'id': '2', 'title': 'fake_mov2', 'year': 2000},
    {'id': '3', 'title': 'fake_mov3', 'year': 2001},
  ];

  res.json(movies);
};

export let post = (req, res) => {
  let params = req.swagger.params;
  let {title, year} = params.details.value;

  res.json({"success": 1, "description": `movie: ${title}@${year} created ok`});
};
