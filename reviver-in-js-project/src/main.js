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

// @todo the AbstractReviver should be able to auto-select the root node if
const book = bookReviver.main(oneBook.book)

console.log(book)