import { IAdEdit } from '~/types';


export interface EditAdProps {
     type?: 'create'|'update';
     id: string;
     images: string[]
     initialValues: Omit<IAdEdit, 'id'| 'images'>
}
