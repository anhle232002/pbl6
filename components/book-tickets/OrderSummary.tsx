export function OrderSummary() {
  return (
    <div className="relative h-full p-4 shadow-lg rounded-md bg-white/10 ">
      <div>
        <h3 className="text-xl tracking-wider p-3 text-center text-primary">Order Summary</h3>

        <hr className="mt-3 border-primary"></hr>
      </div>

      <div className="mt-6">
        <div>
          <ul className="flex gap-4">
            <li>
              <div className="w-8 h-8 rounded-b-xl bg-green-300 text-black flex justify-center items-center">
                <span>F4</span>
              </div>
            </li>
            <li>
              <div className="w-8 h-8 rounded-b-xl bg-green-300 text-black flex justify-center items-center font-semibold ">
                <span>F3</span>
              </div>
            </li>
          </ul>

          <div className="mt-4 flex justify-between">
            <div>2 Standard</div>
            <div>100.000đ</div>
          </div>
        </div>
        <hr className="mt-2 border-primary" />

        <div className="mt-4">
          <h4>ADD A VOUCHER</h4>

          <div className="mt-4 flex gap-6">
            <div>
              <input
                type="text"
                className="bg-transparent rounded text-white uppercase"
                placeholder="Enter a code"
              />
            </div>
            <button className="border px-4 rounded">ADD</button>
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 bg-primary-linear font-semibold tracking-wider text-black p-4 w-full rounded-t-lg">
        <div className="text-lg flex justify-between items-center">
          <div>Total</div>
          <div>$ 0.0 VND</div>
        </div>

        <button
          type="button"
          className="w-full mt-6 py-3 px-5 mr-2 mb-2 text-sm focus:outline-none  rounded-lg bg-white/40 shadow-md border-2 border-transparent  hover:border-primary hover:bg-white hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200  tracking-widest  duration-200"
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
}
