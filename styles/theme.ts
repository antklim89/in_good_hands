import { extendTheme } from '@chakra-ui/react';


export default extendTheme({
    colors: {
        primary: {
            50: 'hsl(34, 100%, 94%)',
            100: 'hsl(34, 100%, 92%)',
            200: 'hsl(34, 100%, 90%)',
            300: 'hsl(34, 100%, 85%)',
            400: 'hsl(34, 100%, 80%)',
            500: 'hsl(34, 100%, 75%)',
            600: 'hsl(34, 100%, 71%)',
            700: 'hsl(34, 100%, 65%)',
            800: 'hsl(34, 100%, 60%)',
            900: 'hsl(34, 100%, 55%)',
            text: 'black',
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
            p: {
                overflowWrap: 'break-word',
                pb: 6,
                lineHeight: 1.5,
                color: '#333',
            },
        },
    },
});
