import { Ad } from '~/fastify/src/swagger';


export interface UpdateAdProps {
     type?: 'create'|'update';
     ad: Ad.UpdateData.ResponseBody;
}

// export interface UpdateAdImagesProps {
//      images: UpdateAdProps['images']
//      id: UpdateAdProps['id']
// }

// export type UpdateAdImageProps = UpdateAdImagesProps['images']['data'][0] & {
//      setUploadedImages: Dispatch<SetStateAction<UpdateAdProps['images']['data']>>
// }
