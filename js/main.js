// I did choose to use Unsplash API for the VG . https://unsplash.com/developers
// (FYI Unsplash have 50 requestes/hour limit)

//global variables
const key = "C3esLyVT-9VL0nu9YTFTNSRD1EYXCa1UDPI_Fus3g8M";
const btn = document.querySelector("#myBtn");
const randomBtn = document.querySelector("#random")
// fetch images with search throug input field. 
btn.addEventListener("click", async () =>{
        const userInput = document.querySelector("#searchInput").value;
        try
        {
            const myFetch = await fetch(`https://api.unsplash.com/search/photos?&per_page=30&query=${userInput}&client_id=${key}`)
            if(!myFetch.ok){
                throw new Error(myFetch.status)
            } 
                const data = await myFetch.json()
                const results = data.results 
                document.querySelector("#randomImg").innerHTML = " ";
                document.querySelector("#imageGrid").innerHTML = " ";
                //loop through the object with a forEach loop
                results.forEach(i => {
                const myImages = i.urls.small
                document.querySelector("#imageGrid").innerHTML += `
                <img src="${myImages}" alt="" id="img1">
                `;
            })
        }
        catch(error){
            console.log(error)
            //Finally clear the search input field after each search
        } finally{
            document.querySelector("#searchInput").value = " ";
        }
})

//Fetch a random image
randomBtn.addEventListener("click", async () =>{
    try
    {
        const myFetch = await fetch(`https://api.unsplash.com/photos/random?&client_id=${key}`)
        if(!myFetch.ok){
            throw new Error(myFetch.status)
    }  
        document.querySelector("#imageGrid").innerHTML = " ";
        const data = await myFetch.json()
        const randomImg = data.urls.small
        //Select the image description
        let descriptionImg = data.alt_description  
        let text = document.querySelector("#randomImg");
        text.innerHTML = `
        <img src="${randomImg}">
        <p id="desc">"${descriptionImg}"</p>
        `;
    }
    catch(error){

        console.log(error)
    } finally{
        //Finally replace the image descriptions that have "null" as a description with the string "no caption".
        let text = document.querySelector("#desc"); 
        if(text.innerHTML === "\"null\""){
            text.innerHTML = "No caption";
        }
    }
})