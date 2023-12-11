// Struttura dati
let username = "";
let courses = [];
var id = 1;

// Funzione per aggiungere un nuovo corso
function createCourse({ title, description, srcImage, categories }) {
    const newCourse = {
        id: id++,
        title,
        description,
        srcImage,
        categories,
        author: username,
    };
    courses.push(newCourse);
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