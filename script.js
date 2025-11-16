import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://eysofbxczoaesihxpelb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5c29mYnhjem9hZXNpaHhwZWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjM4MjIsImV4cCI6MjA3ODYzOTgyMn0.X4Nec16yXjcrQtpUzAlkwJDgQKHKz8lqU4WF7kjp2KU"
);

// AMBIL SEMUA INPUT
const nameInput = document.getElementById("name");
const ds = document.getElementById("ds");
const dc = document.getElementById("dc");
const dn = document.getElementById("dn");
const ks = document.getElementById("ks");
const kc = document.getElementById("kc");
const kn = document.getElementById("kn");

// Submit
document.getElementById("submit").onclick = async () => {

  if (!nameInput.value.trim()) {
    Swal.fire("Error", "Silakan masukkan nama.", "error");
    return;
  }

  const allInputs = [ds, dc, dn, ks, kc, kn];

  for (let i of allInputs) {
    if (i.value < 0 || i.value > 100 || i.value === "") {
      Swal.fire("Error", "Nilai harus antara 0 hingga 100.", "error");
      return;
    }
  }

  const confirm = await Swal.fire({
    title: "Apakah data sudah benar?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, kirim",
    cancelButtonText: "Batal"
  });

  if (!confirm.isConfirmed) return;

  const data = {
    name: nameInput.value.trim(),
    dunlop_speedtest: +ds.value,
    dunlop_comfort: +dc.value,
    dunlop_noise: +dn.value,
    komp_speedtest: +ks.value,
    komp_comfort: +kc.value,
    komp_noise: +kn.value
  };

  const { error } = await supabase.from("responses").insert([data]);

  if (error) {
    Swal.fire("Gagal", error.message, "error");
  } else {
    Swal.fire("Berhasil!", "Terima kasih, data berhasil dikirim!", "success");
  }
};
