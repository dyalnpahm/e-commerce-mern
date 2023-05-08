export function pluralize(name, count) {
    if (count === 1) {
        return name;
    }
    return name + 's';
}

export function idbPromise (storeName, method, object) {
    return new Promise((resolve, reject) => {
//connect to db
        const request = window.indexedDB.open('mern_db', 1);
        //variables 
        let connectDB, txn, store ;
        request.onupgradeneeded = function(e) {
            const connectDB = request.result;
            connectDB.createObjectStore('categories', {keyPath: '_id'});
            connectDB.createObjectStore('products', {keyPath: '_id'});
            connectDB.createObjectStore('cart', {keyPath: '_id'});

};
//error with connection
request.onerror = function(e) {
    console.log('Error has occured');
};
//success with connection
request.onsuccess = function(e) {
    console.log('successfully connected');
    connectDB = request.result;
    txn = connectDB.transaction(storeName, 'readwrite');
    store = txn.objectStore(storeName);

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
 //when transaction is complete
    txn.oncomplete = function() {
        connectDB.close();
    }
};
});
}
