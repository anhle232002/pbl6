import ScheduleItem from "./ScheduleItem";

export default function MovieDetailsCard() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 ">
        <div>
          <img
            src="https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=150&rev=0cf131d721764309a26720ecff83012c"
            className="w-full object-cover h-64 rounded shadow-[0px_0px_50px_1px_#777] "
            alt=""
          />
        </div>
      </div>
      <div className="col-span-10 ml-10">
        <h3 style={{ fontFamily: "isonorm" }} className="text-2xl tracking-widest text-white">
          TROLLS BAND TOGETHER
        </h3>

        <p className="mt-4 text-white">
          After true friendship and relentless flirting, Poppy and Branch are now officially,
          finally, a couple! As they grow closer, Poppy discovers that Branch has a secret past.
        </p>

        <div className="mt-6">
          <span className="text-white mr-4">Starring</span>
          <span>
            Christopher Mintz-Plasse, Justin Timberlake, Anna Kendrick, Kunal Nayyar, Daveed Diggs,
            Kenan Thompson, Troye Sivan, Eric André, Kid Cudi
          </span>
        </div>

        <div className="mt-6">
          <span className="text-white mr-4">Running time</span>

          <span>1hr 31mins</span>
        </div>

        <hr className="mt-10 border-accent " />

        <div className="mt-10">
          <div className="grid grid-cols-5 gap-5">
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
          </div>

          <div role="button" className="uppercase tracking-wider mt-8 text-white">
            Show all film times
          </div>
        </div>
      </div>
    </div>
  );
}
