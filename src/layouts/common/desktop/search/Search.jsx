import { Flex, Input } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import locales from '../../../../locales';
import styles from './Search.module.scss';
import useFetch from '../../../../hooks/useFetch';
import apiConfig from '../../../../constants/apiConfig';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDeBounce';
import ItemSearch from './ItemSearch';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [searchResult, setSearchResult] = useState([]);
    const { execute, loading } = useFetch(apiConfig.product.getList);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        execute({
            params: {
                name: debouncedValue,
            },
            onCompleted: (response) => {
                setSearchResult(response?.data?.content);
            },
        });
    }, [debouncedValue]);
    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };
    return (
        <HeadlessTippy
            onClickOutside={handleHideResult}
            interactive
            visible={showResult}
            offset={[0, 10]}
            render={(attrs) => (
                <Flex vertical className={styles.wrapper}>
                    {searchResult?.map((item) => (
                        <ItemSearch data={item} key={item.id} />
                    ))}
                </Flex>
            )}
        >
            <Flex align='center' className={styles.search} placeholder={locales.searchProductPlaceHolder}>
                <Flex align='center' className={styles.searchIcon}>
                    <IoSearchOutline size={24} />
                </Flex>
                <Input
                    type='text'
                    className={styles.inputSearch}
                    placeholder={locales.searchProductPlaceHolder}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
            </Flex>
        </HeadlessTippy>
    );
};

export default Search;
