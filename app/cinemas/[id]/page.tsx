"use client";
import { getCinemas } from "@/services/getCinemas";
import MovieCarousel from "@/components/MovieCarousel";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import NavBar from "@/components/NavBar";
import { Cinema } from "@/types/Cinema";
import { Spinner } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getSchedules from "@/services/getSchedules";
import { Film } from "@/types/Film";
import AppFooter from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import WeekDayTabs from "@/components/WeekDayTabs";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay } from "swiper/modules";
import Select from "react-select";
import createDays from "@/utils/create-weekdays";
import { format, isAfter, isSameDay } from "date-fns";
import {
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiStarFill,
} from "react-icons/ri";
import { storage } from "@/utils/storage";

export default function CinemaMovies({ params }: { params: { id: string } }) {
  const cinemaId = Number(params.id);
  const [schedules, setSchedules] = useState<any>();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<number>();
  const [city, setCity] = useState("Toàn quốc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilm, setSelectedFilm] = useState(-1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const days = createDays();

  useEffect(() => {
    setIsLoading(true);
    getSchedules().then((data: any) => {
      setSchedules(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getCinemas().then((data) => {
      setCinemas(data);
    });

    const cinemaId = searchParams.get("cid");
    if (cinemaId && !Number.isNaN(Number(cinemaId))) {
      setSelectedCinema(Number(cinemaId));
    }
  }, []);

  const currentCinema = cinemas.find((c) => c.id === cinemaId);

  const cinema =
    cinemas && cinemas.length > 0
      ? cinemas.find((c) => c.id === cinemaId)
      : null;

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

  const films = useMemo(() => {
    if (!schedules || !cinemas) return [];

    const cinema = schedules.find((c: any) => c.cinemaId === cinemaId);

    if (!cinema) {
      return;
    }

    const films = cinema.films.filter((f: Film) => {
      return f.schedules?.some(
        (s) =>
          isSameDay(new Date(s.startTime), selectedDate) &&
          isAfter(new Date(s.startTime), new Date()),
      );
    });
    return films;
  }, [cinemas, schedules, selectedDate, cinemaId]);

  console.log(films);

  const slides = [
    {
      url: "/images/oppenheimer.jpg",
    },
    {
      url: "/images/barbie2.avif",
    },
    {
      url: "/images/marvel.jpg",
    },
    {
      url: "/images/lovereset.webp",
    },
  ];

  return (
    <div className="bg-background text-accent pb-[96px]">
      <NavBar />

      <div className="h-[400px] relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          className="h-full relative"
          autoplay={{
            delay: 3000,
          }}
          slidesPerView={1}
        >
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.url}>
                <div className="relative w-full h-full bg-no-repeat flex items-center justify-center">
                  <img
                    className="relative w-full px-10 h-full  object-cover"
                    src={slide.url}
                    alt="poster"
                  ></img>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {cinema ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 grid-flow-row gap-y-6 my-0 mx-auto md:items-center  lg:max-w-6xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] py-6 mt-10">
          <div className="col-span-2">
            <h1 className="text-xxl font-bold">{cinema.name}</h1>
            <p className="text-sm md:mt-5">
              <span className="text-grey-40">Địa chỉ:</span> {cinema.address}{" "}
            </p>
            <p className="text-sm">
              <span className="text-grey-40">Hotline:</span>{" "}
              <span className="text-blue-10 transition-all duration-300">
                {cinema.hotline}
              </span>
            </p>
          </div>
          <div className="col-span-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 lg:flex-row gap-4 ml-2 flex-1">
            <div className="col-span-1 text-sm">
              <Select
                value={{ value: city, label: city }}
                onChange={(v) => setCity(v?.value || "")}
                options={cities.map((c) => ({ value: c, label: c }))}
              />
            </div>
            <div className="col-span-1 text-sm">
              <Select
                value={{ value: currentCinema?.id, label: currentCinema?.name }}
                onChange={(v) => {
                  router.push(`/cinemas/${v?.value}`);
                }}
                options={filterCinema.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <div className="bg-[#f4f4f4] py-14">
        <div className="max-w-6xl m-auto ">
          <div className="bg-white p-4 pb-20">
            <h4 className="relative text-xl text-gray-700 font-semibold before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
              <span className="ml-4  uppercase">phim</span>
            </h4>

            <div>
              <ul className="flex items-center justify-center mt-6">
                {days.map((d) => {
                  return (
                    <div
                      onClick={() => setSelectedDate(d.value)}
                      key={d.title}
                      className="slick-slide slick-active slick-current"
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
                  );
                })}
              </ul>
            </div>

            <hr className="mt-4 border-primary" />

            <div className="grid grid-cols-6 gap-8 mt-10 relative">
              {films.map((f: Film) => {
                return (
                  <div key={f.id}>
                    <MovieCard
                      onSelectFilm={() => {
                        if (f.id === selectedFilm) {
                          setSelectedFilm(-1);
                          return;
                        }
                        setSelectedFilm(f.id);
                      }}
                      selectedDate={selectedDate}
                      movie={f}
                      isSelected={selectedFilm === f.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-6xl m-auto bg-white mt-10">
          <div className="grid md:grid-cols-2 grid-cols-1 mt-8">
            <div className="p-4">
              <div className="mb-4">
                <span className="border-l-4 border-solid border-primary mr-2"></span>
                <h1 className="text-xl inline-block uppercase font-bold m-0">
                  Giá vé
                </h1>
              </div>
              <ul className="cinema__tickets-pricing">
                <li className="mb-4 text-center">
                  <img
                    className="inline object-cover object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)"
                    src="https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F8%2F25%2Fbanggiave-09-2023-nguyen-du_1692936159184.jpg&amp;w=3840&amp;q=75"
                    style={{ color: "transparent" }}
                  />
                </li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <div className="mb-4">
                <span className="border-l-4 border-solid border-blue-10 mr-2"></span>
                <h1 className="text-xl inline-block uppercase font-bold m-0">
                  Thông tin chi tiết
                </h1>
              </div>
              <div className="cinema__info">
                <ul>
                  <li>
                    <strong className="text-grey-80">Địa chỉ: </strong>
                    <strong>
                      Lầu 3, TTTM CoopMart Foodcosa số 304A, Quang Trung, P.11,
                      Q. Gò Vấp, Tp.HCM
                    </strong>
                  </li>
                  <li>
                    <strong className="text-grey-80">Số điện thoại: </strong>
                    <strong>1900 2224</strong>
                  </li>
                </ul>
                <div className="cinema__map-embed my-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6873878127094!2d106.66212379999999!3d10.835218200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a79d4793eb%3A0x8d8c6caff9fccc4f!2sGalaxy+Cinema!5e0!3m2!1svi!2s!4v1442045531959"
                    className="w-full h-[250px]"
                  ></iframe>
                </div>
                <div className="cinema__description content__data__full">
                  <p style={{ margin: "0in 0in 8pt" }}>
                    <span style={{ fontSize: "11pt", lineHeight: "107%" }}>
                      <span style={{ fontFamily: '"Calibri","sans-serif"' }}>
                        <span style={{ fontFamily: '"Tahoma","sans-serif"' }}>
                          Đây là cụm{" "}
                          <a href="https://www.galaxycine.vn/">
                            <i>rạp chiếu phim</i>
                          </a>{" "}
                          thứ 5 của Galaxy Cinema nằm tại con đường trung tâm
                          nhộn nhịp nhất của quận Gò Vấp, kết hợp cùng khu ăn
                          uống và mua sắm của Co.opmart FoodCosa, tạo nên một
                          địa điểm giải trí phức hợp tiện lợi và đầy sôi động.
                        </span>
                      </span>
                    </span>
                  </p>

                  <p style={{ margin: "0in 0in 8pt" }}>&nbsp;</p>

                  <p style={{ margin: "0in 0in 8pt" }}>
                    <span style={{ fontSize: "11pt", lineHeight: "107%" }}>
                      <span style={{ fontFamily: '"Calibri","sans-serif"' }}>
                        <span style={{ fontFamily: '"Tahoma","sans-serif"' }}>
                          Galaxy Quang Trung mang đến một không gian điện ảnh
                          mới với công nghệ chiếu phim đạt tiêu chuẩn Hollywood.
                          Hệ thống âm thanh Dolby 7.1 sống động kết hợp cùng
                          hiệu ứng hình ảnh Digital sắc nét sẽ mang đến những
                          trải nghiệm điện ảnh trọn vẹn nhất. Ngoài ra, với 7
                          phòng chiếu gồm hơn 1.000 chỗ ngồi sẽ luôn phục vụ
                          khán giả với mức giá vô cùng hợp lý bởi đội ngũ nhân
                          viên chuyên nghiệp và tận tình. Galaxy Quang Trung
                          luôn cập nhật nhanh chóng những bom tấn{" "}
                          <a href="https://www.galaxycine.vn/phim-dang-chieu/">
                            <i>phim mới </i>
                          </a>
                          ,
                          <a href="https://www.galaxycine.vn/phim-dang-chieu/">
                            <i> phim hay</i>
                          </a>{" "}
                          nhất&nbsp;để phục vụ cho các mọt phim Việt Nam.
                        </span>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <AppFooter />
      <BottomBar />
    </div>
  );
}

const MovieCard = ({
  movie,
  isSelected,
  onSelectFilm,
  selectedDate,
}: {
  movie: Film;
  isSelected: boolean;
  selectedDate: Date;
  onSelectFilm: () => void;
}) => {
  const router = useRouter();
  const filterSchedules = movie.schedules?.filter((s: any) => {
    return (
      isSameDay(new Date(s.startTime), selectedDate) &&
      isAfter(new Date(s.startTime), new Date())
    );
  });

  const onClickSchedule = (id: number) => {
    if (!storage.get("logged_in")) {
      // console.log(window.location.pathname);
      router.push("/login");
      return;
    }

    router.push(`/book-tickets/${movie.id}/${id}`);
  };

  return (
    <div className="">
      <div className="Card_card__wrapper__RUTBs">
        <div onClick={onSelectFilm} role="button" className="relative ">
          <div className="relative">
            <img
              className="object-cover w-full h-[230px] duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0 rounded-md"
              src={movie.image}
              style={{ color: "transparent" }}
            />
            <div className="votes ">
              <p className="absolute right-[5px] bottom-10 flex gap-1 px-2 items-center bg-black/30 rounded-md ">
                <span>
                  <RiStarFill className="text-primary" />
                </span>

                <span className="text-sm font-bold text-white">
                  {movie.score ? movie.score : "Chưa có đánh giá"}
                </span>
              </p>
            </div>
            <div className="age__limit absolute bottom-[6px] right-[6px]">
              <span className="inline-flex items-center justify-center w-[38px] h-7 bg-primary rounded text-sm text-center text-white font-bold not-italic">
                T{movie.limitAge}
              </span>
            </div>
          </div>

          {isSelected && (
            <div className="absolute w-full h-full bg-black/40 left-0 top-0 flex items-center justify-center">
              <RiCheckboxCircleLine className="text-5xl text-primary " />
            </div>
          )}
        </div>
        <div className="mt-4 block font-semibold text-black text-sm h-[30px] text-center">
          <h3>{movie.name}</h3>
        </div>
      </div>

      {isSelected && (
        <>
          <div className="absolute mt-6 w-full left-0 z-10">
            <div className="bg-grey-90 border rounded px-4 py-6">
              <h4 className="text-base not-italic font-bold mb-4">
                Suất chiếu
              </h4>
              <div className=" flex md:flex-row flex-col gap-20 items-center mb-6">
                <div className="md:col-span-2 md:row-span-5 lg:col-span-1 text-sm text-black-20">
                  2D Phụ Đề
                </div>
                <div className="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap">
                  {filterSchedules &&
                    filterSchedules.map((s: any) => {
                      return (
                        <span
                          role="button"
                          onClick={() => onClickSchedule(s.id)}
                          key={s.id}
                          className="py-2 md:px-8 px-6 border rounded text-sm font-normal text-black hover:bg-blue-500 active:bg-blue-500 transition-all duration-300 ease-in-out hover:text-white"
                        >
                          {format(new Date(s.startTime), "hh:mm")}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1" style={{ height: "150px" }}></div>
        </>
      )}
    </div>
  );
};
