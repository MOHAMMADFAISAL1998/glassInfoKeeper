
async function getJSONData(){
    try{
        const response = await fetch('./JSON/product.json');
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }
    catch(error){
        console.error('Error fetching or parsing JSON:',error);
        throw error;
    }
}



