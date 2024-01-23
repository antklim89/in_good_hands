import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/share/constants';
import { FC } from 'react';

import { ALL, usePetTypeSelect } from './PetTypeSelect.use';

import Image from '~/components/ui/Image/Image';


const PetTypeSelect: FC<BoxProps> = (props) => {
    const { router, handleChange } = usePetTypeSelect();

    return (
        <Box
            display="flex"
            gap={[0, 1, 2, 4]}
            justifyContent="center"
            {...props}
        >
            <IconButton
                aria-label={`select ${ALL}`}
                colorScheme={router.query.type === undefined ? 'secondary' : 'primary'}
                h={32}
                icon={(
                    <Image
                        alt={ALL}
                        height={256}
                        src="/placeholders/pets.png"
                        sx={{ width: 28, height: 28 }}
                        width={256}
                    />
                )}
                name={ALL}
                variant="outline"
                w={32}
                onClick={handleChange}
            />
            {animalsTypes.map((type) => (
                <IconButton
                    aria-label={`select ${type}`}
                    colorScheme={router.query.type === type ? 'secondary' : 'primary'}
                    h={32}
                    icon={(
                        <Image
                            alt={type}
                            height={256}
                            src={`/placeholders/${type}-ph.jpg`}
                            sx={{ width: 28, height: 28 }}
                            width={256}
                        />
                    )}
                    key={type}
                    name={type}
                    variant="outline"
                    w={32}
                    onClick={handleChange}
                />
            ))}

        </Box>
    );
};

export default PetTypeSelect;


