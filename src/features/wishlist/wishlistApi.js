export function AddWishlist(wishlist) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/wishlist", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(wishlist)
        })
        const data = await response.json()
        resolve({ data })
    });
}


export function fetchWishlist(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/wishlist/${userId}`)
        const data = await response.json()
        resolve({ data })
    });
}

export function deleteWishlist(wishlistId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/wishlist/${wishlistId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data })
    });
}