import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/server/src/shareConstants';
import { Ad } from '@in-good-hands/server/src/swagger';
import Image from 'next/image';
import { FC } from 'react';
import { FaTelegramPlane, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import Carousel from '~/components/Carousel';
import FavoriteButton from '~/components/FavoriteButton';
import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const Ad: FC<Ad.FindOne.ResponseBody> = ({
    id, name, breed, type, description, birthday, images, price, tel, email, telegram, whatsapp, inFavorites,
}) => {
    return (
        <Container as="section" my={8}>
            <Flex justifyContent="flex-end" my={4}>
                <FavoriteButton adId={id} inFavorites={inFavorites} mx={4} />
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
                        color="primary.50"
                        fontSize="6xl"
                        fontWeight="bold"
                        price={price}
                    />
                </Box>

                <Box flex="1 1 0" sx={{ 'img': { width: IMAGE_WIDHT, objectFit: 'cover', aspectRatio: `${IMAGE_WIDHT} / ${IMAGE_HEIGHT}` } }}>
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
                                        width={IMAGE_WIDHT}
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
                                width={IMAGE_WIDHT}
                            />
                        )}
                </Box>
            </Flex>
            <Text bgColor="gray.100" borderRadius={8} p={4}>
                {description}
            </Text>
        </Container>
    );
};

export default Ad;
