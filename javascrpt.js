// Muuttujat
const tehtavaLisays = document.querySelector('.uusi-task-input');
const tehtavaNappi = document.querySelector('.uusi-tehtava .lisaa');
const lista = document.querySelector('.tehtavat');
var taskList = [];

// Kuuntelijat
document.addEventListener("DOMContentLoaded", getTodos);
tehtavaNappi.addEventListener('click', lisaaTeht);
lista.addEventListener('click', poistaTeht);

//Funktiot
function lisaaTeht(e) {

    // Estää sivun päivittämisen, kun painaa näppäintä
    e.preventDefault();
    // Katsoo, että on annettu jokin tehtävä, minimipituus 1 merkki
    document.querySelector('.uusi-tehtava .lisaa').onclick = function() {
        if(document.querySelector('.uusi-tehtava input').value.length == 0) {
            alert("Anna tehtävä!");
            document.querySelector('.uusi-task-input').style.borderBlockColor = 'red';
        } else {

    // Uusi Div elementti
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Uusi li elementti
    const newTodo = document.createElement('li');
    newTodo.innerText = tehtavaLisays.value;

    // Lisää tiedot localstorageen
    tallennaLocal(tehtavaLisays.value);

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   
    // Valmis nappi
    const valmisNappi = document.createElement('button');
    valmisNappi.innerText = 'Valmis';
    valmisNappi.classList.add('valmis-nappi');
    todoDiv.appendChild(valmisNappi);

    // Poisto nappi
    const poistaNappi = document.createElement('button');
    poistaNappi.innerText = 'Poista';
    poistaNappi.classList.add('poista-nappi');
    todoDiv.appendChild(poistaNappi);

    // Lisää yllä olevat elementit listaan
    lista.appendChild(todoDiv);

    // Tyhjentää tehtävän lisäyskentän, kun on lisännyt uuden
    tehtavaLisays.value = '';
    
        }
    }
}

// Poisto nappi 
function poistaTeht(e) {
    const poisto = e.target;

    if (poisto.classList[0] === 'poista-nappi') {
        const todo = poisto.parentElement;

        // Poistaa samalla tiedon Localstoragesta
        poistaLocalTodos(todo);
        todo.remove();
    }
    // Yliviivaa tehtävän
    if(poisto.classList[0] === 'valmis-nappi') {
        const todo = poisto.parentElement;
        todo.classList.toggle('valmis');
    }
}

// Tallenna tiedot local storageen
function tallennaLocal(todo) {

    // Katsotaan onko tiedot olemassa
    let todos;
    if (localStorage.getItem('todos') === null){
        // Jos ei, niin tehdään tyhjä lista
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) || [];
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Poistaa tiedot local storagesta, kun klikkaa poistamispainiketta
function poistaLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
// Hakee selaimen LocalStorageen tallennetut tiedot ja tuo ne esille
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      // Uusi Div elementti
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
      // Uusi li elementti
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      tehtavaLisays.value = "";
      // Valmis nappi
    const valmisNappi = document.createElement('button');
    valmisNappi.innerText = 'Valmis';
    valmisNappi.classList.add('valmis-nappi');
    todoDiv.appendChild(valmisNappi);
      // Poisto nappi
    const poistaNappi = document.createElement('button');
    poistaNappi.innerText = 'Poista';
    poistaNappi.classList.add('poista-nappi');
    todoDiv.appendChild(poistaNappi);
   
    // Lisää yllä olevat elementit listaan
    lista.appendChild(todoDiv);
    });
  } 

  /*
function getTodos(todo) {
 let todos = localStorage.getItem('todos');
if (todos) {
    todo = JSON.parse(localStorage.getItem('todos'));
    lisaaTeht(taskList);
} else {
    newTodo.style.display = "none";
    }
}
*/