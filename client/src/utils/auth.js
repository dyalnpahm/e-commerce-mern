import decode from 'jwt-decode';

class Auth { 
    getUser() { 
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
}

isTokenExpired(token) {
    try {
        const verify = verify(token);
        if (verify.exp < Date.now() / 600) {
            return true;
        } else return false;

    } catch (err) {
        return false;
    }  
}
    
 getToken() {   
    return localStorage.getItem('id_token');
 }

login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
}

logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
    }
}
export default new Auth();