'use strict';

/**
 * Special values that tell deepmerge to perform a certain action.
 */
const actions = {
    defaultMerge: Symbol("deepmerge-ts: default merge"),
    skip: Symbol("deepmerge-ts: skip"),
};
/**
 * Special values that tell deepmergeInto to perform a certain action.
 */
({
    defaultMerge: actions.defaultMerge,
});

/**
 * The default function to update meta data.
 *
 * It doesn't update the meta data.
 */
function defaultMetaDataUpdater(previousMeta, metaMeta) {
    return metaMeta;
}
/**
 * The default function to filter values.
 *
 * It filters out undefined values.
 */
function defaultFilterValues(values, meta) {
    return values.filter((value) => value !== undefined);
}

/**
 * The different types of objects deepmerge-ts support.
 */
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["NOT"] = 0] = "NOT";
    ObjectType[ObjectType["RECORD"] = 1] = "RECORD";
    ObjectType[ObjectType["ARRAY"] = 2] = "ARRAY";
    ObjectType[ObjectType["SET"] = 3] = "SET";
    ObjectType[ObjectType["MAP"] = 4] = "MAP";
    ObjectType[ObjectType["OTHER"] = 5] = "OTHER";
})(ObjectType || (ObjectType = {}));
/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */
function getObjectType(object) {
    if (typeof object !== "object" || object === null) {
        return 0 /* ObjectType.NOT */;
    }
    if (Array.isArray(object)) {
        return 2 /* ObjectType.ARRAY */;
    }
    if (isRecord(object)) {
        return 1 /* ObjectType.RECORD */;
    }
    if (object instanceof Set) {
        return 3 /* ObjectType.SET */;
    }
    if (object instanceof Map) {
        return 4 /* ObjectType.MAP */;
    }
    return 5 /* ObjectType.OTHER */;
}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */
function getKeys(objects) {
    const keys = new Set();
    for (const object of objects) {
        for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
            keys.add(key);
        }
    }
    return keys;
}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */
function objectHasProperty(object, property) {
    return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
/**
 * Get an iterable object that iterates over the given iterables.
 */
function getIterableOfIterables(iterables) {
    let mut_iterablesIndex = 0;
    let mut_iterator = iterables[0]?.[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    do {
                        if (mut_iterator === undefined) {
                            return { done: true, value: undefined };
                        }
                        const result = mut_iterator.next();
                        if (result.done === true) {
                            mut_iterablesIndex += 1;
                            mut_iterator = iterables[mut_iterablesIndex]?.[Symbol.iterator]();
                            continue;
                        }
                        return {
                            done: false,
                            value: result.value,
                        };
                    } while (true);
                },
            };
        },
    };
}
// eslint-disable-next-line unicorn/prefer-set-has -- Array is more performant for a low number of elements.
const validRecordToStringValues = ["[object Object]", "[object Module]"];
/**
 * Does the given object appear to be a record.
 */
function isRecord(value) {
    // All records are objects.
    if (!validRecordToStringValues.includes(Object.prototype.toString.call(value))) {
        return false;
    }
    const { constructor } = value;
    // If has modified constructor.
    // eslint-disable-next-line ts/no-unnecessary-condition
    if (constructor === undefined) {
        return true;
    }
    const prototype = constructor.prototype;
    // If has modified prototype.
    if (prototype === null ||
        typeof prototype !== "object" ||
        !validRecordToStringValues.includes(Object.prototype.toString.call(prototype))) {
        return false;
    }
    // If constructor does not have an Object-specific method.
    // eslint-disable-next-line sonar/prefer-single-boolean-return, no-prototype-builtins
    if (!prototype.hasOwnProperty("isPrototypeOf")) {
        return false;
    }
    // Most likely a record.
    return true;
}

/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */
function mergeRecords$1(values, utils, meta) {
    const result = {};
    for (const key of getKeys(values)) {
        const propValues = [];
        for (const value of values) {
            if (objectHasProperty(value, key)) {
                propValues.push(value[key]);
            }
        }
        if (propValues.length === 0) {
            continue;
        }
        const updatedMeta = utils.metaDataUpdater(meta, {
            key,
            parents: values,
        });
        const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
        if (propertyResult === actions.skip) {
            continue;
        }
        if (key === "__proto__") {
            Object.defineProperty(result, key, {
                value: propertyResult,
                configurable: true,
                enumerable: true,
                writable: true,
            });
        }
        else {
            result[key] = propertyResult;
        }
    }
    return result;
}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$1(values) {
    return values.flat();
}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$1(values) {
    return new Set(getIterableOfIterables(values));
}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$1(values) {
    return new Map(getIterableOfIterables(values));
}
/**
 * Get the last value in the given array.
 */
function mergeOthers$1(values) {
    return values.at(-1);
}
/**
 * The merge functions.
 */
const mergeFunctions = {
    mergeRecords: mergeRecords$1,
    mergeArrays: mergeArrays$1,
    mergeSets: mergeSets$1,
    mergeMaps: mergeMaps$1,
    mergeOthers: mergeOthers$1,
};

/**
 * Deeply merge objects.
 *
 * @param objects - The objects to merge.
 */
function deepmerge(...objects) {
    return deepmergeCustom({})(...objects);
}
function deepmergeCustom(options, rootMetaData) {
    const utils = getUtils(options, customizedDeepmerge);
    /**
     * The customized deepmerge function.
     */
    function customizedDeepmerge(...objects) {
        return mergeUnknowns(objects, utils, rootMetaData);
    }
    return customizedDeepmerge;
}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */
function getUtils(options, customizedDeepmerge) {
    return {
        defaultMergeFunctions: mergeFunctions,
        mergeFunctions: {
            ...mergeFunctions,
            ...Object.fromEntries(Object.entries(options)
                .filter(([key, option]) => Object.hasOwn(mergeFunctions, key))
                .map(([key, option]) => (option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))),
        },
        metaDataUpdater: (options.metaDataUpdater ?? defaultMetaDataUpdater),
        deepmerge: customizedDeepmerge,
        useImplicitDefaultMerging: options.enableImplicitDefaultMerging ?? false,
        filterValues: options.filterValues === false ? undefined : (options.filterValues ?? defaultFilterValues),
        actions,
    };
}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */
function mergeUnknowns(values, utils, meta) {
    const filteredValues = utils.filterValues?.(values, meta) ?? values;
    if (filteredValues.length === 0) {
        return undefined;
    }
    if (filteredValues.length === 1) {
        return mergeOthers(filteredValues, utils, meta);
    }
    const type = getObjectType(filteredValues[0]);
    if (type !== 0 /* ObjectType.NOT */ && type !== 5 /* ObjectType.OTHER */) {
        for (let mut_index = 1; mut_index < filteredValues.length; mut_index++) {
            if (getObjectType(filteredValues[mut_index]) === type) {
                continue;
            }
            return mergeOthers(filteredValues, utils, meta);
        }
    }
    switch (type) {
        case 1 /* ObjectType.RECORD */: {
            return mergeRecords(filteredValues, utils, meta);
        }
        case 2 /* ObjectType.ARRAY */: {
            return mergeArrays(filteredValues, utils, meta);
        }
        case 3 /* ObjectType.SET */: {
            return mergeSets(filteredValues, utils, meta);
        }
        case 4 /* ObjectType.MAP */: {
            return mergeMaps(filteredValues, utils, meta);
        }
        default: {
            return mergeOthers(filteredValues, utils, meta);
        }
    }
}
/**
 * Merge records.
 *
 * @param values - The records.
 */
function mergeRecords(values, utils, meta) {
    const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords)) {
        return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
    }
    return result;
}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays(values, utils, meta) {
    const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays)) {
        return utils.defaultMergeFunctions.mergeArrays(values);
    }
    return result;
}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */
function mergeSets(values, utils, meta) {
    const result = utils.mergeFunctions.mergeSets(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets)) {
        return utils.defaultMergeFunctions.mergeSets(values);
    }
    return result;
}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps(values, utils, meta) {
    const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps)) {
        return utils.defaultMergeFunctions.mergeMaps(values);
    }
    return result;
}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */
function mergeOthers(values, utils, meta) {
    const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers)) {
        return utils.defaultMergeFunctions.mergeOthers(values);
    }
    return result;
}

exports.deepmerge = deepmerge;
exports.deepmergeCustom = deepmergeCustom;
exports.getKeys = getKeys;
exports.getObjectType = getObjectType;
exports.objectHasProperty = objectHasProperty;
//# sourceMappingURL=index-DZlgSSQX.js.map
