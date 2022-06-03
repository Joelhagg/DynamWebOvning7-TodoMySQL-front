let btn = document.getElementById("btn");
let todoList = [];
let todoContainer = document.getElementById("todoContainer");

window.onload = async () => {
  await fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => (todoList = data))
    .catch((error) => console.error(error));

  todoList.forEach((todos) => {
    let todo = document.createElement("div");
    let deleteBtn = document.createElement("button");
    todo.innerHTML += `<br><h2>${todos.todo}</h2><br />Tillagd: <br />${todos.created} `;
    deleteBtn.innerText = "Klar!";
    deleteBtn.addEventListener("click", () => {
      console.log(todos.id);
      deleteTodo(todos.id);
    });
    todo.appendChild(deleteBtn);
    todoContainer.append(todo);
  });
};

btn.addEventListener("click", async () => {
  console.log("click");
  let input = document.getElementById("input").value;
  if (!input == "") {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  }
  location.reload();
});

const deleteTodo = async (id) => {
  console.log(typeof id);
  await fetch("http://localhost:3000/todos/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  location.reload();
};
