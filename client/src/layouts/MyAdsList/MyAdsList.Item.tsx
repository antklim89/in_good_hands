import { CheckCircleIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import {
    Divider, Flex, HStack, IconButton, Text, Tooltip,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { MyAdsListItemProps } from './MyAdsList.types';


const MyAdsListItem: FC<MyAdsListItemProps> = ({ id, breed, name, type, isPublished }) => {
    return (
        <>
            <HStack flexDir={['column', null, 'row']} py={4}>
                <HStack alignSelf={['flex-start', null, 'center']}>
                    <Flex textTransform="uppercase">
                        <Text px={4} py={0}>{type}</Text>
                        <Text px={4} py={0}>{breed}</Text>
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
                </HStack>
            </HStack>
            <Divider />
        </>
    );
};

export default MyAdsListItem;
