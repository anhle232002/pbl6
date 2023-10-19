import Image from "@/node_modules/next/image";

export function MoviePreview() {
  return (
    <div className="relative bg-slate-700/40 overflow-hidden py-4 ">
      <div
        style={{
          backgroundImage:
            "url('https://www.myvue.com/-/media/vuecinemas/img/import/true-love_stills_tlov_trl_f_int_ov_v19_txt_scp_709_e02_cc01_20230630_00000-copy-5.jpg?rev=11f38676bd8e4ac1be7fa8ddd59cce02')",
        }}
        className="absolute left-0 top-0 w-full h-full  bg-no-repeat bg-center bg-cover blur-lg "
      >
        <div className="w-full h-full bg-black/20"></div>
      </div>

      <div className="relative max-w-7xl m-auto flex  text-white gap-10 p-4">
        <div>
          <img
            className="h-[200px] w-[150px] w-full object-cover"
            src="https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=150&rev=0cf131d721764309a26720ecff83012c"
            alt="img"
          />
        </div>
        <div>
          <div className="tracking-wider text-red-600">NOW BOOKING</div>

          <h3 className="text-xl">THE NUN 2</h3>

          <div className="mt-4 text-sm">
            <span>CGV Đà Nẵng</span>, <span>SCREEN 4</span>
          </div>

          <p className="text-sm mt-2">Sat 7 Oct, 9:35PM - 11:50PM</p>

          <button className="mt-2 text-xs  bg-slate-900 px-4 py-1 rounded-md font-semibold uppercase">
            Change Time
          </button>
        </div>
      </div>
    </div>
  );
}
