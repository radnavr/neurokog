const NEUROCOG_API_URL = process.env.REACT_APP_API_URL;

// GET FETCH
export const getData = async () => {

    const response = await fetch(NEUROCOG_API_URL);
    const responseJson = await response.json();

    return responseJson;
}

// POST FETCH
export const sendData = async (newItem) => {

    await fetch(NEUROCOG_API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newItem)
    }) 
}

// PUT FETCH
export const editData = async (editedItem) => {

    await fetch(`${NEUROCOG_API_URL}/${editedItem._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedItem)
    })
}

// DELETE FETCH
export const deleteData = async (itemOfId) => {
    
    await fetch(`${NEUROCOG_API_URL}/${itemOfId}`,{
        method: 'DELETE'
    })
}