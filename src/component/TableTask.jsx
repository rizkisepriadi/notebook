export default function TableTask({ name, color, count  }) {
  return (
    <div className="flex flex-col gap-3 bg-base-200 rounded-lg w-full">
      <div className="bg-base-300 items-center flex rounded-lg justify-between">
        <div className="flex items-center">
          <h1 className="p-3">{name}</h1>
          <span className={`badge bg-black text-white ${color}`}>{count}</span>
        </div>
        <button className="btn btn-circle size-8 min-h-0 btn-ghost mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
