"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay } from "swiper/modules";

import { Cinema } from "@/types/Cinema";
import { Film } from "@/types/Film";
import formatDate from "@/utils/format-date";
import { useEffect, useMemo, useState } from "react";
import ScheduleItem from "../ScheduleItem";
import WeekDayTabs from "../WeekDayTabs";
import { format, isAfter, isSameDay } from "date-fns";
import {
  RiPlayCircleFill,
  RiPlayCircleLine,
  RiStarFill,
  RiTicket2Line,
} from "react-icons/ri";
import TrailerModal from "../TrailerModal";
import getSchedules from "@/services/getSchedules";
import { Button, Dropdown, Modal, Rating, Spinner } from "flowbite-react";
import MovieCard from "../MovieCard";
import { vi } from "date-fns/locale";
import createDays from "@/utils/create-weekdays";
import Image from "next/image";
import Link from "next/link";
import getFilms from "@/services/getFilms";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import addRating from "@/services/addRating";

export default function MovieInfo({
  film,
  cinemas,
  schedules,
}: {
  film: Film;
  cinemas: Cinema[];
  schedules: any;
}) {
  const [selectedCinemaId, setSelectedCinemaId] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [city, setCity] = useState("Toàn quốc");
  const [openVoteModal, setOpenVoteModal] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const days = createDays();

  const availableSchedules = useMemo(() => {
    const schedulesByCinema: any[] = [];

    Object.keys(schedules).forEach((k1) => {
      if (city === "Toàn quốc" || city === k1.trim()) {
        Object.keys(schedules[k1]).forEach((k2) => {
          if (selectedCinemaId === -1 || selectedCinemaId === Number(k2)) {
            const canBookSchedules = schedules[k1][k2].filter((s: any) => {
              return (
                isSameDay(new Date(s.startTime), selectedDate) &&
                isAfter(new Date(s.startTime), new Date())
              );
            });
            schedulesByCinema.push({
              id: k2,
              name: cinemas.find((c) => c.id === Number(k2))?.name || "",
              schedules: canBookSchedules,
            });
          }
        });
      }
    });

    return schedulesByCinema;
  }, [cinemas, selectedDate, schedules, city, selectedCinemaId]);

  const cities =
    cinemas && cinemas.length > 0
      ? [
          "Toàn quốc",
          ...Array.from(new Set(cinemas.map((cinema) => cinema.city.trim()))),
        ]
      : ["Toàn quốc"];

  const filterCinema = cinemas.filter((cinema) => {
    return city === "Toàn quốc" || cinema.city === city;
  });
  const selectedCinema = useMemo(() => {
    return cinemas.find((c) => c.id === selectedCinemaId);
  }, [selectedCinemaId, cinemas]);

  const getCinemaName = () => {
    if (selectedCinemaId === -1) return "Tất cả rạp";
    return cinemas.find((c) => c.id === selectedCinemaId)?.name;
  };

  const onConfirmAddRating = async () => {
    try {
      await addRating({ filmId: film.id, score: rating });
    } catch (error) {
      console.log(error);
    }

    setOpenVoteModal(false);
  };

  const onOpenVoteModal = () => {
    if (!storage.get("logged_in")) {
      // console.log(window.location.pathname);
      router.push("/login");
      return;
    }

    setOpenVoteModal(true);
  };
  return (
    <div>
      <MovieBanner film={film} />

      <div className="max-w-7xl m-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-9">
            <div className=" ml-5 movie__info relative md:grid hidden grid-cols-3 md:gap-5 gap-3 lg:items-end ">
              <div className="movie__thumbnail lg:-translate-y-20 md:-translate-y-16 -translate-y-0 col-span-1 drop-shadow-2xl z-[500]">
                <img
                  loading="lazy"
                  width="220"
                  height="280"
                  decoding="async"
                  data-nimg="1"
                  className="border-2 rounded border-white lg:w-[320px] lg:h-[400px] w-full h-full object-fill object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)"
                  src={film.image[0]}
                  style={{ color: "transparent" }}
                />
              </div>

              <div className="col-span-2 lg:-translate-y-20 flex flex-col justify-end md:-translate-y-16 -translate-y-0">
                <div className="item__title flex items-center">
                  <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                    {film.name}
                  </h1>
                  <span className="inline-flex items-center justify-center w-[38px] h-7 bg-primary rounded text-sm text-center text-white font-bold not-italic">
                    T18
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="text-sm flex items-center font-semibold not-italic">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="inline-block align-baseline mr-1"
                    >
                      <path
                        d="M7 0C3.13306 0 0 3.13306 0 7C0 10.8669 3.13306 14 7 14C10.8669 14 14 10.8669 14 7C14 3.13306 10.8669 0 7 0ZM7 12.6452C3.88105 12.6452 1.35484 10.119 1.35484 7C1.35484 3.88105 3.88105 1.35484 7 1.35484C10.119 1.35484 12.6452 3.88105 12.6452 7C12.6452 10.119 10.119 12.6452 7 12.6452ZM8.74435 9.69839L6.34798 7.95685C6.26048 7.89193 6.20968 7.79032 6.20968 7.68306V3.04839C6.20968 2.8621 6.3621 2.70968 6.54839 2.70968H7.45161C7.6379 2.70968 7.79032 2.8621 7.79032 3.04839V7.04798L9.67581 8.41976C9.82823 8.52984 9.85927 8.74153 9.74919 8.89395L9.21855 9.625C9.10847 9.7746 8.89677 9.80847 8.74435 9.69839Z"
                        fill="#F58020"
                      ></path>
                    </svg>
                    <span>{film.duration} Phút</span>
                  </div>
                  <div className="text-sm ml-4 flex items-center font-semibold not-italic">
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      className="inline-block align-baseline mr-1"
                    >
                      <path
                        d="M10.7143 1.75H9.42857V0.328125C9.42857 0.147656 9.28393 0 9.10714 0H8.03571C7.85893 0 7.71429 0.147656 7.71429 0.328125V1.75H4.28571V0.328125C4.28571 0.147656 4.14107 0 3.96429 0H2.89286C2.71607 0 2.57143 0.147656 2.57143 0.328125V1.75H1.28571C0.575893 1.75 0 2.33789 0 3.0625V12.6875C0 13.4121 0.575893 14 1.28571 14H10.7143C11.4241 14 12 13.4121 12 12.6875V3.0625C12 2.33789 11.4241 1.75 10.7143 1.75ZM10.5536 12.6875H1.44643C1.35804 12.6875 1.28571 12.6137 1.28571 12.5234V4.375H10.7143V12.5234C10.7143 12.6137 10.642 12.6875 10.5536 12.6875Z"
                        fill="#F58020"
                      ></path>
                    </svg>
                    <span>
                      {format(new Date(film.startDate), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                <div
                  onClick={onOpenVoteModal}
                  role="button"
                  className="mt-4 flex items-center gap-3 group"
                >
                  <div>
                    <span>
                      <RiStarFill className="text-primary text-2xl" />
                    </span>
                  </div>
                  <div className="text-sm group-hover:text-primary duration-200">
                    {film.score ? film.score : "Chưa có đánh giá"}
                  </div>
                </div>
                <Modal
                  dismissible
                  className="z-[500]"
                  show={openVoteModal}
                  size={"sm"}
                  onClose={() => setOpenVoteModal(false)}
                >
                  <Modal.Body className="p-0">
                    <div className="generic__modal-wrapper z-[500]">
                      <div className="mb-2 text-center">
                        <img
                          className="w-full h-[200px]  block object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0"
                          src={film.image[0]}
                          style={{ color: "transparent" }}
                        />
                        <h1 className="text-lg mt-2 font-bold">{film.name}</h1>
                        <p className="text-base mt-2 font-bold text-red"></p>
                      </div>
                      <div className="mx-auto w-[113px] h-[113px] rounded-full border border-primary flex justify-center flex-col items-center col-span-1 mt-5">
                        <div className="text-[20px] text-center">
                          <span className=" mr-1 flex items-center gap-2">
                            <span className="">
                              <RiStarFill className="text-primary text-2xl" />
                            </span>
                            {film.score ? film.score : 0}
                          </span>
                          <span className="inline-block text-[12px] text-[#777777]">
                            {0} đánh giá
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center mt-4">
                        <Rating>
                          {new Array(10).fill(0).map((s, index) => {
                            return (
                              <Rating.Star
                                role="button"
                                key={index + 1}
                                onClick={() => setRating(index + 1)}
                                filled={index + 1 <= rating}
                              />
                            );
                          })}
                        </Rating>
                      </div>
                      <div className="">
                        <div className="star-rating transition-all duration-300 ease-in-out block">
                          <div className="mt-5 pt-5 flex">
                            <button
                              onClick={() => {
                                setOpenVoteModal(false);
                              }}
                              className="block   text-sm px-[14px] py-[7px] border-primary bg-gray-100 text-black-10 capitalize cursor-pointer transition duration-500 ease-in-out flex-1 z-[10000]"
                            >
                              Đóng
                            </button>
                            <button
                              onClick={onConfirmAddRating}
                              disabled={rating === 0}
                              className="block text-sm px-[14px] py-[7px] border border-primary bg-primary text-white capitalize cursor-pointer transition duration-500 ease-in-out flex-1 disabled:opacity-50"
                            >
                              Xác nhận
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </Modal.Body>
                </Modal>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-nowrap text-sm">
                    <span className="inline-block h-8 py-[6px] text-grey-40">
                      Quốc gia:
                    </span>
                    <span className="inline-block h-8 ml-4 py-[6px] capitalize not-italic">
                      {film.country}
                    </span>
                  </div>
                  <div className="flex flex-nowrap items-center text-sm">
                    <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                      Nhà sản xuất:
                    </span>
                    <span className="inline-block h-8 ml-4 py-[6px] not-italic mr-2 text-grey-40">
                      {film.producer}
                    </span>
                  </div>
                  <div className="flex flex-nowrap items-center text-sm">
                    <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                      Thể loại:
                    </span>
                    <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                      <li className="inline-block">
                        <span className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                          {film.category}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-nowrap items-center text-sm">
                    <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                      Đạo diễn:
                    </span>
                    <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                      <li className="inline-block">
                        <span className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                          {film.director}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-nowrap items-center text-sm mt-2">
                    <div className="text-grey-40 w-[70px] flex-0">
                      Diễn viên:
                    </div>
                    <div className="text-black">{film.actor}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="movie__content mt-3 lg:mt-0 mx-5">
              <span className="border-l-4 border-solid border-primary mr-2"></span>
              <h1 className="mb-4 text-base inline-block capitalize font-bold">
                Nội dung phim
              </h1>
              <div className="text-black-10 text-sm font-normal not-italic content-text content__data">
                <p className="text-justify">
                  <span
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    <span
                      style={{ fontStyle: "normal", textDecoration: "none" }}
                    >
                      {film.description}{" "}
                    </span>
                  </span>
                </p>
              </div>
            </div>

            {/* Schedules */}
            <div className="mx-5">
              <div className=" mt-8 lg:mt-8">
                <span className="border-l-4 border-solid border-primary mr-2"></span>
                <h1 className="mb-4 text-base inline-block capitalize font-bold">
                  Lịch chiếu
                </h1>
              </div>

              <div className="movie__filter grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-12 items-center">
                <div className="filter__date order-2 sm:order-1 sm:col-span-3 md:col-span-3 xl:col-span-7 lg:col-span-3 px-7 mt-6 md:mt-0">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={false}
                    className="h-full relative"
                    slidesPerView={5}
                  >
                    {days.map((d) => {
                      return (
                        <SwiperSlide
                          onClick={() => setSelectedDate(d.value)}
                          key={d.title}
                        >
                          <div
                            className=""
                            aria-hidden="false"
                            style={{ outline: "none" }}
                          >
                            <div>
                              <div
                                className="mx-2"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <span
                                  className={`flex flex-wrap items-center capitalize text-center text-xs w-[80px] h-[65px] rounded-[5px] py-2 cursor-pointer
                                      ${
                                        isSameDay(d.value, selectedDate)
                                          ? "bg-blue-700 text-white"
                                          : "text-black hover:bg-blue-100"
                                      }   `}
                                >
                                  <span className="inline-block w-full">
                                    {d.title}
                                  </span>
                                  <span className="inline-block w-full">
                                    {format(d.value, "dd/MM")}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                <div className="filter__location order-1 sm:order-2 sm:col-span-3 md:col-span-3 xl:col-span-5 lg:col-span-2 flex ml-2 gap-4">
                  <div className="col-span-1">
                    <Dropdown label={city}>
                      {cities.map((c) => {
                        return (
                          <Dropdown.Item key={c} onClick={() => setCity(c)}>
                            {c}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown>
                  </div>
                  <Dropdown label={getCinemaName()}>
                    <Dropdown.Item onClick={() => setSelectedCinemaId(-1)}>
                      Tất cả rạp
                    </Dropdown.Item>

                    {filterCinema.map((c) => {
                      return (
                        <Dropdown.Item
                          key={c.id}
                          onClick={() => setSelectedCinemaId(c.id)}
                        >
                          {c.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="mt-10">
              {availableSchedules.map((cinema) => {
                return (
                  <SchedulesByCinema
                    cinema={cinema}
                    key={cinema.id}
                    filmId={film.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-3 p-6">
            <RecommendedFilms
              cinema={cinemas.find((c) => c.id === selectedCinemaId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SchedulesByCinema = ({
  cinema,
  filmId,
}: {
  cinema: any;
  filmId: number;
}) => {
  const router = useRouter();
  const onClickSchedule = (id: number) => {
    if (!storage.get("logged_in")) {
      // console.log(window.location.pathname);
      router.push("/login");
      return;
    }

    router.push(`/book-tickets/${filmId}/${id}`);
  };
  return (
    <div className="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
      <h1 className="text-base font-bold mb-4">{cinema.name}</h1>
      <div className="showtime__bundle flex md:flex-row flex-col gap-2 items-start mb-6">
        <label className="text-sm font-semibold text-grey-10 mt-2 w-[150px]">
          2D Phụ Đề
        </label>
        <div className="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap">
          {cinema.schedules.map((s: any) => {
            return (
              <span
                role="button"
                onClick={() => onClickSchedule(s.id)}
                key={s.id}
                className="py-2 md:px-8 px-6 border rounded text-sm font-normal text-black hover:bg-blue-500 active:bg-blue-500 transition-all duration-300 ease-in-out hover:text-white"
              >
                {format(new Date(s.startTime), "HH:mm")}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MovieBanner = ({ film }: { film: Film }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="relative bg-black flex justify-center w-full h-full">
      <div className="absolute w-full h-full z-[300] bg-[#0003]"></div>
      <div className="relative h-full ">
        <div className="absolute top-0 -left-[0%] z-[100] ">
          <Image
            alt="Blur Left"
            loading="lazy"
            width="342"
            height="680"
            decoding="async"
            data-nimg="1"
            className="w-full lg:h-[500px] object-cover lg:block hidden "
            src="/images/blur-left.webp"
            style={{ color: "transparent" }}
          />
        </div>
        <div className="relative">
          <img
            alt="Img Movie"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="w-[860px] h-full md:h-full lg:h-[500px]  object-fill object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)"
            src={film.image.length > 0 ? film.image[1] : ""}
            style={{ color: "transparent" }}
          />
          <button
            onClick={() => setShowTrailer(true)}
            className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[300]"
          >
            <RiPlayCircleFill className="text-white text-7xl hover:scale-105 duration-200" />
          </button>
        </div>
        <div className="absolute top-0 -right-[0%] z-[100] lg:block hidden">
          <Image
            alt="Blur Right"
            loading="lazy"
            width="342"
            height="680"
            decoding="async"
            data-nimg="1"
            className="w-full lg:h-[500px] object-cover"
            src="/images/blur-right.webp"
            style={{ color: "transparent" }}
          />
        </div>
      </div>
      <TrailerModal
        isShow={showTrailer}
        onClose={() => setShowTrailer(false)}
        src={film.trailer}
      />
    </div>
  );
};

function RecommendedFilms({ cinema }: { cinema?: Cinema }) {
  const [films, setFilms] = useState<Film[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFilms().then((data) => {
      setFilms(data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mt-20 text-2xl">
      <div className="mb-4">
        <span className="border-l-4 border-solid border-blue-500 mr-2"></span>
        <h1 className="text-xl inline-block uppercase font-semibold">
          Phim đang chiếu
        </h1>
      </div>

      <div>
        <ul className="flex flex-col justify-between gap-8">
          {!isLoading &&
            films &&
            films.length > 0 &&
            films.map((film) => {
              return (
                <li
                  className="text-sm text-black py-1 transition-all duration-300"
                  key={film.id}
                >
                  <div className="inline-block whitespace-nowrap relative max-w-full w-[400px] h-[250px]">
                    <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full false">
                      <div className="object-cover rounded relative card__img max-w-full">
                        <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
                          <div className="card__hover__content flex flex-col justify-center items-center w-full h-full">
                            <Link
                              href={`/movies/${film.id}`}
                              type="button"
                              className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                            >
                              <RiTicket2Line className="text-white mr-2" /> Mua
                              vé
                            </Link>
                          </div>
                        </div>
                        <div>
                          <img
                            alt={film.name}
                            width="300"
                            height="150"
                            className=" object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)"
                            src={film.image}
                            style={{ color: "transparent" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="Card_card__title__kFoFc mt-2"
                      style={{ width: "400px" }}
                    >
                      <Link
                        type="button"
                        className="text-sm font-semibold not-italic w-[400px]"
                        href={`/movies/${film.id}/`}
                      >
                        {film.name}
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
