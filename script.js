const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
    fetch(apiUrl + "?_limit=5")
    .then(response => response.json())
    .then(data => {
        data.forEach((todo) => addTodo(todo));
    });
}

const addTodo = (todo) => {
    const div = document.createElement('div');
            div.appendChild(document.createTextNode(`${todo.title}`));
            div.setAttribute('data-id', todo.id);
            if (todo.completed) {
                div.classList.add("done");
            }
            document.getElementById('todo-list').appendChild(div);
};

const createTodo = (e) => {
    e.preventDefault();
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => {
        addTodo(data);
        e.target.reset();
    });
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
}


init();