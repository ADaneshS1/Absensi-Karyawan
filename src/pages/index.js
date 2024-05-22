import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const [showAllData,setShowAllData] = useState()

  useEffect(() => {
    fetch(`/api/getData`)
    .then((res) => res.json())
    .then((data) => {
      setShowAllData(data.data)
    })
  },[])

  return (
    <div style={{ fontFamily:"monospace" }}>
      <h1>Absensi</h1>
      <button onClick={() => {
        router.push(`/add-data`)
      }}>Add Data</button>
      <div>
        {showAllData === null && <h1>Data Kosong</h1>}
        {showAllData === undefined && <h1>Loading....</h1>}
        {showAllData && showAllData.map((data,index) => {
          return (
            <div key={index} style={{ margin:"10px 0" }}>
              {data.id}
              {". "}
              {data.id_karyawan}
              {" "}
              {data.jam_datang}
              {" "}
              {data.jam_pulang}
              {/* {data.jam_datang / 1000}
              {data.jam_datang / 100 % 10}
              {":"}
              {data.jam_datang / 10 % 100}
              {data.jam_datang / 1 % 1000} */}
              {/* {data.jam_pulang / 1000}
              {data.jam_pulang / 100 % 10}
              {":"}
              {data.jam_pulang / 10 % 100}
              {data.jam_pulang / 1 % 1000} */}
            </div>
          )
        })}
      </div>
     
    </div>
  );
}
