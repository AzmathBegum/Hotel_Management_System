const API = "http://localhost:8080/api/staff";

export const getStaff = async () => {
  const res = await fetch(API);
  return res.json();
};

export const addStaff = async (staff) => {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(staff)
  });
};

export const deleteStaff = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
};