import NavBar from "@/components/NavBar";
import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";
const robo = Roboto_Condensed({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function MovieDetail() {
  return (
    <div className={` min-h-screen bg-background text-accent`}>
      <NavBar />
      <div className="flex w-4/5 mx-auto mt-20 justify-center mb-20 bg-slate-900 p-5 pt-10 rounded text-white">
        <div>
          <Image src="/images/revue.jpg" alt="Revue Starlight" width={500} height={500} />
        </div>

        <div className="max-w-2xl px-4 pb-16 sm:px-6 lg:col-span-2 flex flex-col">
          <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Revue Starlight The Movie
          </h1>

          <div className="mt-8">
            <h3 className="font-bold text-xl">Description</h3>

            <p className="text-base text-gray-200 text-justify mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dolore eaque cumque
              blanditiis minima exercitationem enim ratione nulla cupiditate nobis, at libero
              molestias reprehenderit ut neque adipisci! Hic, voluptatibus consectetur. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Saepe enim voluptate corrupti nulla
              deserunt repudiandae, magnam, vero fugiat nemo quasi accusantium totam obcaecati
              quaerat, dolor quod explicabo. Amet, a atque!
            </p>

            <div className="h-fit flex mt-8 gap-x-52">
              <div className="w-fit pr-2">
                <p className="font-bold">Director</p>
                <p>Furukawa Tomohiro</p>
              </div>
              <div className="h-10">
                <p className="font-bold">Cast</p>
                <p className="text-justify">
                  Momoko Koyama, Suzuko Mimori, Moeka Koizumi, Maho Tomita, Aina Aiba
                </p>
              </div>
            </div>
          </div>
          <button className="mt-10 rounded px-5 py-3 mx-auto bg-red-600 text-white font-bold">
            Buy ticket
          </button>
        </div>
      </div>
    </div>
  );
}
