import { IAdsQuery } from '~/generated/graphql';


export interface AdsListProps {
     ads: IAdsQuery['ads']['data']
}

export type AdsListItemProps = IAdsQuery['ads']['data'][0]
