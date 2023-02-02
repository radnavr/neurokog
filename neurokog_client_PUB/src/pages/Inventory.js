import React, { useEffect, useState } from 'react';
import { getData } from '../api';
import InputField from '../components/InputField';
import { MdSearch } from 'react-icons/md'
import Pagination from '../components/Pagination';

const Inventory = () => {

  // MAKING AUTOMATIC GET CALL
  useEffect(() => {
    const fetchData = async() => {
      const responseJson = await getData();
      setData(responseJson);
    }

    fetchData(); 
  }, []);

  const [data, setData] = useState([]);

  // PHRASE TO SEARCH
  const [searchPhrase, setSearchPhrase] = useState("");
  const handlePhraseSearch = (e) => setSearchPhrase(e.target.value);

  // ID TO SEARCH
  const [searchId, setsearchId] = useState("");
  const handleIdSearch = (e) => setsearchId(e.target.value)


  // PAGE & ITEMS PER PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

  // FILTERING & SORTING ITEMS
  let includingSearchPhrase = data
    .filter((item) => item.jmeno.toLowerCase().includes(searchPhrase))
    .filter((item) => item.id.toString().includes(searchId))
    .sort((a, b) => {
      const nameA = a.jmeno.toLocaleUpperCase();
      const nameB = b.jmeno.toLocaleUpperCase();
  
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
  
      return 0
    });

  // PAGINATION
  let indexOfLastResult = currentPage * resultsPerPage;
  let indexOfFirstResult = indexOfLastResult - resultsPerPage;
  let currentResults = includingSearchPhrase.slice(indexOfFirstResult, indexOfLastResult)
  const paginate = (newPage) => setCurrentPage(newPage);

  return (
    <div className="flex-row x-centered y-centered growing min-w-1200-px">
      <div className="flex-column h-508-px w-100-per margin-1rem">
        <table className="w-100-per border-spacing-0">
          <thead className="bg-green h-44-px w-100-per">
            <tr>
              <th className="align-left heading-text w-40-per">
                <div className="flex-row y-centered">
                  <MdSearch className="icon"/>
                  <InputField 
                    inputStyle="invisible-input basic-text"
                    inputType="text" 
                    onChange={handlePhraseSearch}
                    placeholder="JMÉNO"
                  />
                </div>
              </th>
              <th className="heading-text align-left w-40-per">
                <span className="indented">OBLASTI</span>
              </th>
              <th className="heading-text text-align-center w-5-per">
                VĚK
              </th>
              <th className="heading-text text-align-center w-10-per">
                UMÍSTĚNÍ
              </th>
              <th className="heading-text text-align-center w-5-per">
                <div className="flex-row x-centered y-centered">
                  <MdSearch className="icon"/>
                  <InputField 
                    inputStyle="invisible-input basic-text w-25-px"
                    inputType="text" 
                    onChange={handleIdSearch}
                    placeholder="ID"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResults
              .map((item) => (
              <tr key={item._id}>
                <td className="h-40-px w-40-per"><p className="basic-text indented">{item.jmeno}</p></td>
                <td className="h-40-px w-40-per"><p className="basic-text indented">{item.zaber}</p></td>
                <td className="basic-text text-align-center h-40-px w-5-per ">{`${item.minVek}-${item.maxVek}`}</td>
                <td className="basic-text text-align-center h-40-px w-10-per">{item.umisteni}</td>
                <td className="basic-text text-align-center h-40-px w-5-per">{item.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="expander side-borders"></div>
        <div className="flex-row x-centered y-centered bg-light-gray U-gray-border h-42-px">
          <Pagination 
            currentPage={currentPage} 
            onClick={paginate} 
            resultsPerPage={resultsPerPage} 
            totalResults={includingSearchPhrase.length} 
          />
        </div>
      </div>
    </div>
  )
}

export default Inventory