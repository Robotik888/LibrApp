function nacteni() {
    var nazev = document.getElementById("nazev").value;
    var rok = Number(document.getElementById("rok").value);
    var zanr = document.getElementById("zanr").value;
    if (nazev == "") {
     document.getElementById("odst").innerHTML = "Tuto knihu nelze zaevidovat - nevyplněná pole.";
    } else {
     document.getElementById("odst").innerHTML = nazev + "    " + rok + "    " + zanr + " zaevidovano";
     // Zde zapsat zaslani dat o knize do databaze
    }
 }
 function nacteni() {
    var nazev = document.getElementById("nazev").value;
    var jmeno = document.getElementById("jmeno").value;
    var dokdy = document.getElementById("dokdy").value;
    var datumvraceni = document.getElementById("datumvraceni").value;
    if (jmeno == "" || dokdy == "" || datumvraceni == "" || nazev == "") {
     document.getElementById("odst").innerHTML = "Výpůjčku nelze provést - nevyplněná pole.";
    } else {
     var datumek = new Date().toLocaleDateString();
     document.getElementById("odst").innerHTML = datumek + " výpůjčka " + nazev + " pro " + jmeno + " vypůjčeno do " + dokdy + " předpokládané vrácení " + datumvraceni;
     // Zde zapsat zaslani dat o vypujcce do databaze
    }
}
function dateFce() {
    var datumik = new Date().toLocaleDateString();
    document.getElementById("dnesnidatum").innerHTML = datumik;
    }