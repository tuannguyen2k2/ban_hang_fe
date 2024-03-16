import dayjs from 'dayjs';

export const DEFAULT_PAGE_SIZE = 16;

export const DEFAULT_FORMAT_TIME = 'DD/MM/YYYY HH:mm:ss';

export const formSize = {
    small: '700px',
    normal: '800px',
    big: '900px',
};

export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};

export const apiUrl = import.meta.env.VITE_API;

export const CURRENCY_UNIT = '₫';

export const currencyPositions = {
    FRONT: 0,
    BACK: 1,
};

export const appName = 'cms-ban-hang';

export const storageKeys = {
    USER_ROLE: `${appName}-user-role`,
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
    NAV_MENU: `nav-menu`,
};

export const loadingType = {
    REDUX: 'REDUX',
    APP: 'APP',
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: false,
    REQUIRE_LOGIN: true,
    BOTH: null,
};

export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

export const CART_EXPIRATION_DATE = dayjs(dayjs().add(3, 'day')).valueOf();
