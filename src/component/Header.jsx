import { AddCategoryButton } from "./Button.module.jsx";
import Navbar from "./Navbar";

export default function Header() {

  return (
    <header>
      <Navbar />
      <div className="px-7">
        <h1>Manage your task more easily than before</h1>
        <div className="flex gap-3 pt-2 items-center w-full">
          <label className="input input-bordered flex w-[70%] items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <ul className="menu bg-base-100 lg:menu-horizontal rounded-box items-center">
            <AddCategoryButton />
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                List
              </a>
            </li>
            <li>
              <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
