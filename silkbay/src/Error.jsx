import React from 'react';
import {useRouteError} from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  console.log(error)
  return (

    <div>
      <h1>Paso algo extraño...</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
