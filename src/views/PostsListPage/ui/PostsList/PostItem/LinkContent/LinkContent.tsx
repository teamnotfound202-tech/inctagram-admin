'use client'

import s from './LinkContent.module.scss'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import {MouseEvent, useRef, useState} from 'react'
import ArrowLeftIcon from '@/shared/assets/icons/arrowLeft.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrowRight.svg'
import {clsx} from 'clsx'
import { Post } from '@/shared/graphql/__generated__/graphql'

// Создаем отдельный компонент для содержимого ссылки
export function LinkContent({post, isTrim}: { post: Post, isTrim?: string }) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = post.images?.length ? currentIndex === post.images.length - 1 : false;

    const imageClassName = clsx(s.postImage, {
        [s.trimPostImage]: isTrim === 'Show less'
    })

    const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        swiperRef.current?.slidePrev();
        setCurrentIndex(prevState => prevState - 1);
    };

    const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        swiperRef.current?.slideNext();
        setCurrentIndex(prevState => prevState + 1);
    };

  if (!post.images || post.images?.length === 0) return <div className={s.imgIcon}>Not image</div>


    return (
        <>
            {post.images.length > 1 ? (
                <Swiper
                    className={s.postSlider}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                >
                    {post.images.map((image, index) => {

                      return (
                        <SwiperSlide key={image.url} className={s.postSlide}>
                          <Image
                            src={image.url ?? ''}
                            className={imageClassName}
                            alt={'post image'}
                            width={224}
                            height={228}
                            priority={index <= 7}
                            style={{height: 'auto'}}
                          />
                        </SwiperSlide>
                      )
                    })}
                    <button
                        className={`${s.navigationButton} ${s.navigationButtonPrev}`}
                        onClick={handlePrevClick}
                        disabled={isPrevDisabled}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    <button
                        className={`${s.navigationButton} ${s.navigationButtonNext}`}
                        onClick={handleNextClick}
                        disabled={isNextDisabled}
                    >
                        <ArrowRightIcon/>
                    </button>
                </Swiper>
            ) : (post.images[0] &&
                <Image
                    src={post.images[0]?.url ?? ''}
                    className={imageClassName}
                    alt={'post image'}
                    width={224}
                    height={228}
                    style={{height: 'auto'}}
                    priority
                />
            )}
        </>
    );
}