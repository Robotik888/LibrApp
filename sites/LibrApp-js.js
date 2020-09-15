function newBook() {
    const title = document.getElementById("titleInput").value;
    const publicationYear = Number(document.getElementById("publicationYearInput").value);
    const genre = document.getElementById("genreInput").value;
    if (title === "") {
        document.getElementById("paragraph").innerHTML = "Tuto knihu nelze zaevidovat - nevyplněná pole.";
    } else {
        document.getElementById("paragraph").innerHTML = title + "    " + publicationYear + "    " + genre + " zaevidovano";
        let book = {
            name: title,
            year: publicationYear,
            genre: genre
        }
        pushBook(book);
    }
}

function pushBook(book) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            alert("Kniha přidána");
        }
    }
    xmlHttp.open("POST", "http://localhost:8080/book/add", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(book));
}

function borrow() {
    var title = document.getElementById("titleInput").value;
    var name = document.getElementById("nameInput").value;
    var returnDate = document.getElementById("returnDateInput").value;
    var assumedReturnDate = document.getElementById("assumedReturnDateInput").value;
    if (name == "" || returnDate == "" || assumedReturnDate == "" || title == "") {
        document.getElementById("paragraph").innerHTML = "Výpůjčku nelze provést - nevyplněná pole.";
    } else {
        var todayDate = new Date().toLocaleDateString();
        document.getElementById("paragraph").innerHTML = todayDate + " výpůjčka " + title + " pro " + name + " vypůjčeno do " + returnDate + " předpokládané vrácení " + assumedReturnDate;
        // here will be code for giving information about new borrow to database
    }
}

function dateFce() {
    var todayDate = new Date().toLocaleDateString();
    document.getElementById("todayDate").innerHTML = todayDate;
}

function deleteBook() {
    var title = document.getElementById("titleInput").value;
    //This may be useful in future
    //var publicationYear = Number(document.getElementById("publicationYearInput").value);
    //var genre = document.getElementById("genreInput").value;
    if (title == "") {
        document.getElementById("paragraph").innerHTML = "Tato kniha neexistuje, nelze ji tudíž odstranit";
    } else {
        document.getElementById("paragraph").innerHTML = title + " byla odstraněna z databáze";
        // here will be code for giving information about which book should be deleted from database
    }
}


function fetchBooks() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            fillTable(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", "http://localhost:8080/book/list", true);
    xmlHttp.send(null);
}

function fillTable(books) {
    const table = document.getElementById('book-table');
    for (const book of books) {
        const row = table.insertRow(1);
        const cell1 = row.insertCell();
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = book.name;
        cell2.innerHTML = book.year;
        cell3.innerHTML = book.genre;
    }
}
