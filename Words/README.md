# Words extracted from https://www.lingowoorden.nl

using
```
tbl = [];
for (let i = 0; i < Array.from(document.getElementsByTagName("a")).length; i++) {
    if (Array.from(document.getElementsByTagName("a"))[i].href.match("https://www.lingowoorden.nl/woord/*")) {
        console.log(Array.from(document.getElementsByTagName("a"))[i].innerText)
        tbl.push(Array.from(document.getElementsByTagName("a"))[i].innerText)
    }
}
console.log(JSON.stringify(tbl))
```