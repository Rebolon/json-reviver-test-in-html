import {Serie} from "./serie";
import {EntityInterface} from '../../node_modules/@rebolon/json-reviver/src/entityInterface'

export class Book implements EntityInterface {
    id: number
    title: string = ''
    description?: string = ''
    indexInSerie?: number

    serie?: Serie

    setSerie(serie: Serie): void {
        this.serie = serie
    }
}