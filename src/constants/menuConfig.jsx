import { BsFillPeopleFill } from 'react-icons/bs';
import { GiClothes, GiStabbedNote } from 'react-icons/gi';
import { SiGoogleanalytics } from 'react-icons/si';
import locales from '../locales';
const navMenuConfig = [
    {
        label: locales.home,
        key: locales.home,
        path: '/',
    },
    {
        label: locales.product,
        key: locales.product,
        path: '/product',
    },
    {
        label: locales.store,
        key: locales.store,
    },
    {
        label: locales.introduction,
        key: locales.introduction,
    },
];

export default navMenuConfig;
