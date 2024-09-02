import Image from 'next/image';

import Notifications from '~/app/notifications';
import {
  AutoplayCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/carousels';
import Heading from '~/components/heading';
import MessageCard from '~/components/message-card';
import { getTranslations } from '~/i18n/translations';
import { type notifications } from '~/server/db';

export default async function Home({
  params: { locale },
  searchParams: { notificationCategory = 'academic' },
}: {
  params: { locale: string };
  searchParams: {
    notificationCategory?: (typeof notifications.category.enumValues)[number];
  };
}) {
  const text = (await getTranslations(locale)).Main;

  return (
    <>
      <style>
        {`.header-sticky-ness {
          position: fixed;
        }`}
      </style>

      <AutoplayCarousel autoplayOptions={{ delay: 7000 }}>
        <CarouselContent>
          {[
            {
              image: 'slideshow/image01.jpg',
              title: 'NIT KKR deemed the First Ever NIT With All Green Campus!',
              subtitle:
                'Over 900 Acres of green foliage planted alongside the campus walls, the campus of the esteemed...',
            },
            {
              image: 'slideshow/image02.jpg',
              title:
                'National Institute Ranked Among Top 10 Engineering Colleges',
              subtitle:
                'NIT Kurukshetra has secured a spot in the top 10 engineering colleges in India, showcasing excellence in education and research...',
            },
            {
              image: 'slideshow/image03.jpg',
              title:
                'State-of-the-Art Research Facilities Now Open for Students',
              subtitle:
                'The newly inaugurated research labs and centers at NIT KKR offer cutting-edge technology and resources for students and faculty alike...',
            },
          ].map(({ image, title, subtitle }, index) => (
            <CarouselItem key={index} className="relative max-h-screen">
              <figure className="h-full">
                <Image
                  alt={`slide ${index + 1}`}
                  className="h-full w-full object-cover"
                  height={1080}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  width={1920}
                  src={image}
                />
                {index === 0 && (
                  <article className="absolute inset-x-0 top-[30%] mx-auto text-center drop-shadow-md">
                    <h4 className="text-shade-light">एनआईटी कुरूक्षेत्</h4>
                    <h1 className="text-6xl text-shade-light">
                      NIT Kurukshetra
                    </h1>
                  </article>
                )}

                {title && (
                  <figcaption className="absolute inset-x-0 bottom-0 min-w-full bg-gradient-to-b from-transparent to-neutral-800 py-6">
                    <article className="container">
                      <h4 className="pl-2 text-neutral-100">{title}</h4>
                      <p className="pl-2 text-neutral-100">{subtitle}</p>
                    </article>
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <section className="container absolute inset-0 top-[50%] flex h-0 justify-between">
          <CarouselPrevious className="static text-neutral-100 drop-shadow-2xl" />
          <CarouselNext className="static text-neutral-100 drop-shadow-2xl" />
        </section>
      </AutoplayCarousel>

      <Notifications category={notificationCategory} locale={locale} />

      <section className="container mb-32 mt-10" id="directors-corner">
        <Heading
          glyphDirection="rtl"
          heading="h2"
          href="#directors-corner"
          text={text.director.title}
        />
        <MessageCard
          image="assets/director.jpeg"
          locale={locale}
          name={text.director.name}
          quote={text.director.quote[0]}
          quoteBelow={text.director.quote[1]}
          readMore={{
            text: text.director.more,
            href: `/${locale}/institute/director#message`,
          }}
        />
      </section>
    </>
  );
}
