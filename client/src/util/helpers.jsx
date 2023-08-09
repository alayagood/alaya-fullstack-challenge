import { NavBar, NavLinks } from '../Enums/NavBar';

export const getLinkText = (section) => {

    switch (section.pathname) {
        case NavLinks.HOME:
            return NavBar.HOME;
        case NavLinks.NEW_POST:
            return NavBar.NEW_POST;
        case NavLinks.SIGN_UP:
            return NavBar.SIGN_UP;
        case NavLinks.POSTS:
            return NavBar.POSTS;
        default:
            return '';
    }
  };

