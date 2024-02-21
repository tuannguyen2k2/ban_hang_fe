import { Flex, Input } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import locales from '@locales';
import styles from './Search.module.scss';

const Search = () => {
    return (
        <Flex align='center' className={styles.search} placeholder={locales.searchProductPlaceHolder}>
            <Flex align='center' className={styles.searchIcon}>
                <IoSearchOutline size={24} />
            </Flex>
            <Input type='text' className={styles.inputSearch} placeholder={locales.searchProductPlaceHolder} />
        </Flex>
    );
};

export default Search;
