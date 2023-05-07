export function pluralize(name, count) {
    if (count === 1) {
        return name;
    }
    return name + 's';
}

export function iconnectDBPromise (storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedconnectDB.open('highdrive', 1);
        let connectDB, tx, store ;
        request.onupgradeneeded = function(e) {
            const connectconnectDB = request.result;
            connectDB.createObjectStore('categories', {keyPath: '_id'});
            connectDB.createObjectStore('products', {keyPath: '_id'});
            connectDB.createObjectStore('cart', {keyPath: '_id'});

};

request.onerror = function(e) {
    console.log('Error has occured');
};

request.onsuccess = function(e) {
    console.log('successfully connected');
    connectDB = request.result;
    tx = connectDB.transaction(storeName, 'readwrite');
    store = tx.objectStore(storeName);

    connectDB.onerror = function(e) {
        console.log('error occured', e);
    };

    switch (method) {   
        case 'put':
            store.put(object);
            resolve(object);
            break;
        case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
                resolve(all.result);
            };
            break;
        case 'delete':
            store.delete(object._id);
            break;
        default:
            console.log('Not possible');
            break;
    }
 
    tx.oncomplete = function() {
        connectconnectDB.close();
    }
};
});
}
