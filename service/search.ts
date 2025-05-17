import axios from "axios";
//using sematic search Embeddings
export async function Get_Search_Plants(query: string) {
  const res = await axios.get(
    `http://localhost:8000/plants/search/?q=${query}`
  );

  return res;
}
