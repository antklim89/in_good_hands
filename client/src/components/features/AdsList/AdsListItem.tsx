import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/share/constants';
import Link from 'next/link';
import { FC } from 'react';

import { AdsListItemProps } from './AdsList.types';

import AdMenu from '~/components/features/AdMenu';
import FavoriteButton from '~/components/features/FavoriteButton';
import PetAge from '~/components/features/PetAge';
import Price from '~/components/helpers/Price';
import Carousel from '~/components/ui/Carousel';
import Image from '~/components/ui/Image/Image';
import { getApiURL, useAuthContext } from '~/utils';


const SCALE = 2;
const imgWidth = IMAGE_WIDHT / SCALE;
const imgHeight = IMAGE_HEIGHT / SCALE;

const AdsListItem: FC<AdsListItemProps> = ({
    id, type, breed, price, images, birthday, inFavorites, owner,
}) => {
    const { user } = useAuthContext();

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            display="flex"
            overflow="hidden"
            variant="outline"
            width="100%"
        >
            <Box sx={{ '& > *': { width: imgWidth, height: 'imgHeight', objectFit: 'cover' } }}>
                {images.length > 0
                    ? (
                        <Carousel
                            defaultControlsConfig={{ nextButtonText: '>', prevButtonText: '<' }}
                            renderBottomCenterControls={null}
                        >
                            {images.map((image) => (
                                <Image
                                    alt={`${type} ${breed}`}
                                    blurDataURL={image.thumbnail}
                                    height={imgHeight}
                                    key={image.id}
                                    maxW="100%"
                                    objectFit="cover"
                                    placeholder={image.thumbnail.length === 0 ? 'empty' : 'blur'}
                                    src={getApiURL(image.src)}
                                    width={imgWidth}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Image
                            alt={`${type} ${breed}`}
                            height={imgHeight}
                            maxW="100%"
                            objectFit="cover"
                            src={`/placeholders/${type}-ph.jpg`}
                            width={imgWidth}
                        />
                    )}
            </Box>

            <Stack flexBasis="100%">
                <CardBody>
                    <Heading mb={4} size="md">
                        <Text as="span" textTransform="capitalize">{breed}</Text>
                    </Heading>

                    <Text
                        display="flex" flexDir="column" gap={4}
                    >
                        {(owner.id === user?.id) ? <Text>Your ad</Text> : null}
                        <Text
                            as="span"
                            fontSize="xl"
                            mr={4}
                            textTransform="capitalize"
                        >{type}
                        </Text>
                        <PetAge birthday={birthday} />
                        <Price flexGrow={1} fontSize={['2xl', '2xl', '3xl']} price={price} />
                    </Text>
                </CardBody>

                <CardFooter justifyContent="flex-end">
                    <Button as={Link} href={`/ads/${id}`} variant="outline">
                        Show more...
                    </Button>
                </CardFooter>
            </Stack>
            <Stack>
                <AdMenu adId={id} ownerId={owner.id} />
                <FavoriteButton adId={id} inFavorites={inFavorites} />
            </Stack>
        </Card>
    );
};

export default AdsListItem;
