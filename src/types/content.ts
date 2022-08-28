export type Document = Config | Page ;
export type DocumentTypeNames =
    | 'Config'
    | 'Page';

export type Section =
    | CardsSection
    | HeroSection;

/** Document types */
export type Config = {
    __id: string;
    __url: null;
    type: 'Config';
    favicon?: string;
    header?: Header;
    footer?: Footer;
};

export type Page = {
    __id: string;
    __url: string;
    _type: 'Page';
    title: string;
    sections?: Section[];
    body?: string;
};

/** Nested types */
export type Button = {
    _type: 'Button';
    label: string;
    url: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary';
};

export type Card = {
    _type: 'Card';
    title?: string;
    text?: string;
    image?: Image;
    actions?: Button[];
};

export type CardsSection = {
    _type: 'CardsSection';
    title?: string;
    subtitle?: string;
    items?: Card[];
};

export type Footer = {
    _type: 'Footer';
    copyrightText?: string;
    navLinks?: Link[];
};

export type Header = {
    _type: 'Header';
    title?: string;
    navLinks?: Link[];
};

export type HeroSection = {
    _type: 'HeroSection';
    title?: string;
    subtitle?: string;
    text?: string;
    actions?: Button[];
    image?: Image;
};

export type Image = {
    _type: 'Image';
    url?: string;
    altText?: string;
};

export type Link = {
    _type: 'Link';
    label: string;
    url: string;
    underline?: 'always' | 'hover' | 'none';
    color?: 'inherit' | 'primary' | 'secondary';
};
