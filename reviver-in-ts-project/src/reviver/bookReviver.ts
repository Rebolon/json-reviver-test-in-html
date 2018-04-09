import {Book} from "../entities/book"
import {SerieReviver} from "./serieReviver";
import {ItemAbstractReviver} from '../../node_modules/@rebolon/json-reviver/src/reviver/itemAbstractReviver'

export class BookReviver extends ItemAbstractReviver
{
    /**
     * @var SerieReviver
     */
    protected serieReviver

    /**
     *
     * @param {SerieReviver} serieReviver
     */
    constructor (
        serieReviver: SerieReviver
    ) {
        super()

        this.serieReviver = serieReviver
    }

    /**
     *
     * @returns {string}
     */
    getNodeName(): string {
        return 'book'
    }

    /**
     *
     * @returns {Object}
     */
    getNewEntity(): Object {
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
    public getEzPropsName()
    {
        return ['id', 'title', 'description', 'indexInSerie', ]
    }

    /**
     * {@inheritdoc}
     */
    public getManyRelPropsName(): Object
    {
        return []
    }

    /**
     * {@inheritdoc}
     *
     * registryKey could be used if we create an endpoint that allow batch POST/PUT of book with embedded serie
     */
    public getOneRelPropsName(): Object
    {
        return {
            'serie': {
                'reviver': this.serieReviver,
                'registryKey': 'serie',
            },
        }
    }
}
