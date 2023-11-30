"use client";

export default function History() {
  const ticketData = [
    { id: 1, movieName: "Movie A", bookDate: "2023-10-10", seatNumber: "A1" },
    { id: 2, movieName: "Movie B", bookDate: "2023-10-11", seatNumber: "B2" },
    // Add more ticket data here
  ];

  return (
    <div>
      <div className="text-xl font-semibold">Booking History</div>

      <hr className="mt-2" />

      <div className="mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Movie name
                </th>
                <th scope="col" className="px-6 py-3">
                  Book date
                </th>
                <th scope="col" className="px-6 py-3">
                  Seats
                </th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((ticket) => (
                <tr key={ticket.id} className="bg-gray-900 border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {ticket.id}
                  </th>
                  <td className="px-6 py-4">{ticket.movieName}</td>
                  <td className="px-6 py-4">{ticket.bookDate}</td>
                  <td className="px-6 py-4">{ticket.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
