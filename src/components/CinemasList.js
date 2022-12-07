import React from "react"

export default function CinemasList(cinemas){
  if(!cinemas==null){
  return (
      <div className="table-resposive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Information</th>
            </tr>
          </thead>
          <tbody>
          {cinemas.map((cinema) => (
              <tr key={cinema.id}>
                <td>{cinema.name}</td>
                <td>{cinema.address}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="table-resposive mt-5">
      <h4>No Cinemas </h4>
    </div>
  )
  
}