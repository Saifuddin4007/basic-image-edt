let filters= {
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
const resetBtn= document.querySelector('#reset-btn');
let file= null;
let image= null;
let filtersContainer= document.querySelector('.filters');
const downloadBtn= document.querySelector('#download-btn');

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

    input.addEventListener('input', (event)=>{
        filters[name].value= input.value;
        // console.log(name, filters[name])
        applyFilters()
    })

    return div;

}



function createFilter(){
    
    Object.keys(filters).forEach(filter=>{
        const filterElement= createFilterElements(filter, filters[filter].unit, filters[filter].value, filters[filter].min, filters[filter].max);

        filtersContainer.appendChild(filterElement);
    

    })
}

createFilter();

inputImg.addEventListener('change',()=>{
    const imagePlaceHolder= document.querySelector('.placeholder');
    canvasImg.style.display= 'block';
    imagePlaceHolder.style.display= 'none';
    file= event.target.files[0];
    const img= new Image(); //!creating image by using JS instead html
    img.src= URL.createObjectURL(file); //!giving the link of image
    img.onload= ()=>{
        image= img;
        canvasImg.width= img.width;
        canvasImg.height= img.height;
        canvasCtx.drawImage(img, 0, 0)
    }
})


function applyFilters(){
    canvasCtx.clearRect(0, 0, canvasImg.width, canvasImg.height);
    canvasCtx.filter= `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
    `
    canvasCtx.drawImage(image, 0, 0)
}


resetBtn.addEventListener('click', ()=>{
    filters= {
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

applyFilters()
  filtersContainer.innerHTML="";
  createFilter();  
})

downloadBtn.addEventListener('click',()=>{
    const link= document.createElement('a');
    link.download= 'edited-image.png';
    link.href= canvasImg.toDataURL();
    link.click();
})