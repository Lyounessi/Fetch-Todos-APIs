const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
    fetch(apiUrl + "?_limit=15")
    .then(response => response.json())
    .then(data => {
        data.forEach((todo) => addTodo(todo));
    });
}

const addTodo = (todo) => {
    const div = document.createElement('div');
            div.appendChild(document.createTextNode(`${todo.title}`));
            div.classList.add("todo");
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

const toggleCompleted = (e) => {

    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}

const updateTodo = (id, completed) => {
fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
})
.then(response => response.json())
.then(data => console.log(data));    
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
}


init();