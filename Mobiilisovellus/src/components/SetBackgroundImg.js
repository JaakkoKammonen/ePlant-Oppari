// importing all images and naming them
import jukkapalmuImage from '../assets/background_img/jukkapalmu.jpg';
import kaktusImage from '../assets/background_img/kaktus.jpg';
import aloeveraImage from '../assets/background_img/aloevera.jpg'
import avocadoImage from '../assets/background_img/avocado.jpg'
import basilikaImage from '../assets/background_img/basilika.jpg'
import korianteriImage from '../assets/background_img/korianteri.jpg'
import peikonlehtiImage from '../assets/background_img/peikonlehti.png'
import anopinkieliImage from '../assets/background_img/anopinkieli.jpg'
import murattiImage from '../assets/background_img/muratti.jpg'
import palmuvehkaImage from '../assets/background_img/palmuvehka.jpg'
import placeholderImage from "../assets/background_img/palmuvehka.jpg";

// selecting which image to return based on param from Search.js
export default function SetBackgroundImg(plant) {
    switch (plant) {
        case 'Jukkapalmu':
        return jukkapalmuImage;
        case 'Kaktus':
        return kaktusImage;
        case 'Aloe Vera':
        return aloeveraImage;
        case 'Avokado':
        return avocadoImage;
        case 'Basilika':
        return basilikaImage;
        case 'Korianteri':
        return korianteriImage;
        case 'Peikonlehti':
        return peikonlehtiImage;
        case 'Anopinkieli':
        return anopinkieliImage;
        case 'Varjomuratti':
        return murattiImage;
        case 'Palmuvehka':
        return palmuvehkaImage;
        default:
        return placeholderImage;
        
    }
};

