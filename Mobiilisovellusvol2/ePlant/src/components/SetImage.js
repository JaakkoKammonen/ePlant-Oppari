// importing all images and naming them
import dill from '../assets/set_image/dill.jpg'
import parsley from '../assets/set_image/parsley.jpg'
import caraway from '../assets/set_image/caraway.jpg'
import thyme from '../assets/set_image/thyme.jpg'
import basil from '../assets/set_image/basil.jpg'
import coriander from '../assets/set_image/coriander.jpg'
import oregano from '../assets/set_image/oregano.jpg'
import chive from '../assets/set_image/chive.jpg'
import mint from '../assets/set_image/mint.jpg'
import lemonbalm from '../assets/set_image/lemon_balm.jpg'
import notdefinedImage from '../assets/set_image/other.jpg'
import placeholderImage from "../assets/set_image/placeholderImage.png"

// selecting which image to return based on param from Search.js
export default function SetBackgroundImg(plant) {
    
    //console.log(plant)

    switch (plant) {
        case 'dill':
            return dill;
        case 'parsley':
            return parsley;
        case 'caraway':
            return caraway;
        case 'thyme':
            return thyme;
        case 'basil':
            return basil;
        case 'coriander':
            return coriander;
        case 'oregano':
            return oregano;
        case 'chive':
            return chive;
        case 'mint':
            return mint;
        case 'lemon balm':
            return lemonbalm;
        case 'other':
            return notdefinedImage;
        default:
        return placeholderImage;
        
    }
};

