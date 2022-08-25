import { Ad } from '@in-good-hands/server/src/swagger';


export interface AdsListProps {
     ads: Ad.PreviewList.ResponseBody
}

export type AdsListItemProps = Ad.PreviewList.ResponseBody[number]
