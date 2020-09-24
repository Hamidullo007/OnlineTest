let url = "/files";
let urlF = "/api/foydalanuvchilar";
let foydalanuvchiNomi;
let tjs = 0;
let indexA = Math.floor(Math.random() * 10);
let js = 1;
let secund = 0;
let minut = 0;
let savol1, a = 1, savol2, savol3, savol4, savol5, savol6, savol7, savol8, savol9, savol10;
let javob1, javob2, javob3, javob4, javob5, javob6, javob7, javob8, javob9, javob10;
let timeo, interv;

foydalanuvchiNomi = window.prompt("Ismingizni kiriting: ");
$.ajax(urlF).done(function (response) {
  for (let i = 0; i < response.length; i++) {
    if (response[i].nomi == foydalanuvchiNomi) {
      alert("Kechirasiz, bunday nomli foydalanuvchi malumotlar bazasida ro'yxatga olingan!");
      window.location.reload();
      break;
    };
  };
});

let stopT = window.setInterval(function () {
  secund++;
  if (secund === 60) {
    minut++;
    secund = 0;
  };
  if (minut === 60) {
    soat++;
    minut = 0;
  };
}, 1000);

start(indexA);

function time(second) {
  timeo = window.setTimeout(function () {
    $("#autoclick").click();
  }, 31000);

  interv = window.setInterval(function () {
    second--;
    $('.clock').html(`00:00:${second}`);
    if (second <= 10) {
      $('.clock').css("color", "red");
      $('.d').css("color", "red");
    } else if (second <= 20) {
      $('.clock').css("color", "yellow");
      $('.d').css("color", "yellow");
    } else {
      $('.clock').css("color", "green");
      $('.d').css("color", "green");
    };
    if (second == 0) {
      window.clearInterval(interv);
      window.clearTimeout(timeo);
    }
  }, 1000);
}

function clearTimes() {
  window.clearInterval(interv);
  window.clearTimeout(timeo);
}
function start(index) {
  $.ajax(url).done(function (response) {
    ////////////////////////////////////////////////////////////////////////
    getFiles(response, index);
    clearTimes();
    time(31);
  });
}

function javob(indexJ) {
  $.ajax(url).done(function (response) {
    result(response);
  });
  function result(file) {
    switch (js) {
      case 1: {
        savol1 = file[indexJ]._id;
        javob1 = $("input[name=gender]:checked").val();
        break;
      }
      case 2: {
        savol2 = file[indexJ]._id;
        javob2 = $("input[name=gender]:checked").val();
        break;
      }
      case 3: {
        savol3 = file[indexJ]._id;
        javob3 = $("input[name=gender]:checked").val();
        break;
      }
      case 4: {
        savol4 = file[indexJ]._id;
        javob4 = $("input[name=gender]:checked").val();
        break;
      }
      case 5: {
        savol5 = file[indexJ]._id;
        javob5 = $("input[name=gender]:checked").val();
        break;
      }
      case 6: {
        savol6 = file[indexJ]._id;
        javob6 = $("input[name=gender]:checked").val();
        break;
      }
      case 7: {
        savol7 = file[indexJ]._id;
        javob7 = $("input[name=gender]:checked").val();
        break;
      }
      case 8: {
        savol8 = file[indexJ]._id;
        javob8 = $("input[name=gender]:checked").val();
        break;
      }
      case 9: {
        savol9 = file[indexJ]._id;
        javob9 = $("input[name=gender]:checked").val();
        break;
      }
      case 10: {
        savol10 = file[indexJ]._id;
        javob10 = $("input[name=gender]:checked").val();
        break;
      };
    }

    if (js >= 10) {
      let date = new Date();
      var settings = {
        "url": "/api/foydalanuvchilar",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "savol1": savol1, "savol2": savol2, "savol3": savol3, "savol4": savol4, "savol5": savol5,
          "savol6": savol6, "savol7": savol7, "savol8": savol8, "savol9": savol9, "savol10": savol10,
          "javob1": javob1, "javob2": javob2, "javob3": javob3, "javob4": javob4, "javob5": javob5,
          "javob6": javob6, "javob7": javob7, "javob8": javob8, "javob9": javob9, "javob10": javob10,
          "vaqt": date, "nomi": foydalanuvchiNomi
        }),
      };

      $.ajax(settings).done(function (response) {
        $(".yakuniy").html(`
      <div class="jumbotron  mt-5">
        <div class="container">
          <h2 style="text-align: center;">Sizning natijalaringiz: </h2>
          <h4>Foydalanuvchi nomi : ${foydalanuvchiNomi}</h4>
          <h4>Sarflangan vaqt: ${minut} min ${secund} sec</h4>
          <h4>To'g'ri javoblar soni : ${response}</h4>
          <h4>Noto'g'ri javoblar soni : ${10 - response}</h4>
        </div>
      </div>
      `);
        $("#asosiy").css("display", "none");
        $('.d-n').css("display", "none");
      });
    } else {
      //indexJ = Math.random() * 100; // shu joyi o'zgartiriladi
      indexJ = Math.floor(Math.random() * 10);
      start(indexJ);
      js++;
      return;
    }
  }

}


function getFiles(files, index) {
  $("#asosiy").html(`
    <div class="card mb-3 asosiy">
    <div class="card-header" ">
      <div class="card-title"  >
       <h6>${js}-savol: ${files[index].metadata.savol}</h6>
      </div>
    </div>
    <div>
      <img src="image/${files[index].filename}" width="100%" class="img-responsive">
    </div>
    <hr style="margin-bottom: 0;">
      <div class="card-body ml-1">
      <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="customRadio" name="gender" value="${files[index].metadata.variant1}">
        <label style="" class="custom-control-label" for="customRadio"><h6>${files[index].metadata.variant1}</h6></label><br>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="customRadio1" name="gender" value="${files[index].metadata.variant2}">
        <label style="" class="custom-control-label" for="customRadio1"><h6>${files[index].metadata.variant2}</h6></label><br>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="customRadio2"  name="gender" value="${files[index].metadata.variant3}">
        <label style="" class="custom-control-label" for="customRadio2"><h6>${files[index].metadata.variant3}</h6></label><br>
      </div>
      <div class="tj d-none" ></div>
    </div>
    <div class="card-footer">
      <button type="button" id="autoclick" class="btn btn-primary float-right" onclick="javob(${index})">Javob berish</button>
    </div>
  </div>
  <div class="d-n" style="display: inline-block;">
  <i style="display: inline-block;">Vaqtingiz: </i>
  <i style="display: inline-block;" class="clock"></i>
</div>
  <script>
    $(".custom-control").click(function(){
      $(".custom-control").css({'border': '2px solid white', 'color': 'black'});
      $(this).css({'border': '2px solid rgb(18, 34, 255)', 'color': 'rgb(18, 34, 255)'});
    });

  </script>
    `);
}

