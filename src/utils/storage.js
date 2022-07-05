const storage = {
    ssSet (key, val) {
        if (val) {
            sessionStorage.setItem(key, JSON.stringify(val))
        }
    },
    ssGet (key) {
        return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : ''
    },
    ssRm (key) {
        sessionStorage.removeItem(key)
    },
    lsSet (key, val) {
        if (val) {
            localStorage.setItem(key, JSON.stringify(val))
        }
    },
    lsGet (key) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : ''
    },
    lsRm (key) {
        localStorage.removeItem(key)
    }
}
export default storage
