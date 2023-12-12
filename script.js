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
    visualizza();
    saveCoursesInLocalStorage();
}

// Funzione per modificare un corso esistente
function editCourse(id, {title, description, srcImage, categories }) {
    const index = courses.findIndex(course => course.id === id && course.author === username);
    if (index !== -1) {
        const newCategories = categories.split(',').map(category => category.trim());
        courses[index] = {
            ...courses[index],
            title,
            description,
            srcImage,
            categories: newCategories,
        };
    }
    visualizza();
}

// Funzione per eliminare un corso
function deleteCourse(id) {
    const index = courses.findIndex(course => course.id === id && course.author === username);
    if (index !== -1) {
        courses.splice(index, 1);
    }
    getCategories();
    visualizza();
    closeModal();
    saveCoursesInLocalStorage();
}
//function deleteCourse(id) {
//    courses = courses.filter(course => course.id !== id || course.author !== username);
//}

// Funzione per visualizzare i dettagli di un corso
function detailCourse(id) {
    visualizza();
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

// Funzione per autenticare l'utente
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
getCategories();

// Funzione per visualizzare i corsi nella pagina
function visualizza(){
    const contenitore = document.getElementById("contenitore");
    const categories = [...getCategories()];
    let htmlString = "";

    categories.forEach((category) => {
        htmlString += "<h2><b>"+category+"</b></h2>";
        const coursesForCategory = getCoursesByCategory(category).slice(0, 4);
        htmlString += `<div class="container d-flex flex-wrap justify-content-start mb-5 mt-5">`;
        
        coursesForCategory.forEach((course) => {
            const truncatedDescription = course.description.length > 23 ?
                course.description.substring(0, 23) + '...' :
                course.description;

            htmlString +=
                `<div class="card mx-3" style="width: 18rem;">
                    <img class="card-img-top img-fluid" src="${course.srcImage}" alt="Course Image">
                    <div class="card-body">
                        <h5 class="card-title"><b>${course.title}</b></h5>
                        <p class="card-text">${truncatedDescription}</p>
                        <button class="btn btn-primary" onclick="openModal(${course.id})">Dettagli</button>
                    </div>
                </div>`;
        });
        htmlString += `</div>`;
        console.log(category);
    });
    console.log(htmlString);

    contenitore.innerHTML = htmlString;
}

// Funzione per aprire la finestra modale con i dettagli di un corso
function openModal(courseId) {
    const course = courses.find(course => course.id === courseId);
    document.getElementById("courseModalLabel").innerText = course.title;
    document.getElementById("courseDetails").innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${course.srcImage}" class="card-img" alt="Course Image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text"><small class="text-muted">Description: ${course.description}</small></p>
                    <p class="card-text"><small class="text-muted">Author: ${course.author}</small></p>
                    <p class="card-text"><small class="text-muted">Categories: ${course.categories.join(', ')}</small></p>
                    ${course.author === username ? `<button class="btn btn-outline-secondary" onclick="editCourseModal(${course.id})">Edit</button>` : ''}
                    <button class="btn btn-outline-dark" onclick="closeModal()">Chiudi</button>
                </div>
            </div>
        </div>
    </div>`;
    document.getElementById('id02').style.display = 'block';

    // Aggiungi un gestore di eventi per chiudere il modale
    const closeModalButton = document.querySelector('#id02 .w3-button');
    closeModalButton.addEventListener('click', closeModal);
    const modalOverlay = document.querySelector('#id02');
    modalOverlay.addEventListener('click', closeModalOverlay);
}

// Funzione per chiudere la finestra modale
function closeModal() {
    document.getElementById('id02').style.display = 'none';
}

// Funzione per chiudere la finestra modale cliccando sull'overlay
function closeModalOverlay(event) {
    if (event.target === document.getElementById('id02')) {
        closeModal();
    }
}

// Funzione per aprire la finestra modale di modifica di un corso
function editCourseModal(courseId) {
    const course = courses.find(course => course.id === courseId);

    document.getElementById("courseDetails").innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${course.srcImage}" class="card-img" alt="Course Image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">
                        <input type="text" id="editTitle" value="${course.title}">
                    </h5>
                    <p class="card-text">
                        <textarea id="editDescription">${course.description}</textarea>
                    </p>
                    <p class="card-text">
                        <input type="text" id="editCategories" value="${course.categories.join(', ')}">
                    </p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 h-100 d-flex justify-content-center align-items-center mb-4">
                <label for="editImage">Img URL:</label>
                <input type="text" id="editImage" value="${course.srcImage}">
            </div>
        </div>
        <div class="row">
            <div class="h-100 d-flex justify-content-center align-items-center mb-4">
                <button class="btn btn-outline-secondary" onclick="updateCourse(${course.id})">Modifica</button>
                <button class="btn btn-outline-danger" onclick="deleteCourse(${course.id})">Cancella</button>
            </div>
        </div>
    </div>`;
}

// Funzione per aggiornare un corso dopo la modifica
function updateCourse(courseId) {
    const course = courses.find(course => course.id === courseId);

    const updatedTitle = document.getElementById("editTitle").value;
    const updatedDescription = document.getElementById("editDescription").value;
    const updatedCategories = document.getElementById("editCategories").value.split(',').map(category => category.trim());
    const updatedImage = document.getElementById("editImage").value;

    // Applica le modifiche al corso
    editCourse(courseId, {
        title: updatedTitle,
        description: updatedDescription,
        categories: updatedCategories.join(', '),
        srcImage: updatedImage,
    });

    // Aggiorna la visualizzazione e chiudi il modale
    visualizza();
    closeModal();
    saveCoursesInLocalStorage();
}

// Funzione per caricare i corsi dal localStorage
function loadCoursesFromLocalStorage() {
    const coursesLocalStorage = localStorage.getItem("courses");

    if (coursesLocalStorage === null) {
        courses = [];
    } else {
        courses = JSON.parse(coursesLocalStorage);
    }
}

// Funzione per salvare i corsi nel localStorage
function saveCoursesInLocalStorage() {
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Carica la funzione di visualizzazione al caricamento della pagina
window.onload = () => {
    loadCoursesFromLocalStorage();
    visualizza();
}