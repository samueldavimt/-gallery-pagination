
async function dumpCards(){

    HideShowWait.show()
    let url = 'https://jsonplaceholder.typicode.com/photos'
    let req = await fetch(url).then(response=>{
        HideShowWait.hide()
        return response.json()
       
    }).catch(()=>{
        HideShowWait.err()
    })
    
    generateLists.generate(req)


}


const generateLists = {
    listGalleryPosts: [],
    listCoverGallery: [],

    generate(req){
        let numPositionsList = req.slice(-1)[0].albumId
        for(let g=0;g<numPositionsList;g++){           
            generateLists.listGalleryPosts[g] = []            
        }
        
        for(let gallerys in req){
            let id = Number(req[gallerys].albumId) - 1
            generateLists.listGalleryPosts[id].push(req[gallerys])
        } 

        generateLists.generateListCoverGallery()
    },

    generateListCoverGallery(){
        for(let c of generateLists.listGalleryPosts){
            
            generateLists.listCoverGallery.push(c[0])
        }

        /// gerar galerias
        // generatecards.generateGallerys(generateLists.listCoverGallery)
    }
    
}



async function init(){
    await dumpCards()
    let totalPages = Math.ceil(generateLists.listCoverGallery.length / states.perPage)
    states.updateTotalPages(totalPages)
    states.updateConfigParse('gallerys',generateLists.listCoverGallery)
    update()

}

init()

