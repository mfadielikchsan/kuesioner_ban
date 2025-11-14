import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://eysofbxczoaesihxpelb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5c29mYnhjem9hZXNpaHhwZWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjM4MjIsImV4cCI6MjA3ODYzOTgyMn0.X4Nec16yXjcrQtpUzAlkwJDgQKHKz8lqU4WF7kjp2KU"
);

// =========================
// Load Provinces
// =========================
fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
  .then(res => res.json())
  .then(data => {
    const region = document.getElementById("region");
    region.innerHTML = `<option value="">Pilih Provinsi</option>`;

    data.forEach(p => {
      region.innerHTML += `<option value="${p.name}">${p.name}</option>`;
    });
  });

// =========================
// Slider Live Value
// =========================
const sliders = ["dd", "dc", "dg", "bd", "bc", "bg"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const output = document.getElementById(id + "_val");
  output.textContent = slider.value;
  slider.oninput = () => output.textContent = slider.value;
});

// =========================
// Submit with SweetAlert
// =========================
document.getElementById("submit").onclick = async () => {

  if (!gender.value) {
    Swal.fire("Error", "Silakan pilih jenis kelamin.", "error");
    return;
  }

  if (!region.value) {
    Swal.fire("Error", "Silakan pilih provinsi.", "error");
    return;
  }

  // Confirm
  const confirm = await Swal.fire({
    title: "Apakah data sudah benar?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, kirim",
    cancelButtonText: "Batal"
  });

  if (!confirm.isConfirmed) return;

  const data = {
    gender: gender.value,
    region: region.value,
    dunlop_durability: +dd.value,
    dunlop_comfort: +dc.value,
    dunlop_grip: +dg.value,
    bridge_durability: +bd.value,
    bridge_comfort: +bc.value,
    bridge_grip: +bg.value
  };

  const { error } = await supabase.from("responses").insert([data]);

  if (error) {
    Swal.fire("Gagal", error.message, "error");
  } else {
    Swal.fire("Berhasil!", "Terima kasih, data berhasil dikirim!", "success");
  }
};
