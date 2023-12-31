import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function UserIndex() {
  const data = useSelector((state: RootState) => state.counterReducer);
  const names: DocumentData[] =
    data.data?.map((item) => ({
      id: item.id, // You can adjust the index or use a unique identifier as needed
      ...item.data,
    })) || [];
  let searchResult: DocumentData[] = [];
  const [search, setSearch] = useState("");

  if (search !== "") {
    searchResult = matchSorter(names, search, { keys: ["name"] });
  }

  let arrayData = searchResult.length === 0 ? names : searchResult;

  return (
    <div className="mx-auto flex flex-col items-center  max-w-7xl sm:px-6 lg:px-8">
      <div className="relative w-1/3 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Vyhledávání..."
          onChange={(a) => setSearch(a.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <MagnifyingGlassIcon className=" w-6 h-6 inline-flex items-center font-sans text-xs text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-4 pt-10 items-center gap-14  ">
        {arrayData.map((item, index) => (
          <Link
            to={`/product/${item.name}`}
            className=" group flex items-center flex-col cursor-pointer p-2 shadow-none hover:shadow-xl rounded-lg  transition-all duration-300"
            key={index}
            onClick={() => {
              localStorage.setItem("userProductId", item.id),
                localStorage.setItem("userProductName", item.name),
                localStorage.setItem("userProductImage", item.image),
                localStorage.setItem("userProductText", item.text);
            }}
          >
            <img
              className=" group-hover:scale-105  duration-300 w-[230px] h-[230px] object-contain"
              width={230}
              height={230}
              src={"https://fotoulozna-7007.rostiapp.cz/assets/" + item.image}
            />
            <p className=" group-hover:scale-105 duration-300 font-semibold">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
