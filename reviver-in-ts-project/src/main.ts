import {BookReviver} from './reviver/bookReviver'
import {SerieReviver} from "./reviver/serieReviver"
import {Book} from "./entities/book";

const oneBook = {
    "book": {
        "title": "Zombies in western culture",
        "serie": {
            "name": "Open Reports Series"
        }
    }
}

const serieReviver = new SerieReviver()
const bookReviver: any = new BookReviver(serieReviver)

const book: Book = bookReviver.main(oneBook.book)

window['book'] = book
console.log(book)
