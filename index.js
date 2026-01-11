const filters= {
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    Contrast:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    Exposure:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    Saturation:{
        value:100,
        min:0,
        max:200,
        unit:'%'
    },
    HueRotation:{
        value:0,
        min:0,
        max:360,
        unit:'deg'
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:'px'
    },
    GrayScale:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:'%'
    },
    Invert:{
        value:0,
        min:0,
        max:100,
        unit:'%'
    },
}

const canvasImg= document.querySelector('#image-canvas');
const inputImg= document.querySelector('#image-input');
const canvasCtx= canvasImg.getContext('2d'); 

const createFilterElements= (name, unit='%', value, min, max) =>{

    const div= document.createElement('div');
    div.classList.add('filter');

    const input= document.createElement('input');
    input.type= 'range';
    input.min= min;
    input.max= max;
    input.value= value;
    input.name= name;

    const p= document.createElement('p');
    p.innerText= name;

    div.appendChild(p);
    div.appendChild(input);

    return div;

}

const filtersContainer= document.querySelector('.filters');
Object.keys(filters).forEach(filter=>{
    const filterElement= createFilterElements(filter, filters[filter].unit, filters[filter].value, filters[filter].min, filters[filter].max);

    filtersContainer.appendChild(filterElement);
    

})



inputImg.addEventListener('change',()=>{
    const imagePlaceHolder= document.querySelector('.placeholder');
    imagePlaceHolder.style.display= 'none';
    const file= event.target.files[0];
    const img= new Image(); //!creating image by using JS instead html
    img.src= URL.createObjectURL(file); //!giving the link of image
    img.onload= ()=>{
        canvasImg.width= img.width;
        canvasImg.height= img.height;
        canvasCtx.drawImage(img, 0, 0)
    }
})