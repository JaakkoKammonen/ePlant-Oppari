// importing all images and naming them
import dill from '../assets/set_image/tilli.jpg'
import parsley from '../assets/set_image/persilja.jpg'
import caraway from '../assets/set_image/kumina.jpg'
import thyme from '../assets/set_image/timjami.jpg'
import basil from '../assets/set_image/basilika.jpg'
import coriander from '../assets/set_image/korianteri.jpg'
import bloodydock from '../assets/set_image/viinisuolaheina.jpg'
import oregano from '../assets/set_image/oregano.jpg'
import chive from '../assets/set_image/ruohosipuli.jpg'
import mint from '../assets/set_image/minttu.jpg'
import tarragon from '../assets/set_image/rakuuna.jpg'
import lemonbalm from '../assets/set_image/sitruunamelissa.jpg'
import notdefinedImage from '../assets/set_image/ei_maaritelty.jpg'
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
        case 'bloody dock':
            return bloodydock;
        case 'oregano':
            return oregano;
        case 'chive':
            return chive;
        case 'mint':
            return mint;
        case 'tarragon':
            return tarragon;
        case 'lemon balm':
            return lemonbalm;
        case 'other':
            return notdefinedImage;
        default:
        return placeholderImage;
        
    }
};

