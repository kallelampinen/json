//global variables
const key = "C3esLyVT-9VL0nu9YTFTNSRD1EYXCa1UDPI_Fus3g8M";
const btn = document.querySelector("#myBtn");
const randomBtn = document.querySelector("#random")


// fetch images with search throug input field.
btn.addEventListener("click", async () =>{
    const userInput = document.querySelector("#searchInput").value;
    console.log(userInput);
    try
    {
    const myFetch = await fetch(`https://api.unsplash.com/search/photos?&per_page=30&query=${userInput}&client_id=${key}`)
    if(!myFetch.ok){

        throw new Error(myFetch.status)
    }
    const data = await myFetch.json()
    const results = data.results 

    results.forEach(i => {
        const myImages = i.urls.small
        document.querySelector("#imageGrid").innerHTML += `
        <img src="${myImages}" id="img" alt="">
        `;
    })
    }
    catch(error){

        console.log(error)
    }

})

//Fetch a random image
randomBtn.addEventListener("click", async () =>{

    try
    {
    const myFetch = await fetch(`https://api.unsplash.com/photos/random?&client_id=${key}`)
    console.log(myFetch)
    if(!myFetch.ok){

        throw new Error(myFetch.status)
    }  

    const data = await myFetch.json()
    console.log(data)
    const randomImg = data.urls.full
    document.querySelector("#randomImg").innerHTML = `
    <img src="${randomImg}" id="img2" alt="">
    `;
    }
    catch(error){

        console.log(error)
    }
})