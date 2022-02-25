
async function dumpCards(){
    let url = 'https://jsonplaceholder.typicode.com/photos'
    let req = await fetch(url).then(response=>{
        return response.json()
    })
 
    generateLists.generate(req)


}

const generateLists = {
    listsGallery: [],
    listsCoverGallerys: [],

    generate: function(req){
        let secsList = req.slice(-1)[0].albumId
        console.log(secsList)
        for(let g=0;g<secsList;g++){           
            generateLists.listsGallery[g] = []
            
        }
        

        for(let gallerys in req){
            let id = Number(req[gallerys].albumId) - 1

            generateLists.listsGallery[id].push(req[gallerys])
        } 

        generateLists.generateCoverGallery()
    },

    generateCoverGallery: function(){
        for(let c of generateLists.listsGallery){
            
            generateLists.listsCoverGallerys.push(c[0])

        }
    }
    
}
