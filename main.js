//AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] = "some-token";

// GET REQUEST
function getTodos() {
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.log(err));
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      params: { _limit: 5 },
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method: "post",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //     title: "New TODO",
  //     completed: false,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.log(err));
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New TODO",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodoPut() {
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "New TODO",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

function updateTodoPatch() {
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "New TODO",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// MULTIPLE DATA
function getData() {
  // axios
  //   .all([
  //     axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  //     axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
  //   ])
  //   .then((res) => {
  //     console.log(res[0]);
  //     console.log(res[1]);
  //     showOutput(res[1]);
  //   })
  //   .catch((err) => console.log(err));

  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(
      axios.spread((todos, posts) => {
        console.log(todos);
        console.log(posts);
        showOutput(posts);
      })
    )
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // axios({
  //   method: "post",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //         title: "New TODO",
  //         completed: false,
  //       },
  //   headers:{
  //     'Content-Type': 'application/json',
  //     Authorization: 'some-token'
  //   }
  // })
  //   .then((res) => {
  //     showOutput(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some-token",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New TODO",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => {
      console.log(err);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: false,
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response);
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request cancelled:", thrown.message);
      }
    });

    if(true) { // some condition where the request must be cancelled
      source.cancel('Cancel message')
    } 
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("put").addEventListener("click", updateTodoPut);
document.getElementById("patch").addEventListener("click", updateTodoPatch);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("mul").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
