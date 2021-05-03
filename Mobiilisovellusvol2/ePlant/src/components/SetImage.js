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

// selecting which image to return based on param from Search.js
export default function SetBackgroundImg(plant) {
    switch (plant) {
        case 'Tilli':
        return tilliImage;
        case 'Persilja':
        return persiljaImage;
        case 'Kumina':
        return kuminaImage;
        case 'Timjami':
        return timjamiImage;
        case 'Basilika':
        return basilikaImage;
        case 'Korianteri':
        return korianteriImage;
        case 'Viinisuolaheinä':
        return viinisuolaheinaImage;
        case 'Oregano':
        return oreganoImage;
        case 'Ruohosipuli':
        return ruohosipuliImage;
        case 'Minttu':
        return minttuImage;
        case 'Rakuuna':
        return rakuunaImage;
        case 'Sitruunamelissa':
        return sitruunamelissaImage;
        case 'Muu':
            return eimaariteltyImage;
        default:
        return placeholderImage;
        
    }
};

