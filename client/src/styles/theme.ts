import { extendTheme } from '@chakra-ui/react';


export default extendTheme({
    colors: {
        primary: {
            50: '#E8F4FC',
            100: '#BFDFF8',
            200: '#95CBF3',
            300: '#6CB6EF',
            400: '#43A1EA',
            500: '#1A8DE5',
            600: '#1471B8',
            700: '#0F558A',
            800: '#0A385C',
            900: '#051C2E',
        },
        secondary: {
            50: '#FFF2E5',
            100: '#FFDAB8',
            200: '#FFC38A',
            300: '#FFAB5C',
            400: '#FF932E',
            500: '#FF7C00',
            600: '#CC6300',
            700: '#994A00',
            800: '#663200',
            900: '#331900',
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
            baseStyle: { color: 'primary.800' },
        },
        Heading: {
            baseStyle: { color: 'primary.800' },
        },
    },
});
