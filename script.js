const BASE_URL = "https://t4e-testserver.onrender.com/api";

async function loadData() {
  try {
    const tokenRes = await fetch(`${BASE_URL}/public/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId: "E0323004",
        set: "setA",
        password: "425057"
      })
    });

    const tokenData = await tokenRes.json();

    const dataRes = await fetch(`${BASE_URL}${tokenData.dataUrl}`, {
      headers: {
        Authorization: `Bearer ${tokenData.token}`
      }
    });

    const finalData = await dataRes.json();

    document.getElementById("output").textContent =
      JSON.stringify(finalData, null, 2);

  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err;
  }
}

loadData();