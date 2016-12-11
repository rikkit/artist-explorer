import * as States from './states'

interface CacheEntry {
    model :Object | Object[];
}

export default class Cache {
    static cache :{ [key: string]: CacheEntry; } = {};

    public static saveModel(key :string, model :Object | Object[]) {
        let entry = this.cache[key];
        if (entry) {
            entry.model = model;
        }
        else {
            this.cache[key] = {
                model: model
            }
        }
    }

    public static selectObject(key :string, index :number | undefined = undefined) {
        let entry = this.cache[key];

        if (!entry || !entry.model)
        {
            return null;
        }

        return index
            ? entry.model[index]
            : entry.model;
    }
}