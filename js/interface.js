
//InfoPosts
function addInfoPosts(){
    document.querySelectorAll(".gallery").forEach(gallery=>{
        gallery.addEventListener('mouseout',function(){
            this.children[2].style.height = '0'
        })
    
        gallery.addEventListener('mouseover',function(){
            this.children[2].style.height = '100%'
        })
    })
}

// Pagination

let containerButtons = document.querySelector('.container_buttons')
let buttons = document.querySelectorAll('.container_buttons span')

document.querySelector('#next').addEventListener('click',function(){   
    states.next()
    colorButtons.colorPrevNext()

    if(controlsConfig.verificarLimiteNext()){
      controlsConfig.value -= 30
      controlsConfig.setMarginControl(`${controlsConfig.value}`) 
  }   
})

document.querySelector('#prev').addEventListener('click',function(){  
    states.prev()
    colorButtons.colorPrevNext()

  if(controlsConfig.verificarLimitePrev()){
      controlsConfig.value += 30
      controlsConfig.setMarginControl(`${controlsConfig.value}`)    
  }
})

const controlsConfig = {
    value:0,
    limite: -(containerButtons.children.length -2) * 30,
    verificarLimitePrev(){
        if(controlsConfig.value > -18){
            
           return false

        }else{
            return true
        }
    },

    verificarLimiteNext(){

        if(controlsConfig.value < controlsConfig.limite){
           
           return false

        }else{
            return true
        }
    },

   setMarginControl(v){
    containerButtons.style.marginLeft = `${v}px`
    
   }
}

const buttonsConfig = {
    
    setMarginButton(e){
       
        let margin = Number(e.target.innerHTML) * 25
        containerButtons.style.marginLeft = `-${margin}px`
        controlsConfig.value = Number(`-${margin}`)
       
    }
}



// Await

const HideShowWait ={
    wait: document.querySelector('.wait'),

    hide(){
        HideShowWait.wait.classList.add('hideWait')
        HideShowWait.wait.classList.remove('showWait')
    },
    show(){
        HideShowWait.wait.classList.remove('hideWait')
        HideShowWait.wait.classList.add('showWait')
    },

    err(){
        this.wait.children[0].innerHTML = 'Erro ao Carregar galerias'
    }

    
}

// generatecards

let containerCards =document.querySelector(".containerCards")

const generatecards ={


    generateGallerys(listGallery){
        containerCards.innerHTML = ''
        document.querySelector('#title').innerHTML = 'Galerias'
        document.querySelector('#back').style.display = 'none'


        for(let gallery in listGallery){
          
            let galleryCard = document.createElement('div')
            galleryCard.classList.add('gallery')

            let divImg = document.createElement('div')
            divImg.classList.add('img')

            let img = document.createElement("img")
            img.src = listGallery[gallery].thumbnailUrl
            divImg.appendChild(img)

            let title = document.createElement('h3')
            title.innerHTML = ' Galeria ' +  listGallery[gallery].albumId

            // dataset com a posicao dos posts
            let positionListPosts = listGallery[gallery].albumId
            galleryCard.dataset.positionListPosts = positionListPosts
            
            // numero de postagens na galeria
            let numPosts = generateLists.listGalleryPosts[positionListPosts -1].length


            let infoPosts = document.createElement('div')
            infoPosts.classList.add('infoPosts')

            let textInfoPost = document.createElement('p')
            textInfoPost.innerHTML = `${numPosts} Posts`
            infoPosts.appendChild(textInfoPost)

            

            galleryCard.appendChild(title)
            galleryCard.appendChild(divImg)
            galleryCard.appendChild(infoPosts)

            galleryCard.addEventListener('click',generatecards.openGallery)

            // gallery.dataset.positionList = listCoverCards[card].albumId - 1
            // gallery.addEventListener('click',viewInsideCards.viewPosts)



        containerCards.appendChild(galleryCard)
        }





    },

    generatePosts(listPosts){
        
        containerCards.innerHTML = ''
        document.querySelector('#title').innerHTML = 'Posts'
        document.querySelector('#back').style.display = 'block'


        for(let postItem in listPosts){

            let post = document.createElement('a')
            post.classList.add('post')
            post.href = `/posts/galeria${listPosts[postItem].albumId}/${listPosts[postItem].id}`
            post.setAttribute('target','_blank')

            let title = document.createElement('h2')
            title.innerHTML = 'Postagem'

            // let divImg = document.createElement('div')
            // divImg.classList.add('img')

            // let img = document.createElement("img")
            
            // img.src = listPosts[postItem].thumbnailUrl
            // divImg.appendChild(img)

            let divText = document.createElement('div')
            divText.classList.add('text')

            let text = document.createElement('p')
            text.innerHTML = listPosts[postItem].title
            divText.appendChild(text)

            let infoGallery = document.createElement('h3')
            infoGallery.innerHTML = `Galeria ${listPosts[postItem].albumId} <span>Id: ${listPosts[postItem].id}</span>`


            post.appendChild(title)
            // post.appendChild(divImg)
            post.appendChild(divText)
            post.appendChild(infoGallery)


            containerCards.appendChild(post)
            
        }

    },

    openGallery(e){
        let gallery = this;
        let positionListPosts = gallery.dataset.positionListPosts
        let listPosts = generateLists.listGalleryPosts[positionListPosts -1]
      
       generatecards.displayPosts(listPosts)

    },

    displayPosts(listPosts){
        
        let totalPages = Math.ceil(listPosts.length / states.perPage)

        states.updateTotalPages(totalPages)
        states.updateConfigParse('posts',listPosts)

    },

    redirectPost(gallery,id){


    }


}

// Stados da paginacao

const states = {
    firstPage:1,
    currentPage: 1,
    totalPages: null,
    perPage: 6,


    prev(){
        states.currentPage --
        if(states.currentPage < 1){
            states.currentPage = states.firstPage
        }
        states.update()
    },

    next(){
        states.currentPage ++
        if(states.currentPage > states.totalPages){
            states.currentPage = states.totalPages
        }
        states.update()
    },

    jumpPage(page){
        states.currentPage = page
        states.update()
    },


    updateTotalPages(totalPages){
       
        states.totalPages = totalPages
        states.insertButtons()
    },

    insertButtons(){
        let containerButtons = document.querySelector('.container_buttons')

        containerButtons.innerHTML = ''

        for(let page=1;page<(states.totalPages +1);page++){
            let button = document.createElement('span')
            button.innerHTML = page;
           

            containerButtons.appendChild(button)
        }

        let buttons = document.querySelectorAll('.container_buttons span')
        buttons.forEach(button=>{
            button.addEventListener('click',function(e){
                colorButtons.colorButtonClick(buttons, e)
                buttonsConfig.setMarginButton(e)
                states.jumpPage(Number(e.target.innerHTML))
            })
        
        })

        states.resetControlsConfig()
       

    },

    resetControlsConfig(){
        controlsConfig.limite = -(containerButtons.children.length -2) * 30;

        controlsConfig.value = 0
    },

    listParse: null,
    whatCard: null,

    parseCards(){

        let start = (states.currentPage - 1) * states.perPage

        let end = start + states.perPage

        let parseList = states.listParse.slice(start,end)

        if(states.whatCard == 'gallerys'){
            generatecards.generateGallerys(parseList)
            update()
        }else{
            // generatecards.generatePosts(parseList)
            generatecards.generatePosts(parseList)
           
        }

    },


    updateConfigParse(whatCard, listParse){
        
        states.listParse = listParse;
        states.whatCard = whatCard;
        states.currentPage = 1
        containerButtons.style.marginLeft = '0px'
        states.update()
    },

    update(){
        states.parseCards()
    }



}

// colorir botoes

const colorButtons = {
    
    colorButtonClick(buttons, button){
        colorButtons.resetColor(buttons)
        button.target.style.backgroundColor = 'gray'
    },

    resetColor(buttons){
        buttons.forEach(button => {
            button.style.backgroundColor = 'white'
        })
    }
    ,

    colorPrevNext(){
        let buttonsList =  document.querySelectorAll('.container_buttons span')

        let buttons = document.querySelector('.container_buttons')

        colorButtons.resetColor(buttonsList)
        buttons.children[states.currentPage - 1].style.backgroundColor = 'gray'

    }
}

function update(){
    addInfoPosts()
}