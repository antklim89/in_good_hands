

declare module '*.gql' {
    import { DocumentNode } from 'graphql';


    declare const SchemaObj: {
        readonly [key: string]: DocumentNode
    } & DocumentNode;

    export default SchemaObj;
}
