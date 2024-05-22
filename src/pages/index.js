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

  const handleUpdate = (id) => {
    fetch(`/api/updateData?id=${id}`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        jam_pulang: (new Date()).getHours() + ":" + String((new Date()).getMinutes()).padStart(2,"0")
      })
    })
    .then((res) =>  res.json())
    .then((data) => {
      console.log(data.data)
      alert("Sampai Jumpa")
      router.reload()
    })
    .catch((err) => {
      alert("Eror ", err.message)
    })
  }

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
              {!data.jam_pulang && (
                  <button onClick={() => {
                    handleUpdate(data.id)
                  }}>Pulang</button>
              )}
            </div>
          )
        })}
      </div>
     
    </div>
  );
}
