export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const IMAGE_WIDTH = 1024;
export const IMAGE_HEIGHT = 768;


export const UPLOAD_IMAGES_LIMIT = 21;

export const ADS_LIMIT = 10;

export const USER_FORM = {
    password: { minLength: 3, maxLength: 50 },
    email: { minLength: 3, maxLength: 50 },
    name: { minLength: 3, maxLength: 30 },
    tel: { minLength: 3, maxLength: 50 },
    whatsapp: { maxLength: 50 },
    telegram: { maxLength: 50 },
} as const;

export const AD_FORM = {
    name: { maxLength: 100 },
    type: { enum: animalsTypes },
    breed: { minLength: 3, maxLength: 100 },
    description: { minLength: 3, maxLength: 4000 },
    email: { minLength: 3, maxLength: 100 },
    tel: { minLength: 3, maxLength: 100 },
    whatsapp: { maxLength: 50 },
    telegram: { maxLength: 50 },
    price: { minimum: 0, maximum: 99999 },
    birthday: {},
    isPublished: {},
} as const;
