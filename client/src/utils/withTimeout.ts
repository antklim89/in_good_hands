import type { ParsedUrlQuery } from 'querystring';

import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';


export function withTimeout<
    P extends {[K in keyof P]: P[K];},
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(callBack: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext<Q, D>): Promise<GetServerSidePropsResult<P>> => {
        let id: NodeJS.Timeout;

        return Promise.race([
            callBack(ctx),
            new Promise<GetServerSidePropsResult<P>>((resolve) => {
                id = setTimeout(() => {
                    resolve({
                        redirect: {
                            destination: ctx.resolvedUrl || '/',
                            permanent: true,
                        },
                    });
                }, 7000);
            }),
        ]).finally(() => {
            if (id) clearTimeout(id);
        });
    };
}
