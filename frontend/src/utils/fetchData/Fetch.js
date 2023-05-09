const fetchData = async (url, method, body) => {
  try {
    let res;
    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export { fetchData };
