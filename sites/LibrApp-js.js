function newBook() {
    var title = document.getElementById("titleInput").value;
    var publicationYear = Number(document.getElementById("publicationYearInput").value);
    var genre = document.getElementById("genreInput").value;
    if (title == "") {
     document.getElementById("paragraph").innerHTML = "Tuto knihu nelze zaevidovat - nevyplněná pole.";
    } else {
     document.getElementById("paragraph").innerHTML = title + "    " + publicationYear + "    " + genre + " zaevidovano";
     // here will be code for giving information about new book to database
    }
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