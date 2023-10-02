export default function Movie() {
  return (
    <a href="/movieDetail" className="group">
      <div className="aspect-h-5 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-10 xl:aspect-w-7">
        <img
          src="/images/revue.jpg"
          alt="revue"
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>

      <h3 className="mt-4 text-lg text-gray-200 text-center font-bold">
        Revue Starlight The Movie
      </h3>
    </a>
  );
}
