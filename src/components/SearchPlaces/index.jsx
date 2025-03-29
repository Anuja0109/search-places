import React, { useState } from "react";
import Searchbar from "../UI/Searchbar";
import "./SearchPlaces.css";
import List from "../UI/List/List";
import Pagination from "../UI/Pagination";
import { placesTableColumns } from "../../config/PlacesTableColumnConfig";
import { getFlagImageSrcByCountryCode } from "../../utils/getFlagImageSrc";
import Loader from "../UI/Loader";
import { getPlaces } from "../../api/apiFunctions";

function SearchPlaces() {
  const [limit, setLimit] = useState(3);
  const [placesData, setPlacesData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  

  const handlePageClick = (page) => {
    setLoading(true);
    setCurrentPage(page + 1);
    const offset = page * limit;
    getPlaces(
      `/places/?namePrefix=${searchTerm}&limit=${limit}&offset=${offset}`
    )
      .then((res) => {
        setPlacesData(res?.data?.data);
        setPaginationData(res?.data?.metadata);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const handleSearchSubmit = async (e) => {
    if (searchTerm) {
      setLoading(true);
      getPlaces(`/places/?namePrefix=${searchTerm}&limit=${limit}`)
        .then((res) => {
          setPlacesData(res?.data?.data);
          setPaginationData(res?.data?.metadata);
          setLoading(false);
        })
        .catch((err) => {
          setErr(err);
        });
    } else e.preventDefault();
  };

  const normalizeData = (dataList) => {
    const normalised = dataList?.map((data, idx) => ({
      sno: getSerialNumberOfListItem(idx),
      id: data.id,
      name: data.name,
      country: data.country,
      countryCode: data.countryCode,
      imgSrc: getFlagImageSrcByCountryCode(data.countryCode),
    }));

    return normalised;
  };

  const getSerialNumberOfListItem = (idx) =>
    limit * (currentPage - 1) + idx + 1;

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleLimitChange = (num) => {
    setLimit(num);
  };

  return (
    <article aria-label="search-places" className="mainArticle">
      <Searchbar
        {...{ searchTerm, handleSearchTermChange, handleSearchSubmit, loading }}
      />
      {loading && <Loader />}
      <List
        itemList={normalizeData(placesData) ?? []}
        label="Places"
        tableColumns={placesTableColumns}
      />
      {err && <span className="error-span">{err}</span>}

      {paginationData?.totalCount > 0 && (
        <Pagination
          {...{
            limit,
            handleLimitChange,
            totalItems: paginationData?.totalCount ?? 0,
            handlePageClick,
          }}
        />
      )}
    </article>
  );
}

export default SearchPlaces;
