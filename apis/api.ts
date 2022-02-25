export const API_ENDPOINT = 'http://20.62.139.82';
export const getSocksCatalog = async () => {
  const rsp = await fetch(`${API_ENDPOINT}/catalogue?size=5`);
  return rsp.json();
};