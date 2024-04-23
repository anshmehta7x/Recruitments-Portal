import React, { useState, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./carouselarrowbuttons";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  questionNo: React.Dispatch<React.SetStateAction<string>>;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalSlides = slides.length;

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    props.questionNo(slides[0]);
    const onSelect = () => {
      if (emblaApi) {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      }
    };
    if (emblaApi) {
      emblaApi.on("select", onSelect);
    }
    return () => {
      if (emblaApi) {
        emblaApi.off("select", onSelect);
      }
    };
  }, [emblaApi, slides]);

  const handlePrevButtonClick = () => {
    onPrevButtonClick();
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextButtonClick = () => {
    onNextButtonClick();
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  useEffect(() => {
    props.questionNo(slides[currentIndex - 1]);
  }, [currentIndex]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <PrevButton
          onClick={handlePrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <span>
          {currentIndex}/{totalSlides}
        </span>
        <NextButton
          onClick={handleNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
