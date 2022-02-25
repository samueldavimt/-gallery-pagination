
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
            console.log('parou prev')
           return false

        }else{
            return true
        }
    },

    verificarLimiteNext(){
        console.log(controlsConfig.value,controlsConfig.limite)

        if(controlsConfig.value < controlsConfig.limite){
            console.log('parou next')
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
        console.log('button')
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

            console.log('NumPosts',numPosts)

            let infoPosts = document.createElement('div')
            infoPosts.classList.add('infoPosts')

            let textInfoPost = document.createElement('p')
            textInfoPost.innerHTML = `${numPosts} Posts`
            infoPosts.appendChild(textInfoPost)

            

            galleryCard.appendChild(title)
            galleryCard.appendChild(divImg)
            galleryCard.appendChild(infoPosts)
            // gallery.dataset.positionList = listCoverCards[card].albumId - 1
            // gallery.addEventListener('click',viewInsideCards.viewPosts)



        containerCards.appendChild(galleryCard)
        }





    }
}

// Stados da paginacao

const states = {
    firstPage:1,
    currentPage: 1,
    totalPages: null,
    perPage: 5,


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

        controlsConfig.limite = -(containerButtons.children.length -2) * 30
       

    },

    listParse: null,
    whatCard: null,

    parseCards(){

        let start = (states.currentPage - 1) * states.perPage

        let end = start + states.perPage

        let parseList = states.listParse.slice(start,end)

        console.log(parseList)
        if(states.whatCard = 'gallerys'){
            generatecards.generateGallerys(parseList)
        }else{
            generatecards.generatePosts(parseList)
        }

    },

    listParse: null,
    whatCard: null,

    updateConfigParse(whatCard, listParse){

        states.listParse = listParse
        states.whatCard = whatCard

        states.update()
    },

    update(){
        states.parseCards()
        update()
        
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