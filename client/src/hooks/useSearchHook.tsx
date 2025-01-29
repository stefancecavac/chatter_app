import { useSearchParams } from "react-router-dom";

export const UseSearchHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("q", e.target.value);

      return params;
    });
  };
  return { searchParams, handleSearchParams };
};
