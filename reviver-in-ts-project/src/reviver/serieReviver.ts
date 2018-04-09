import {Serie} from "../entities/serie"
import {ItemAbstractReviver} from '../../node_modules/@rebolon/json-reviver/src/reviver/itemAbstractReviver'

export class SerieReviver extends ItemAbstractReviver
{
    /**
     *
     * @returns {string}
     */
    getNodeName(): string {
        return 'serie'
    }

    /**
     *
     * @returns {Object}
     */
    getNewEntity(): Object {
        return new Serie()
    }

    /**
     * {@inheritdoc}
     * for this kind of json:
     * {
     *   "serie": {
     *     "name": "The serie name"
     *   }
     * }
     */
    public getEzPropsName()
    {
        return ['id', 'name', ]
    }

    /**
     * {@inheritdoc}
     */
    public getManyRelPropsName(): Object
    {
        return {}
    }

    /**
     * {@inheritdoc}
     */
    public getOneRelPropsName(): Object
    {
        return {}
    }
}
