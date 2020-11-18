export const signup = user => (
    $.ajax({
        method: 'POST',
        url: 'api/users',
        data: {user}
    })
)
export const login = user => (
    
    $.ajax({
        method: 'POST',
        url: 'api/session',
        data: {user}
    })
)
export const logout = () => ( //because there should be only one session for one user, 
                            // route should have singular session
    $.ajax({
        method: 'DELETE',
        url: 'api/session/',
    })
)