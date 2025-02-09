import { Property } from '@/app/properties/types';
import {
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    VKIcon,
    VKShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

interface IShareButtonsProps {
    property: Property;
}

export default function ShareButtons({ property }: IShareButtonsProps) {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">Поделиться объявлением:</h3>
            <div className="flex gap-3 justify-center pb-5">
                <TelegramShareButton url={shareUrl} title={property.name}>
                    <TelegramIcon size={40} round={true} />
                </TelegramShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={property.name}
                    hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={property.name} separator=" ">
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <VKShareButton url={shareUrl} title={property.name} image={property.images[0]}>
                    <VKIcon size={40} round={true} />
                </VKShareButton>
            </div>
        </>
    );
}
