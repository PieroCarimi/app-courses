// Struttura dati
let username = "";
let courses = [];
var id = 1;

// Funzione per aggiungere un nuovo corso
function createCourse(/*{ title, description, srcImage, categories }*/) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const srcImage = document.getElementById('image').value;
    const categoriesInput = document.getElementById('categories').value;
    const categoriesArray = categoriesInput.split(',').map(category => category.trim());
    const newCourse = {
        id: id++,
        title,
        description,
        srcImage,
        categories: categoriesArray,
        author: username,
    };
    courses.push(newCourse);
    document.getElementById('id01').style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';
    document.getElementById('categories').value = '';
}

// Funzione per modificare un corso esistente
function editCourse({ id, title, description, srcImage, categories }) {
    const index = courses.findIndex(course => course.id === id && course.author === username);
    if (index !== -1) {
        courses[index] = {
            ...courses[index],
            title,
            description,
            srcImage,
            categories,
        };
    }
}

// Funzione per eliminare un corso
function deleteCourse(id) {
    const index = courses.findIndex(course => course.id === id && course.author === username);
    if (index !== -1) {
        courses.splice(index, 1);
    }
}
//function deleteCourse(id) {
//    courses = courses.filter(course => course.id !== id || course.author !== username);
//}

// Funzione per visualizzare i dettagli di un corso
function detailCourse(id) {
    return courses.find(course => course.id === id);
}

// Funzione per ottenere l'elenco dei corsi per categoria
function getCoursesByCategory(category) {
    return courses.filter(course => course.categories.includes(category));
}

// Funzione per ottenere l'elenco delle categorie disponibili
function getCategories() {
    let categories = [];
    courses.forEach(course => {
        categories = [...new Set([...categories, ...course.categories])];
    });
    return categories;
}

function authenticateUser() {
    const enteredUsername = document.getElementById("username").value;

    // Esempio: Verifica se l'username è non vuoto
    if (enteredUsername.trim() !== '') {
        // Autenticazione riuscita
        username = enteredUsername;
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("aggiungi").style.display = "block"; // Mostra il pulsante "Aggiungi" dopo l'accesso
    } else {
        // Autenticazione fallita
        alert("Inserisci un nome utente valido.");
    }
}

// Funzione per eseguire il logout
function logoutUser() {
    // Esempio: Resetta l'username e nasconde i pulsanti di logout e aggiungi
    username = "";
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("aggiungi").style.display = "none";
    document.getElementById("username").value = '';
}