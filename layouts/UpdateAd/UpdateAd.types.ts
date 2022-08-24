import { Ad } from '@in_good_hands/server/src/swagger';


export interface UpdateAdProps {
     ad: Ad.UpdateData.ResponseBody;
}

// export interface UpdateAdImagesProps {
//      images: UpdateAdProps['images']
//      id: UpdateAdProps['id']
// }

// export type UpdateAdImageProps = UpdateAdImagesProps['images']['data'][0] & {
//      setUploadedImages: Dispatch<SetStateAction<UpdateAdProps['images']['data']>>
// }
