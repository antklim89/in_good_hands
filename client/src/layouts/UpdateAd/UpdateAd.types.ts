import { IconButtonProps } from '@chakra-ui/react';
import { Ad } from '@in-good-hands/server/src/swagger';
import { Dispatch, SetStateAction } from 'react';


export interface UpdateAdProps {
     ad: Ad.FindUpdateData.ResponseBody;
}

export interface UpdateAdImageProps extends Omit<IconButtonProps, 'aria-label'> {
     image: UpdateAdProps['ad']['images'][number]
     setUploadedImages: Dispatch<SetStateAction<UpdateAdProps['ad']['images']>>
}
