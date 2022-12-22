import {useEffect, useState} from 'react';
import db from '../db/db';

type Data = {
  code: number;
  data: {
    city_rate: string;
    combined_rate: string;
    county_rate: string;
    region: string;
    special_rate: string;
    state: string;
    state_rate: string;
    zip: string;
  };
  error?: boolean;
};

const useStates = (zip: number) => {
  const [data, setData] = useState<{
    city_rate: string;
    combined_rate: string;
    county_rate: string;
    region: string;
    special_rate: string;
    state: string;
    state_rate: string;
    zip: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getStates = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '22cb7ba166msh0e11e426c393037p1e0e2fjsn89145bcc792a',
          'X-RapidAPI-Host': 'sales-tax-rates1.p.rapidapi.com',
        },
      };

      const url = `https://sales-tax-rates1.p.rapidapi.com/v/api/?zip=${zip}`;

      const response = await fetch(url, options);

      const json: Data = await response.json();

      setData(json.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStates();
  }, [zip]);

  return {data, error, isLoading};
};

export default useStates;
