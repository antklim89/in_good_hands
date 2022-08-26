import { Ad } from '@in-good-hands/server/src/swagger';


export interface UpdateAdProps {
     ad: Ad.UpdateData.ResponseBody;
}

export interface UpdateAdImageProps {
     image: UpdateAdProps['ad']['images'][number]
}
