import {
    Button, Card, Flex, Heading, Text,
} from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@in-good-hands/share/constants';
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
const imgWidth = IMAGE_WIDTH / SCALE;
const imgHeight = IMAGE_HEIGHT / SCALE;

const AdsListItem: FC<AdsListItemProps> = ({
    id, type, breed, price, images, birthday, inFavorites, owner,
}) => {
    const { user } = useAuthContext();

    return (
        <Card
            direction={{ base: 'column', md: 'row' }}
            display="flex"
            overflow="hidden"
            variant="outline"
        >
            <Flex flex="1 1 0">
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
                                    objectFit="cover"
                                    placeholder={image.thumbnail.length === 0 ? 'empty' : 'blur'}
                                    src={getApiURL(image.src)}
                                    sx={{ width: '100%' }}
                                    width={imgWidth}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Image
                            alt={`${type} ${breed}`}
                            height={imgHeight}
                            objectFit="cover"
                            src={`/placeholders/${type}-ph.jpg`}
                            sx={{ width: '100%' }}
                            width={imgWidth}
                        />
                    )}
            </Flex>

            <Card flex="2 1 0" flexDirection="column" p={2}>
                <Flex justifyContent="space-between">
                    <Flex flexDirection="column">
                        <Heading alignItems="center" fontSize={['xl',  '2xl']} mb={4}>
                            <Text p={0} textTransform="capitalize">{breed}</Text> 
                        </Heading>
    
                        <Text display="flex" flexDir="column" gap={4}>
                            {(owner.id === user?.id) ? <Text>Your ad</Text> : null}
                            <Text as="span" textTransform="capitalize">{type}</Text>
                            <PetAge birthday={birthday} />
                            <Price flexGrow={1} fontSize={['2xl', '2xl', '3xl']} price={price} />
                        </Text>
                    </Flex>
                    <Flex align="flex-end" flexDirection="column">
                        <AdMenu adId={id} ownerId={owner.id} />
                        <FavoriteButton adId={id} inFavorites={inFavorites} />
                    </Flex>
                </Flex>
                <Button
                    as={Link} 
                    href={`/ads/${id}`} 
                    mt="auto"
                    variant="outline"
                >
                    Show more...
                </Button>
            </Card>
        </Card>
    );
};

export default AdsListItem;
