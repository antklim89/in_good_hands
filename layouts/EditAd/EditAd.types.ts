

export interface CreateAdProps {
     type?: 'create'|'update';
     initialValues: {
          body: string;
          type: string;
          breed: string;
          name: string;
          price: number,
          tel: string;
          email: string;
          birthday: string;
     }
}
