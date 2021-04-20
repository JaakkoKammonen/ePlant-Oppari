// importing all images and naming them
import tilliImage from '../assets/background_img/tilli.jpg'
import persiljaImage from '../assets/background_img/persilja.jpg'
import kuminaImage from '../assets/background_img/kumina.jpg'
import timjamiImage from '../assets/background_img/timjami.jpg'
import basilikaImage from '../assets/background_img/basilika.jpg'
import korianteriImage from '../assets/background_img/korianteri.jpg'
import viinisuolaheinaImage from '../assets/background_img/viinisuolaheina.jpg'
import oreganoImage from '../assets/background_img/oregano.jpg'
import ruohosipuliImage from '../assets/background_img/ruohosipuli.jpg'
import minttuImage from '../assets/background_img/minttu.jpg'
import rakuunaImage from '../assets/background_img/rakuuna.jpg'
import sitruunamelissaImage from '../assets/background_img/sitruunamelissa.jpg'
import eimaariteltyImage from '../assets/background_img/ei_maaritelty.jpg'

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

