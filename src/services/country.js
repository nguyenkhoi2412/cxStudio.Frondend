import axios from "@utils/axio.instance";

export default {
  getCountries: () => {
    const url =
      "https://restcountries.com/v3.1/independent?status=true&fields=name,currencies,capital,region,subregion,languages,maps,flags,timezones,coatOfArms";

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
