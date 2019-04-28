import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {
  render() {

    let data = this.props.data;

    //If no data, hide Result table
    if(!data.length)
        return null;


    return (
      <div>
        <ReactTable
          data={this.props.data}
          columns={[
                {
                  Header: "Playlist Image",
                    Cell: (row) => {
                        return  <div>
                                    <a href={row.original.link} rel="noopener noreferrer" target="_blank">
                                    <img height="180" width="180" src={row.original.imgUrl} alt=""/>
                                    </a>
                                </div>
                    }
                },
                {
                  Header: "Playlist Name",
                  Cell: (row) => {
                    return  <div>
                                <a href={row.original.link} rel="noopener noreferrer" target="_blank">
                                {row.original.playListName}
                                </a>
                            </div>
                  },
                  style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: "Description",
                    accessor: "description",
                    style: { 'whiteSpace': 'unset' }
                },
                {
                    Header: "Owner",
                    Cell: (row) => {
                        return  <div>
                                    <a href={row.original.ownerLink} rel="noopener noreferrer" target="_blank">
                                    {row.original.owner}
                                    </a>
                                </div>
                    }
                },
                {
                    Header: "Followers",
                    accessor: "followers"
                },
                {
                  Header: "Total Tracks",
                  accessor: "totalTracks"
                },
                {
                  Header: "Total Duration (Minutes)",
                  accessor: "totaltotalPlaylistDuration"
                }
              ]
            }
          defaultSorted={[
            {
              id: "followers",
              desc: true
            }
          ]}
          defaultPageSize={50}
          style={{
            height: "1100px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
          showPagination ={false}
        />
      </div>
    );
  }
}

export default Table;