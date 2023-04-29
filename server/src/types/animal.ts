

export const AnimalType = {
    cat: 'cat',
    dog: 'dog',
    bird: 'bird',
    aquarium: 'aquarium',
    rodent: 'rodent',
} as const;

export type AnimalType = typeof AnimalType
