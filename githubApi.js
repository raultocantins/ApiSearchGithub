const { Octokit } = require("@octokit/core");
const octokit = new Octokit();

//buscar repositorios
 async function repositories(username) {
  var result = await octokit
    .request("GET /users/{username}/repos", {
      username: username,
    })
    .then((res) =>
      res.data.map((e) => {
        return {
          name: e.name,
          full_name: e.full_name,
          description: e.description,
        };
      })
    ).catch(err=>console.log(err))
  return result
}

 async function issues() {
  var issues = await octokit
    .request("GET /issues")
    .then((res) => res.data)
    .catch((err) => err);
  return issues
}

 async function pulls() {
  var pulls = await octokit
    .request("GET /repos/{owner}/{repo}/pulls/comments", {
      owner: "raultocantins",
      repo: "toDoList",
    })
    .then((res) => res)
    .catch((err) => err);
  return pulls
}


 async function search(value) {
  var result = await octokit.request("GET /search/repositories", {
    q: `${value}`
    
  });
  var data={
    total_count:result.data.total_count,
    items:result.data.items
  }

  return data;
}

async function searchRepoData(owner,repo) {
  var result = await octokit.request("GET /repos/{owner}/{repo}", {
    owner:owner,
    repo: repo    
  });
  

  return result.data;
}


module.exports={
  repositories,issues,search,pulls,searchRepoData
}

