
//InfoPosts
document.querySelectorAll(".gallery").forEach(gallery=>{
    gallery.addEventListener('mouseout',function(){
        this.children[2].style.height = '0'
    })

    gallery.addEventListener('mouseover',function(){
        this.children[2].style.height = '100%'
    })
})

// Pagination

let containerButtons = document.querySelector('.container_buttons')
let buttons = document.querySelectorAll('.container_buttons span')

document.querySelector('#next').addEventListener('click',function(){   

    if(controlsConfig.verificarLimiteNext()){
      controlsConfig.value -= 30
      controlsConfig.setMarginControl(`${controlsConfig.value}`) 
  }   
})

document.querySelector('#prev').addEventListener('click',function(){  

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
    
    setMarginButton(v){
        let margin = Number(this.innerHTML) * 25
        containerButtons.style.marginLeft = `-${margin}px`
        controlsConfig.value = Number(`-${margin}`)
       
    }
}

buttons.forEach(button=>{
    button.addEventListener('click',buttonsConfig.setMarginButton)

})


