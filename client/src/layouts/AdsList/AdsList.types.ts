import { Ad } from '@in-good-hands/server/src/swagger';


export interface AdsListProps {
    ads: Ad.FindMany.ResponseBody
}

export type AdsListItemProps = Ad.FindMany.ResponseBody[number]
