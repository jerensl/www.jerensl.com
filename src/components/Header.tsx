import clsx from 'clsx'
import Image from 'next/image'
import { InView } from 'react-intersection-observer'
import { Grid } from './Grid'
import { imageLoader } from '../constant/images'
import { StandardLink } from './links/StandardLink'

export const Header = ({
    blurDataURL,
}: {
    blurDataURL: string
}): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className={clsx('pt-20', inView && 'fade-in-start')}
                >
                    <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                        <Image
                            data-fade="1"
                            src="illustration-landing-page.png"
                            loader={imageLoader}
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            alt="A man looking to a beautiful river and mountain"
                            quality="80"
                            width="1080"
                            height="720"
                        />
                    </div>
                    <div className="col-span-full items-center grid gap-10 pt-10 lg:gap-5 lg:pt-0 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-sm m-auto text-center">
                        <div className="flex flex-auto flex-col gap-6 items-start">
                            <div
                                className="flex self-center flex-auto flex-col gap-1"
                                data-fade="0"
                            >
                                <h1 className="font-bold text-4xl md:text-5xl">
                                    Jerens Lensun
                                </h1>
                                <p className="font-medium text-3xl md:text-4xl">
                                    Software Engineer
                                </p>
                            </div>
                            <div
                                className="flex self-center flex-col gap-2"
                                data-fade="2"
                            >
                                <StandardLink
                                    className="rounded-md text-white bg-red-600 font-semibold text-xl hover:bg-red-500 w-36 py-2"
                                    href="/blog"
                                >
                                    Read Articles
                                </StandardLink>
                                <StandardLink
                                    className="rounded-md bg-gray-200 dark:bg-neutral-700 font-semibold text-xl hover:bg-gray-300 dark:hover:bg-neutral-600 w-36 py-2"
                                    href="/about"
                                >
                                    About Me
                                </StandardLink>
                            </div>
                        </div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
