export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <a className="btn btn-ghost text-xl" href="/">TodoList</a>
        <span className="divider divider-horizontal divider-neutral m-0"></span>
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal py-0 px-1 m-0">
            <li>
              <a href="/" className="text-lg">
                Task
              </a>
            </li>
            <li>
              <a href="/calender" className="text-lg">
                Calender
              </a>
            </li>
          </ul>
        </div>
      </div>
      <span className="divider m-0"></span>
    </>
  );
}
