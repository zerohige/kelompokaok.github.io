function calculateSeconds() {
  var daysInput = document.getElementById("days").value;
  var hoursInput = document.getElementById("hours").value;
  var minutesInput = document.getElementById("minutes").value;

  // Validasi input agar hanya menerima angka
  var days = /^\d+$/.test(daysInput) ? parseInt(daysInput) : 0;
  var hours = /^\d+$/.test(hoursInput) ? parseInt(hoursInput) : 0;
  var minutes = /^\d+$/.test(minutesInput) ? parseInt(minutesInput) : 0;

  var dayProcess = "Jumlah Hari Hari x 24 x 60 x 60 = " + (days * 24 * 60 * 60).toLocaleString()+" detik";
  var hourProcess = "Jumlah Jam Jam x 60 x 60 = " + (hours * 60 * 60).toLocaleString()+ " detik"; 
  var minuteProcess = "Jumlah Menit Menit x 60 = " + (minutes * 60).toLocaleString()+" detik";

  // Menampilkan Proses
  document.getElementById("day-process").innerHTML = dayProcess.replace("Jumlah Hari", days) ;
  document.getElementById("hour-process").innerHTML = hourProcess.replace("Jumlah Jam", hours);
  document.getElementById("minute-process").innerHTML = minuteProcess.replace("Jumlah Menit", minutes);

  var totalSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60);
  document.getElementById("result").innerHTML = "Total : " + totalSeconds.toLocaleString()+ " Detik";
  
  // Menambahkan tombol reset
  var resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  resetButton.onclick = function() {
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("day-process").innerHTML = "";
    document.getElementById("hour-process").innerHTML = "";
    document.getElementById("minute-process").innerHTML = "";
    document.getElementById("result").innerHTML = "";
  };

  document.getElementById("reset-container").innerHTML = "";
  document.getElementById("reset-container").appendChild(resetButton);
}
