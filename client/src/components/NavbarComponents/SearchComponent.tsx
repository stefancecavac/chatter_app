import { NavLink } from "react-router-dom";

export const SearchComponent = () => {
  return (
    <NavLink
      to={"/search"}
      className={({ isActive }) =>
        `btn btn-ghost btn-sm text-primary hover:bg-primary/10 w-full flex items-center justify-start gap-5 ${
          isActive ? "bg-primary/10" : "hover:bg-primary/10"
        }`
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <p className="flex">Search chats and users</p>
    </NavLink>
  );
};
