import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useFirestore } from '../Hooks/useFirestor';

const Redirect = () => {
  const [loading, setLoading] = useState(true);
  const { searchData } = useFirestore();
  const params = useParams();

  useEffect(() => {
    searchData(params.nanoid).then((res) => {
      if (res.exists()) {
        location.href = res.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if(loading) return <p className=' text-center'>Redireccionando...</p>

  return <Outlet />;
};

export default Redirect;
