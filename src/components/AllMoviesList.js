import React from "react"

export default function AllMoviesList(movies){
  if(movies.data!=null){
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
          {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className='p-5 text-center bg-light'>
      <h4 className='mb-3'>No Movies </h4>
    </div>
  );
}