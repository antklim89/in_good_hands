export const animalsTypes = ['cat', 'dog', 'bird', 'aquarium', 'rodent'] as const;

export const IMAGE_WIDHT = 1024;
export const IMAGE_HEIGHT = 768;


export const UPLOAD_IMAGES_LIMIT = 10;

export const ADS_LIMIT = 10;

export const USER_FORM = {
    password: { minLength: 3, maxLength: 50 },
    email: { minLength: 3, maxLength: 50 },
    name: { minLength: 3, maxLength: 30 },
    tel: { minLength: 3, maxLength: 50 },
    whatsapp: { maxLength: 50 },
    telegram: { maxLength: 50 },
} as const;
