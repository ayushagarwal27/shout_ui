import {Button, Card, CardBody, CardHeader, Chip, Input, Typography,} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {ContentDrawer} from "./ContentDrawer";
import SearchIcon from "../../icons/SearchIcon"
import contentTableData from "../../data/authors-table-data";

export function Content() {
  const [open, setOpen] = React.useState(false);
  const [titleVal,setTitleVal] = useState('');
  const [filteredResults,setFilteredResults] = useState([]);

  useEffect(() => {
    if(titleVal === ''){
      setFilteredResults([]);
    }else{
      const nextResults = contentTableData.filter(content => content.title.includes(titleVal))
    setFilteredResults(nextResults);
    }
  }, [titleVal]);

  function filterByStatus(status){
    const nextResults = contentTableData.filter(content => content.status === status)
    setFilteredResults(nextResults);
  }


  return (
      <>
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="flex justify-between items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            Manage Content
          </Typography>
          <div className={'flex gap-4'}>
          <div className="w-72">
            <Input value={titleVal} onChange={(e) => setTitleVal(e.target.value)} label="Seacrh by Title" icon={<SearchIcon/>} className={' placeholder:text-white/50 bg-white text-black/70 focus:outline-white focus:border-white focus:border'} variant={'outlined'}/>
          </div>
         <div className={'flex items-center gap-2'}>
             <Button onClick={() => setFilteredResults([])}>All</Button>
             <Button onClick={() => filterByStatus('Draft')}>Draft</Button>
             <Button  onClick={() => filterByStatus('In Review')}>In Review</Button>
             <Button  onClick={() => filterByStatus('Published')}>Published</Button>
         </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full max-w-[1160px] mx-auto table-auto">
            <thead>
              <tr>
                {["Title", "Platform", "Status", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(filteredResults.length > 0 ? filteredResults : contentTableData).map(
                ({ title, platform, status }, key) => {
                  const className = `py-3 px-5 ${
                    key === contentTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">

                          <div>

                            <Typography className="text-md font-normal text-blue-gray-500">
                              {title}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {platform}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ==='Published' ? "green" : "blue-gray"}
                          value={status}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                          onClick={() => setOpen(true)}
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

    </div>
        <ContentDrawer open={open} setOpen={setOpen}/>
      </>
  );
}

export default Content;
