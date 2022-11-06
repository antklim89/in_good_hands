import { CheckCircleIcon, DeleteIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import {
    Divider, Flex, HStack, IconButton, Text, Tooltip,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { MyAdsListItemProps } from './MyAdsList.types';
import { useMyAdsListItem } from './MyAdsList.use';

import ConfirmDialog from '~/components/ConfirmDialog';


const MyAdsListItem: FC<MyAdsListItemProps> = ({ id, breed, name, type, isPublished }) => {
    const { deleting, handleDeleteAd } = useMyAdsListItem(id);

    return (
        <>
            <HStack flexDir={['column', null, 'row']} py={4}>
                <HStack alignSelf={['flex-start', null, 'center']}>
                    <Flex alignItems="center" textTransform="uppercase">
                        <Text px={4} py={0}>{type} <br /> {breed}</Text>
                        <Text px={4} py={0}>{name}</Text>
                    </Flex>
                </HStack>

                <Flex grow={1} />

                <HStack alignSelf="flex-end">
                    <IconButton aria-label={isPublished ? 'Published' : 'Not published'} as="div" variant="link">
                        <Tooltip label={isPublished ? 'Published' : 'Not published'}>
                            {isPublished
                                ? <CheckCircleIcon color="green.500" />
                                : <CheckCircleIcon color="black" />}
                        </Tooltip>
                    </IconButton>

                    <Link href={`/ads/${id}`}>
                        <IconButton
                            aria-label="Show Ad"
                            as="a"
                            icon={<LinkIcon />}
                            variant="link"
                        />
                    </Link>

                    <Link href={`/ads/update/${id}`}>
                        <IconButton
                            aria-label="Show Ad"
                            as="a"
                            icon={<EditIcon />}
                            variant="link"
                        />
                    </Link>

                    <ConfirmDialog
                        isLoading={deleting}
                        message="Are you sure you want to delete this ad?"
                        renderButton={(toggle) => (
                            <IconButton
                                aria-label="Delete Ad"
                                icon={<DeleteIcon color="red" />}
                                variant="link"
                                onClick={toggle}
                            />
                        )}
                        onConfirm={handleDeleteAd}
                    />
                </HStack>
            </HStack>
            <Divider />
        </>
    );
};

export default MyAdsListItem;
