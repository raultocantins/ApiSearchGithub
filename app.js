const githubApi = require("./githubApi");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded());
app.use(express.json());

//buscar todos os repositorios do usuario
app.get("/repositories/:user", async (req, res) => {
  const user = req.params.user;
  const repos = await githubApi.repositories(`${user}`);
  if (repos) {
    res.json(repos);
  } else {
    res.send("Nenhum Repositorio !!!");
  }
});
//Procurar algum repositorio no github.
app.get("/search/:textsearch", async (req, res) => {
  const search = req.params.textsearch;
  const result = await githubApi.search(`${search}`);
res.json(result)
});

app.get("/repo/:name/:repo", async (req, res) => {
  const name = req.params.name;
  const repo=req.params.repo
  const result = await githubApi.searchRepoData(name,repo);
res.json(result)
});


app.listen(process.env.PORT, () => {
  console.log("Server in Progress...");
});
