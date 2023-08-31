const storageService = {

    set:<T> (type: 'local' | 'session', key: string, value: T) => {
        if(type === 'local') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }        
    },

    get: (type: 'local' | 'session', key: string) => {
        let item: string | null;
        if(type === 'local') {
            item = localStorage.getItem(key);
        } else {
            item = sessionStorage.getItem(key);
        }   

        return JSON.parse(item as string);
        
    },

    delete: (type: 'local' | 'session', key: string) => {
        if(type === 'local') {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }   
        
    },

    clear: (type: 'local' | 'session') => type === 'local' ? localStorage.clear() :  sessionStorage.clear()

}

export default storageService;