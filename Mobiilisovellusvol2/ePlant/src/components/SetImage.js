// importing all images and naming them
import tilliImage from '../assets/set_image/tilli.jpg'
import persiljaImage from '../assets/set_image/persilja.jpg'
import kuminaImage from '../assets/set_image/kumina.jpg'
import timjamiImage from '../assets/set_image/timjami.jpg'
import basilikaImage from '../assets/set_image/basilika.jpg'
import korianteriImage from '../assets/set_image/korianteri.jpg'
import viinisuolaheinaImage from '../assets/set_image/viinisuolaheina.jpg'
import oreganoImage from '../assets/set_image/oregano.jpg'
import ruohosipuliImage from '../assets/set_image/ruohosipuli.jpg'
import minttuImage from '../assets/set_image/minttu.jpg'
import rakuunaImage from '../assets/set_image/rakuuna.jpg'
import sitruunamelissaImage from '../assets/set_image/sitruunamelissa.jpg'
import eimaariteltyImage from '../assets/set_image/ei_maaritelty.jpg'
import placeholderImage from "../assets/set_image/placeholderImage.png"

// selecting which image to return based on param from Search.js
export default function SetBackgroundImg(plant) {
    
    plant.toLowerCase();
    //console.log(plant)

    switch (plant) {
        case 'tilli':
            return tilliImage;
        case 'persilja':
            return persiljaImage;
        case 'kumina':
            return kuminaImage;
        case 'timjami':
            return timjamiImage;
        case 'basilika':
            return basilikaImage;
        case 'korianteri':
            return korianteriImage;
        case 'viinisuolaheina':
            return viinisuolaheinaImage;
        case 'oregano':
            return oreganoImage;
        case 'ruohosipuli':
            return ruohosipuliImage;
        case 'minttu':
            return minttuImage;
        case 'rakuuna':
            return rakuunaImage;
        case 'sitruunamelissa':
            return sitruunamelissaImage;
        case 'muu':
            return eimaariteltyImage;
        default:
        return placeholderImage;
        
    }
};

