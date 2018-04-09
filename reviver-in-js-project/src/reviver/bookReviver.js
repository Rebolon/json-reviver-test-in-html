import {Book} from "../entities/book"
import {ItemAbstractReviver, Accessor} from "@rebolon/json-reviver/src";
import {SerieReviver} from "./serieReviver";

export class BookReviver extends ItemAbstractReviver
{
    /**
     * @param {SerieReviver} serieReviver
     */
    constructor (
        serieReviver
    ) {
        super()

        this.serieReviver = serieReviver
    }

    /**
     *
     * @returns {string}
     */
    getNodeName() {
        return 'book'
    }

    /**
     *
     * @returns {Object}
     */
    getNewEntity() {
        return new Book()
    }

    /**
     * {@inheritdoc}
     * for this kind of json:
     * {
     *   "book": {
     *     "title": "The green lantern",
     *     "description": "Whatever you want",
     *     "index_in_serie": 15
     *   }
     * }
     */
    getEzPropsName()
    {
        return ['id', 'title', 'description', 'indexInSerie', ]
    }

    /**
     * {@inheritdoc}
     */
    getManyRelPropsName()
    {
        return []
    }

    /**
     * {@inheritdoc}
     *
     * registryKey could be used if we create an endpoint that allow batch POST/PUT of book with embedded serie
     */
    getOneRelPropsName()
    {
        return {
            'serie': {
                'reviver': this.serieReviver,
                'registryKey': 'serie',
            },
        }
    }
}
