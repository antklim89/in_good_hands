import {
    Box, Button, Container, Flex, Text, useColorModeValue,
} from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@in-good-hands/share/constants';
import { Ad } from '@in-good-hands/share/swagger';
import Image from 'next/image';
import { FC } from 'react';
import { FaTelegramPlane, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import AdMenu from '~/components/features/AdMenu';
import FavoriteButton from '~/components/features/FavoriteButton';
import PetAge from '~/components/features/PetAge';
import Price from '~/components/helpers/Price';
import Carousel from '~/components/ui/Carousel';
import { getApiURL } from '~/utils';


const Ad: FC<Ad.FindOne.ResponseBody> = ({
    id, name, breed, type, description, birthday, images, price, tel, email, telegram, whatsapp, inFavorites, owner,
}) => {
    const descriptionBg = useColorModeValue('primary.50', 'primary.900');

    return (
        <Container as="section" my={8}>
            <Flex alignItems="center" justifyContent="space-between" my={4}>
                <FavoriteButton adId={id} inFavorites={inFavorites} mx={4} />
                <AdMenu adId={id} ownerId={owner.id} />
            </Flex>
            <Flex flexDir={['column-reverse', null, 'row']} mb={4}>
                <Box
                    alignItems="flex-start" display="flex" flex="1 1 0"
                    flexDirection="column"
                >
                    <Text>Type: <Text as="span" textTransform="capitalize">{type}</Text></Text>
                    <Text>Breed: <Text as="span" textTransform="capitalize">{breed}</Text></Text>
                    {name.length > 0 && <Text>Name: <Text as="span" textTransform="capitalize">{name}</Text></Text>}
                    <Text>Birthday: <PetAge birthday={birthday} /></Text>

                    <Button
                        as="a"
                        href={`mailto:${email}`}
                        mb={4}
                    >
                        <FaEnvelope />&emsp;{email}
                    </Button>

                    <Button
                        as="a"
                        href={`tel:${tel}`}
                        mb={4}
                    >
                        <FaPhoneAlt />&emsp;{tel}
                    </Button>

                    {telegram
                        ? (
                            <Button
                                as="a"
                                href={`https://telegram.me/share/url?url=${telegram}`}
                                mb={4}
                            >
                                <FaTelegramPlane />&emsp;{telegram}
                            </Button>
                        )
                        : null}

                    {whatsapp
                        ? (
                            <Button
                                as="a"
                                href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
                                mb={4}
                            >
                                <FaWhatsapp />&emsp;{whatsapp}
                            </Button>
                        )
                        : null}
                    <Price
                        fontSize="6xl"
                        fontWeight="bold"
                        price={price}
                    />
                </Box>

                <Box flex="1 1 0" sx={{ 'img': { m: '0 auto', width: IMAGE_WIDTH, objectFit: 'cover', aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}` } }}>
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
                                        height={IMAGE_HEIGHT}
                                        key={image.id}
                                        placeholder="blur"
                                        src={getApiURL(image.src)}
                                        width={IMAGE_WIDTH}
                                    />
                                ))}
                            </Carousel>
                        )
                        : (
                            <Image
                                alt={`${type} placeholder`}
                                className="cover"
                                height={IMAGE_HEIGHT}
                                src={`/placeholders/${type}-ph.jpg`}
                                width={IMAGE_WIDTH}
                            />
                        )}
                </Box>
            </Flex>
            <Text
                bgColor={descriptionBg}
                borderRadius={8}
                p={4}
            >
                {description}
            </Text>
        </Container>
    );
};

export default Ad;
