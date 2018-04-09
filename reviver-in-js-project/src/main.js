import {SerieReviver} from "./reviver/serieReviver";
import {BookReviver} from "./reviver/bookReviver";

const oneBook = {
    "book": {
        "title": "Zombies in western culture",
        "serie": {
            "name": "Open Reports Series"
        }
    }
}

const serieReviver = new SerieReviver()
const bookReviver = new BookReviver(serieReviver)

const book = bookReviver.main(oneBook.book)

window['book'] = book
console.log(book)