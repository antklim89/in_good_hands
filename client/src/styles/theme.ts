import { extendTheme } from '@chakra-ui/react';


const PRIMARY_LIGHT = 57;
const SECONDARY_LIGHT = 60;

export default extendTheme({
    colors: {
        primary: {
            50: `hsl(206, 80%, ${PRIMARY_LIGHT - 30}%)`,
            100: `hsl(206, 80%, ${PRIMARY_LIGHT - 25}%)`,
            200: `hsl(206, 80%, ${PRIMARY_LIGHT - 20}%)`,
            300: `hsl(206, 80%, ${PRIMARY_LIGHT - 15}%)`,
            400: `hsl(206, 80%, ${PRIMARY_LIGHT - 10}%)`,
            500: `hsl(206, 80%, ${PRIMARY_LIGHT - 5}%)`,
            600: `hsl(206, 80%, ${PRIMARY_LIGHT}%)`,
            700: `hsl(206, 80%, ${PRIMARY_LIGHT + 5}%)`,
            800: `hsl(206, 80%, ${PRIMARY_LIGHT + 10}%)`,
            900: `hsl(206, 80%, ${PRIMARY_LIGHT + 15}%)`,
            text: `hsl(206, 80%, ${PRIMARY_LIGHT - 20}%)`,
            textLight: 'white',
        },
        secondary: {
            50: `hsl(29, 100%, ${SECONDARY_LIGHT - 30}%)`,
            100: `hsl(29, 100%, ${SECONDARY_LIGHT - 25}%)`,
            200: `hsl(29, 100%, ${SECONDARY_LIGHT - 20}%)`,
            300: `hsl(29, 100%, ${SECONDARY_LIGHT - 15}%)`,
            400: `hsl(29, 100%, ${SECONDARY_LIGHT - 10}%)`,
            500: `hsl(29, 100%, ${SECONDARY_LIGHT - 5}%)`,
            600: `hsl(29, 100%, ${SECONDARY_LIGHT}%)`,
            700: `hsl(29, 100%, ${SECONDARY_LIGHT - 5}%)`,
            800: `hsl(29, 100%, ${SECONDARY_LIGHT - 10}%)`,
            900: `hsl(29, 100%, ${SECONDARY_LIGHT - 15}%)`,
            text: 'black',
            textLight: 'white',
        },
    },
    breakpoints: {
        'sm': '30em',
        'md': '44em',
        'lg': '62em',
        'xl': '80em',
        '2xl': '96em',
    },
    styles: {
        global: {
            'p': {
                overflowWrap: 'break-word',
                pb: 6,
                lineHeight: 1.5,
            },
            'h1, h2, h3, h4, h5, h6': { color: 'primary.text' },
        },
    },
    components: {
        Button: {
            baseStyle: { cursor: 'pointer' },
            defaultProps: { colorScheme: 'primary' },
        },
        Container: {
            baseStyle: { maxWidth: 'container.xl' },
        },
        Text: {
            baseStyle: { color: 'primary.50' },
        },
        Heading: {
            baseStyle: { color: 'primary.50' },
        },
    },
});
