import { CheckCircleIcon, DeleteIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import { IconButton, Td, Text, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { MyAdsListItemProps } from './MyAdsList.types';

import ConfirmDialog from '~/components/ConfirmDialog';


const MyAdsListItem: FC<MyAdsListItemProps> = ({ id, breed, name, type, isPublished }) => {
    return (
        <Tr>
            <Td>
                <Text textTransform="uppercase">{type}</Text>
            </Td>
            <Td>
                <Text textTransform="uppercase">{breed}</Text>
            </Td>
            <Td>
                <Text textTransform="uppercase">{name}</Text>
            </Td>
            <Td>{isPublished ? <CheckCircleIcon color="green.500" /> : <CheckCircleIcon />}</Td>
            <Td>
                <Link href={`/ads/${id}`}>
                    <IconButton
                        aria-label="Show Ad"
                        icon={<LinkIcon />}
                        variant="link"
                    />
                </Link>
                <Link href={`/ads/update/${id}`}>
                    <IconButton
                        aria-label="Show Ad"
                        icon={<EditIcon />}
                        variant="link"
                    />
                </Link>
                <ConfirmDialog
                    renderButton={(toggle) => (
                        <IconButton
                            aria-label="Delete Ad"
                            icon={<DeleteIcon color="red" />}
                            variant="link"
                            onClick={toggle}
                        />
                    )}
                    onConfirm={async () => { /* */ }}
                />
            </Td>
        </Tr>
    );
};

export default MyAdsListItem;
