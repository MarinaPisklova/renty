// export function convertToSerializeableObject(leanDocument) {
//     for (const key of Object.keys(leanDocument)) {
//         if (leanDocument[key].toJSON && leanDocument[key].toString)
//             leanDocument[key] = leanDocument[key].toString();
//     }
//     return leanDocument;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToSerializableObject<T extends Record<string, any>>(leanDocument: T): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serializedDocument = { ...leanDocument } as Record<string, any>;

    for (const key of Object.keys(serializedDocument)) {
        if (
            serializedDocument[key] &&
            typeof serializedDocument[key] === 'object' &&
            'toJSON' in serializedDocument[key] &&
            'toString' in serializedDocument[key]
        ) {
            serializedDocument[key] = serializedDocument[key].toString();
        }
    }

    return serializedDocument as T;
}
