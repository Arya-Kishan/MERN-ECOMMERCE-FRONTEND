export function AddWishlist(wishlist) {
    return new Promise(async (resolve) => {
        const response = await fetch("/wishlist", {
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
        const response = await fetch(`/wishlist/${userId}`)
        const data = await response.json()
        resolve({ data })
    });
}

export function deleteWishlist(wishlistId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/wishlist/${wishlistId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data })
    });
}