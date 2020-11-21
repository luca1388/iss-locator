const customFetch = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
};

export default customFetch;