const IMAGE_URL = 'https://loremflickr.com/500/500/coffee bean';
const CARD_URL = 'https://random-data-api.com/api/coffee/random_coffee';

interface ResponseJson {
    id: number,
    blend_name: string,
    origin: string,
    variety: string,
    notes: string,
    intensifier: string,
}

export interface CardImage {
    src: string,
    caption: string
}

export interface Card {
    id: number;
    image: CardImage;
    title: string;
    extra: string;
    desc: string;
    tags: string;
}

export async function loadCard(): Promise<Card> {
    const response = await fetch(CARD_URL);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json() as ResponseJson;
    // Disabled browser cache
    const imageUrl = `${IMAGE_URL}?${Date.now()}`;

    return {
        id: data.id,
        title: data.blend_name,
        extra: data.origin,
        desc: data.variety,
        tags: data.notes,
        image: {
            src: imageUrl,
            caption: data.intensifier,
        },
    };
};
