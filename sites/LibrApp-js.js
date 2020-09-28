//  --------------------START OF BOOK ADDING--------------------

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

//  --------------------END OF BOOK ADDING--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF BORROW ADDING--------------------

function FetchBooksNamesForBorrowAddition() {
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState === 4 && xmlHttp2.status === 200) {
            Borrow(JSON.parse(xmlHttp2.responseText));
        }
    }
    xmlHttp2.open("GET", "http://localhost:8080/book/list/names", true);
    xmlHttp2.send(null);
}

function Borrow(parsedNames) {
    const returndate = new Date().toLocaleDateString();
    const assumedReturndate = new Date().toLocaleDateString();
    const title = document.getElementById("titleInput").value;
    const name = document.getElementById("nameInput").value;
    returnDate = document.getElementById("returnDateInput").value;
    assumedReturnDate = document.getElementById("assumedReturnDateInput").value;
    if (name == "" || returnDate == "" || assumedReturnDate == "" || title == "") {
        document.getElementById("paragraph").innerHTML = "Výpůjčku nelze provést - nevyplněná pole.";
    } else if (!(parsedNames.includes(title))) {
        document.getElementById("paragraph").innerHTML = "Zadaná kniha není obsažena v databázi knih, výpůjčku nelze provést.";
    } else {
        const todayDate = new Date().toLocaleDateString();
        document.getElementById("paragraph").innerHTML = todayDate + " výpůjčka " + title + " pro " + name + " vypůjčeno do " + returnDate + " předpokládané vrácení " + assumedReturnDate;
        let borrow = {
            title: title,
            name: name,
            returnDate: returnDate,
            assumedReturnDate: assumedReturnDate
        }
        pushBorrow(borrow);
    }
}

function pushBorrow(borrow) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            alert("Výpůjčka přidána");
        }
    }
    xmlHttp.open("POST", "http://localhost:8080/borrow/addBorrow", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(borrow));
}

//  --------------------END OF BORROW ADDING--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF BORROW DELETION--------------------

function FetchBorrowsNamesForBorrowDeletion() {
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState === 4 && xmlHttp2.status === 200) {
            BorrowDeletion(JSON.parse(xmlHttp2.responseText));
        }
    }
    xmlHttp2.open("GET", "http://localhost:8080/borrow/list/names", true);
    xmlHttp2.send(null);
}

function BorrowDeletion(parsed) {
    let title = document.getElementById("titleInput").value;
    if (!(parsed.includes(title))) {
        document.getElementById("paragraph").innerHTML = "Tato kniha není vypůjčena, nelze ji tudíž odstranit";
    } else {
        document.getElementById("paragraph").innerHTML = title + " byla odstraněna z databáze výpůjček";
        deleteBorrowFromDatabase(title);
    }
}

function deleteBorrowFromDatabase(title) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            alert("Výpůjčka byla odstraněna");
        }
    }
    xmlHttp.open("POST", "http://localhost:8080/borrow/remove", true);
    xmlHttp.send(title);
}

//  --------------------END OF BORROW DELETION--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF BOOK DELETION--------------------

function FetchBooksNamesForBookDeletion() {
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState === 4 && xmlHttp2.status === 200) {
            BookDeletion(JSON.parse(xmlHttp2.responseText));
        }
    }
    xmlHttp2.open("GET", "http://localhost:8080/book/list/names", true);
    xmlHttp2.send(null);
}

function BookDeletion(parsed) {
    var title = document.getElementById("titleInput").value;
    if (!(parsed.includes(title))) {
        document.getElementById("paragraph").innerHTML = "Tato kniha neexistuje, nelze ji tudíž odstranit";
    } else {
        document.getElementById("paragraph").innerHTML = title + " byla odstraněna z databáze";
        deleteBookFromDatabase(title);
    }   
}

function deleteBookFromDatabase(title) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            alert("Kniha byla odstraněna");
        }
    }
    xmlHttp.open("POST", "http://localhost:8080/book/remove", true);
    xmlHttp.send(title);
}


//  --------------------END OF BOOK DELETION--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF BOOKS TABLE FILL--------------------

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

//  --------------------END OF BOOKS TABLE FILL--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF BORROWS TABLE FILL--------------------

function fetchBorrows() {
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState === 4 && xmlHttp2.status === 200) {
            fillBorrowsTable(JSON.parse(xmlHttp2.responseText));
        }
    }
    xmlHttp2.open("GET", "http://localhost:8080/borrow/listBorrow", true);
    xmlHttp2.send(null);
}

function fillBorrowsTable(borrows) {
    const table = document.getElementById('borrow-table');
    for (const borrow of borrows) {
        const row = table.insertRow(1);
        const cell1 = row.insertCell();
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = borrow.title;
        cell2.innerHTML = borrow.name;
        cell3.innerHTML = borrow.returnDate;
        cell4.innerHTML = borrow.assumedReturnDate;
    }
}

//  --------------------END OF BORROWS TABLE FILL--------------------

//  #####
//  #####
//  #####
//  #####
//  #####
//  #####

//  --------------------START OF DELAYED BORROWS TABLE FILL--------------------

function FetchDelayedBorrows() {
    var todayDate = new Date().toLocaleDateString();
    document.getElementById("todayDate").innerHTML = todayDate;
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState === 4 && xmlHttp2.status === 200) {
            fillDelayedBorrowsTable(JSON.parse(xmlHttp2.responseText));
        }
    }
    xmlHttp2.open("GET", "http://localhost:8080/borrow/listDelayedBorrow", true);
    xmlHttp2.send(null);
}

function fillDelayedBorrowsTable(borrows) {
    const table = document.getElementById('delayedBorrowTable');
    for (const borrow of borrows) {
        const row = table.insertRow(1);
        const cell1 = row.insertCell();
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = borrow.title;
        cell2.innerHTML = borrow.name;
        cell3.innerHTML = borrow.returnDate;
        cell4.innerHTML = borrow.assumedReturnDate;
    }
}

//  --------------------END OF DELAYED BORROWS TABLE FILL--------------------
