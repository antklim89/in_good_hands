import { CheckIcon, CloseIcon,  DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Divider, Flex, HStack, IconButton, Text, Tooltip, Box, LinkBox, useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { MyAdsListItemProps } from './MyAdsList.types';
import { useMyAdsListItem } from './MyAdsListItem.use';

import ConfirmDialog from '~/components/ui/ConfirmDialog';


const MyAdsListItem: FC<MyAdsListItemProps> = ({ id, breed, name, type, isPublished }) => {
    const { deleting, handleDeleteAd } = useMyAdsListItem(id);
    const hoverBg = useColorModeValue('gray.50', 'gray.900');

    return (
        <>
            <LinkBox
                _hover={{ bg: hoverBg }}
                display="flex"
                flexDirection={['column', 'row']}
                py={4}
            >
                <Flex as={Link} href={`/ads/${id}`} w="100%">
                    <Box mr={4}>
                        <Image
                            alt={type}
                            height={32}
                            src={`/placeholders/${type}-ph.jpg`}
                            width={32}
                        />
                    </Box>
                    <Flex flexDirection="column">
                        <Text fontSize="xl" p={0}>{name}</Text>
                        <Text p={0}>{breed}</Text>
                    </Flex>
                </Flex>

                <HStack alignSelf="flex-end">
                    <IconButton
                        aria-label={isPublished ? 'Published' : 'Not published'}
                        variant="outline"
                    >
                        <Tooltip label={isPublished ? 'Published' : 'Not published'}>
                            {isPublished
                                ? <CheckIcon color="green.500" />
                                : <CloseIcon color="grey" />}
                        </Tooltip>
                    </IconButton>

                    <IconButton
                        aria-label="Update Ad"
                        as={Link}
                        href={`/ads/update/${id}`}
                        icon={<EditIcon />}
                        variant="outline"
                    />

                    <ConfirmDialog
                        isLoading={deleting}
                        message="Are you sure you want to delete this ad?"
                        renderButton={(toggle) => (
                            <IconButton
                                aria-label="Delete Ad"
                                icon={<DeleteIcon color="red" />}
                                variant="outline"
                                onClick={toggle}
                            />
                        )}
                        onConfirm={handleDeleteAd}
                    />
                </HStack>
            </LinkBox>
            <Divider />
        </>
    );
};

export default MyAdsListItem;
