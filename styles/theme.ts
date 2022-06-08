import { extendTheme } from '@chakra-ui/react';


export default extendTheme({
    colors: {
        primary: {
            50: 'hsl(34, 100%, 60%)',
            100: 'hsl(34, 100%, 55%)',
            200: 'hsl(34, 100%, 50%)',
            300: 'hsl(34, 100%, 45%)',
            400: 'hsl(34, 100%, 40%)',
            500: 'hsl(34, 100%, 35%)',
            600: 'hsl(34, 100%, 30%)',
            700: 'hsl(34, 100%, 25%)',
            800: 'hsl(34, 100%, 20%)',
            900: 'hsl(34, 100%, 15%)',
            text: 'hsl(34, 100%, 15%)',
            textLight: 'white',
        },
        secondary: {
            50: 'hsl(34, 100%, 60%)',
            100: 'hsl(34, 100%, 64%)',
            200: 'hsl(34, 100%, 68%)',
            300: 'hsl(34, 100%, 72%)',
            400: 'hsl(34, 100%, 76%)',
            500: 'hsl(34, 100%, 82%)',
            600: 'hsl(176, 63%, 87%)',
            700: 'hsl(34, 100%, 85%)',
            800: 'hsl(34, 100%, 82%)',
            900: 'hsl(34, 100%, 80%)',
            text: 'black',
            textLight: 'white',
        },
    },
    styles: {
        global: {
            'p': {
                overflowWrap: 'break-word',
                pb: 6,
                lineHeight: 1.5,
                color: 'primary.text',
            },
            '*': { color: 'primary.text' },
            'h1, h2, h3, h4, h5, h6': { color: 'primary.text' },
        },
    },
});
