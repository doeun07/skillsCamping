/**
 * 메인 페이지 슬라이드 (자동 슬라이드, 일시 정지, 재개 기능 구현)
 */
function carouselSlide() {
  //new bootstrap
  const myCarouselElement = document.querySelector(
    "#carouselExampleIndicators"
  );
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000,
    pause: false,
  });
}

function pauseCarousel() {
  const myCarouselElement = document.querySelector(
    "#carouselExampleIndicators"
  );
  $(myCarouselElement).carousel("pause");
}

function playCarousel() {
  const myCarouselElement = document.querySelector(
    "#carouselExampleIndicators"
  );
  $(myCarouselElement).carousel("cycle");
}

// [예약 페이지 JS]
//Reservation.html
function reservation() {
  //JSON 파일에서 데이터 불러오기
  async function fetchReservation() {
    const getReservationJSON = await fetch("http://localhost/api/reservation");
    const reservationJSON = await getReservationJSON.json();
    // console.log(reservationJSON["reservition"]);

    return reservationJSON;
  }
  //test code
  // const reservationData = fetchReservation();
  // console.log(reservationData);

  const resDateTableElem = document.querySelector("#resDateTable");
  for (let i = 0; i < 14; i++) {
    // 날짜&요일 가져오기
    const date = new Date();
    date.setDate(date.getDate() + i);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const week = date.getDay();
    // const weekToString = ((week == 0) || (week == 6)) ? "주말" : "주중";
    //(조건식 ? 참일 때의 값 : 거짓일 때의 값;)
    // console.log(`${year}.${month}.${day} (${week})`);

    // 토요일, 일요일 구분 출력
    if (week == 0) {
      resDateTableElem.innerHTML += `<th id="D+${i}" class="sun">${year}.${month}.${day}</th>`;
    } else if (week == 6) {
      resDateTableElem.innerHTML += `<th id="D+${i}" class="sat">${year}.${month}.${day}</th>`;
    } else {
      resDateTableElem.innerHTML += `<th id="D+${i}">${year}.${month}.${day}</th>`;
    }

    //날짜 Table로 출력
    // resDateTableElem.innerHTML += `<th>${year}.${month}.${day}</th>`;
  }
  // 표 만들기
  for (let i = 0; i < 14; i++) {
    for (let k = 0; k < 17; k++) {
      document.querySelector(`#row${k}`).innerHTML += `<td></td>`;
    }
  }
  async function updateReservation() {
    const reservation = await fetchReservation();

    // console.log(reservation[0]["D+0"][0]["status"]);
    // 예약 현황 구분하여 아이콘으로 표에 나타내기
    let count = 0;
    for (let i = 0; i < 14; i++) {
      for (let k = 0; k < 17; k++) {
        const data = reservation[count]["status"];
        const tdElem = document.querySelector(
          `#row${k} > td:nth-of-type(${i + 1})`
        );
        console.log(data);

        if (data == "W") {
          tdElem.innerText = "●";
          tdElem.className = `W D+${i} ${k}`;
          tdElem.addEventListener("click", yaeyak);
        } else if (data == "R") {
          tdElem.innerText = "▲";
          tdElem.className = `R D+${i} ${k}`;
          tdElem.addEventListener("click", noyaeyak);
        } else {
          tdElem.innerText = "■";
          tdElem.className = `C D+${i} ${k}`;
          tdElem.addEventListener("click", noyaeyak);
          // document.querySelector(`#row${i}`).innerHTML += `<td>${reservation[j][`D+${j}`][i]["status"]}</td>`;
        }
        count++;
      }
    }
  }
  // 5초마다 updateReservation 함수를 호출
  setInterval(() => {
    updateReservation();
  }, 5000);
  // 최초 접속 시 updateReservation을 즉시 호출하여 페이지를 렌더링
  updateReservation();
  //천단위 구분기호
}

let dDay = "";
let position = "";
let price = "";

//예약 modal 띄우기
function yaeyak() {
  //디데이 설정
  dDay = this.classList[1];

  const rowValue = this.classList[2];
  if (rowValue <= 6) {
    position = "A" + ("0" + (Number(rowValue) + 1)).slice(-2);
  } else {
    position = "T" + ("0" + (Number(rowValue) - 6)).slice(-2);
  }

  // console.log(position);
  document.querySelector("#position").innerText = `자리 : ${position}`;
  $("#exampleModalLive").modal("show");

  //아이디가 this.classList[1]인 Elem의 class 값을 가져와서 week 변수에 저장
  const week = document.getElementById(`${this.classList[1]}`).className;
  //주말, 평일 / A, T 영역 구분
  if (week != "") {
    if (position.includes("A")) {
      price = 30000;
    } else {
      price = 20000;
    }
  } else {
    if (position.includes("A")) {
      price = 25000;
    } else {
      price = 15000;
    }
  }
  //toLocaleString => 금액 천 단위 구분 기호(,)
  document.querySelector("#position").innerText = `날짜 : ${position}`;
  document.querySelector(
    "#price"
  ).innerText = `금액 : ${price.toLocaleString()}원`;

  $("#exampleModalLive").modal("show");
}

function noyaeyak() {
  alert("예약하실 수 없습니다.");
}

// 휴대폰번호 정규표현식으로 3-4-4 만들기
const regexPhonNumber = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{3})(\d{4})(\d{4})/, `$1-$2-$3`);
};
// 인증번호 정규표현식
const regexVerifyNumber = (target) => {
  target.value = target.value.replace(/[^0-9]/g, "");
};

//인증번호 칸 활성화 조건
function sendVerifyNumber() {
  if (document.querySelector("#phoneNumber").value.length == 13) {
    document.querySelector("#phoneVerify").disabled = false;
  } else {
    alert("휴대폰 번호를 확인해 주세요");
  }
}

//예약 조건
function reservationSubmit() {
  const name = document.querySelector("#name").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const phoneVerify = document.querySelector("#phoneVerify").value;

  if (!name) {
    return alert("이름을 확인하여 주시기 바랍니다.");
  }
  if (phoneNumber.length != 13) {
    return alert("전화번호를 확인하여 주시기 바랍니다.");
  }
  if (phoneVerify != "1234") {
    return alert("인증번호를 확인하여 주시기 바랍니다.");
  }
  // 관리자 번호 사용 불가
  if (phoneNumber == "000-0000-0000") {
    return alert("이 전화번호를 사용하실 수 없습니다.");
  }

  $("#exampleModalLive").modal("hide");
  // 예약 정보 넘기기
  $.post("./api/createReservation", {
    username: name,
    phone_num: phoneNumber,
    position: position,
    date: dDay,
    price: price,
    // 중복 예약 불가
  }).done(function (data) {
    if (data == "정상적으로 등록되었습니다.") {
      showToast();
    } else {
      alert(data);
    }
  });
}

//Toast 띄우기
function showToast() {
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

// [마이페이지 JS]
const babiqGrillPrice = 10000;
const pigBabiqPrice = 12000;
const haesanBabiqPrice = 15000;
const juicePrice = 3000;
const sojuPrice = 5000;
const gajaSetPrice = 4000;

// const orderArr = [0, 0, 0, 0, 0, 0];
// let totalPrice = 0;

//가격 받아오기
function setPrice(orderArr) {

  const babiqGrillTotal = babiqGrillPrice * orderArr[0];
  const pigBabiqTotal = pigBabiqPrice * orderArr[1];
  const haesanBabiqTotal = haesanBabiqPrice * orderArr[2];
  const juiceTotal = juicePrice * orderArr[3];
  const sojuTotal = sojuPrice * orderArr[4];
  const gajaSetTotal = gajaSetPrice * orderArr[5];
  const totalPrice =
    babiqGrillTotal +
    pigBabiqTotal +
    haesanBabiqTotal +
    juiceTotal +
    sojuTotal +
    gajaSetTotal;
  return [
    babiqGrillTotal,
    pigBabiqTotal,
    haesanBabiqTotal,
    juiceTotal,
    sojuTotal,
    gajaSetTotal,
    totalPrice,
  ];
  //소계금액
  // document.querySelector("#babiqGrillTotal").innerText = `${babiqGrillTotal.toLocaleString()}원`;
  // document.querySelector("#pigBabiqTotal").innerText = `${pigBabiqTotal.toLocaleString()}원`;
  // document.querySelector("#haesanBabiqTotal").innerText = `${haesanBabiqTotal.toLocaleString()}원`;
  // document.querySelector("#juiceTotal").innerText = `${juiceTotal.toLocaleString()}원`;
  // document.querySelector("#sojuTotal").innerText = `${sojuTotal.toLocaleString()}원`;
  // document.querySelector("#gajaSetTotal").innerText = `${gajaSetTotal.toLocaleString()}원`;
}

let res_idx;

//주문 modal 띄우기
function babiqOrderModal(elem) {
  const positionElem = document.querySelector("#BabiqOrderModal #position");
  res_idx = elem.parentElement.parentElement.className;
  const position = elem.parentElement.parentElement.id;
  positionElem.innerText = `자리 : ${position}`;

  $("#BabiqOrderModal").modal("show");
}
let orderArr = [0, 0, 0, 0, 0, 0];
function updateBabiqTotslPrice(product) {
  switch (product.id) {
    case 'babiqGrill':
      orderArr[0] = product.value;
      break;
    case 'pigBabiq':
      orderArr[1] = product.value;
      break;
    case 'haesanBabiq':
      orderArr[2] = product.value;
      break;
    case 'juice':
      orderArr[3] = product.value;
      break;
    case 'soju':
      orderArr[4] = product.value;
      break;
    case 'gajaSet':
      orderArr[5] = product.value;
      break;
  }

  const totalPrice = setPrice(orderArr)[6];
  document.querySelector("#totalPrice").innerText = `총 주문 금액 : ${totalPrice.toLocaleString()}원`
}
//modal 닫고 주문 건수 올리기
function babiqSubmit(elem) {
  console.log(elem.classList);
  $.post("./api/babiq", {
    res_idx: res_idx,
    orderArr: orderArr,
  }).done(function (result) {
    document.querySelector(`#totalOrder${res_idx}`).innerHTML = result;
  });
  $("#BabiqOrderModal").modal("hide");
  alert("주문이 완료되었습니다.");
}

//주문내역보기 Modal
function babiqOrderCheck(elem) {
  // console.log(elem);
  $("#babiqOrderCheck").modal("show");
  res_idx = elem.parentElement.parentElement.className;
  //모달
  const babiqOrderCheckBody = document.querySelector(
    "#babiqOrderCheck .modal-body"
  );
  babiqOrderCheckBody.innerHTML = "";
  $.get(`./api/babiq?res_idx=${res_idx}`).done(function (result) {
    result.forEach((data) => {
      const orderArrList = JSON.parse(data["orderList"]);
      const prices = setPrice(orderArrList);
      let elemData = "";
      elemData += `<div id="${data["babi_idx"]}" class="babiqLists">`;
      elemData += `<p>바비큐 그릴 대여(도구 및 숯 등 포함) : ${
        orderArrList[0]
      }개 [${prices[0].toLocaleString()}]원</p>`;
      elemData += `<p>돼지고기 바비큐 세트 : ${
        orderArrList[1]
      }세트 [${prices[1].toLocaleString()}]원</p>`;
      elemData += `<p>해산물 바비큐 세트 : ${
        orderArrList[2]
      }세트 [${prices[2].toLocaleString()}]원</p>`;
      elemData += `<p>음료 : ${
        orderArrList[3]
      }병 [${prices[3].toLocaleString()}]원</p>`;
      elemData += `<p>주류 : ${
        orderArrList[4]
      }병 [${prices[4].toLocaleString()}]원</p>`;
      elemData += `<p>과자세트 : ${
        orderArrList[5]
      }세트 [${prices[5].toLocaleString()}]원</p>`;
      elemData += `<h6>총 금액 : ${prices[6].toLocaleString()}원</h6>`;
      elemData += `<span>주문 상태 : ${data["status"]}</span>`;
      if (data["status"] != "취소") {
        elemData += `<button class="btn btn-primary mypage_btn orderCancell" onclick="babiqCancel(this)">주문 취소</button>`;
      }
      elemData += `</div>`;
      babiqOrderCheckBody.innerHTML += elemData;
    });
  });

  //주문내역보기 갯수 및 가격 띄우기
  // document.querySelector("#babiqCheck").innerText = `바비큐 그릴 대여(도구 및 숯 등 포함) : ${orderArr[0]}개`;
  // document.querySelector("#pigBabiqCheck").innerText = `돼지고기 바비큐 세트 : ${orderArr[1]}세트`;
  // document.querySelector("#haesanBabiqCheck").innerText = `해산물 바비큐 세트 : ${orderArr[2]}세트`;
  // document.querySelector("#juiceCheck").innerText = `음료 : ${orderArr[3]}병`;
  // document.querySelector("#sojuCheck").innerText = `주류 : ${orderArr[4]}병`;
  // document.querySelector("#gajaSetCheck").innerText = `과자세트 : ${orderArr[5]}세트`;
  // document.querySelector("#totalPriceCheck").innerText = `총 주문 금액 : ${totalPrice.toLocaleString()}원`;
}

function babiqOrderCheckAdmin(elem) {
  res_idx = elem.parentElement.parentElement.className;
  const babiqOrderCheckBody = document.querySelector(
    "#babiqOrderCheckAdmin .modal-body"
    );
    babiqOrderCheckBody.innerHTML = "";
    $.get(`./api/babiq?res_idx=${res_idx}`).done(function (result) {
      result.forEach((data) => {
        const orderArrList = JSON.parse(data["orderList"]);
        const prices = setPrice(orderArrList);
        let elemData = "";
        elemData += `<div id="${data["babi_idx"]}" class="babiqLists">`;
        elemData += `<p>바비큐 그릴 대여(도구 및 숯 등 포함) : ${
          orderArrList[0]
        }개 [${prices[0].toLocaleString()}]원</p>`;
        elemData += `<p>돼지고기 바비큐 세트 : ${
          orderArrList[1]
        }세트 [${prices[1].toLocaleString()}]원</p>`;
        elemData += `<p>해산물 바비큐 세트 : ${
          orderArrList[2]
        }세트 [${prices[2].toLocaleString()}]원</p>`;
        elemData += `<p>음료 : ${
          orderArrList[3]
        }병 [${prices[3].toLocaleString()}]원</p>`;
        elemData += `<p>주류 : ${
          orderArrList[4]
        }병 [${prices[4].toLocaleString()}]원</p>`;
        elemData += `<p>과자세트 : ${
          orderArrList[5]
        }세트 [${prices[5].toLocaleString()}]원</p>`;
        elemData += `<h6>총 금액 : ${prices[6].toLocaleString()}원</h6>`;
        elemData += `<button class="btn btn-primary mypage_btn orderCancell" onclick="babiqCancel(this)">주문 취소<button>`;
        elemData += `<button class="btn btn-primary mypage_btn orderCancell" onclick="babiqDeliveryOk(this)">배달완료<button>`;
        elemData += `<span>주문 상태 : ${data["status"]}</span>`;
        elemData += `</div>`;
        babiqOrderCheckBody.innerHTML += elemData;
      });
      $("#babiqOrderCheckAdmin").modal("show");
  });

  //주문내역보기 갯수 및 가격 띄우기
  // document.querySelector("#babiqCheck").innerText = `바비큐 그릴 대여(도구 및 숯 등 포함) : ${orderArr[0]}개`;
  // document.querySelector("#pigBabiqCheck").innerText = `돼지고기 바비큐 세트 : ${orderArr[1]}세트`;
  // document.querySelector("#haesanBabiqCheck").innerText = `해산물 바비큐 세트 : ${orderArr[2]}세트`;
  // document.querySelector("#juiceCheck").innerText = `음료 : ${orderArr[3]}병`;
  // document.querySelector("#sojuCheck").innerText = `주류 : ${orderArr[4]}병`;
  // document.querySelector("#gajaSetCheck").innerText = `과자세트 : ${orderArr[5]}세트`;
  // document.querySelector("#totalPriceCheck").innerText = `총 주문 금액 : ${totalPrice.toLocaleString()}원`;
}

function babiqCancel(elem) {
  const babi_idx = elem.parentElement.id;
  $.post("./api/babiq", {
    babi_idx: babi_idx,
    is_deleted: true,
  }).done(function (data) {
    console.log(data);
    if (data == "취소 되었습니다.") {
      alert("정상적으로 취소되었습니다.");
      location.href = "";
    } else {
      alert("오류 발생, 취소 안됨");
    }
  });
  console.log(babi_idx);
}

function babiqDeliveryOk(elem) {
  const babi_idx = elem.parentElement.id;
  $.post("./api/babiq", {
    babi_idx: babi_idx,
    is_delivery: true,
  }).done(function (data) {
    if (data == "배달 되었습니다.") {
      alert("정상적으로 배달되었습니다.");
      location.href = "";
    } else {
      alert("오류 발생, 배달 안됨");
    }
  });
  console.log(babi_idx);
}

//예약취소
function reservationCancell(jari) {
  const trElem = jari.parentElement.parentElement;
  const position = trElem.getElementsByTagName("td")[1].innerText;
  const cancell = prompt(
    `${position} 자리의 예약을 취소하시려면 '예'를 입력해주세요.`
  );
  if (cancell == "예") {
    trElem.innerHTML = "";
    alert("예약이 취소되었습니다.");
  } else {
    alert("예약 취소 실패");
  }
}

//관리자 페이지 예약 승인 및 취소 함수
function yaeyakOk(elem) {
  const res_idx = elem.parentElement.parentElement.className;
  $.post("./api/admin", {
    command: "yaeyakOk",
    res_idx: res_idx,
  }).done(function (result) {
    if (result == "예약 승인되었습니다.") {
      alert(result);
      location.href = "";
    } else {
      alert(result);
    }
  });
}

function yaeyakNo(elem) {
  const res_idx = elem.parentElement.parentElement.className;
  $.post("./api/admin", {
    command: "yaeyakNo",
    res_idx: res_idx,
  }).done(function (result) {
    if (result == "예약 취소되었습니다.") {
      alert(result);
      location.href = "";
    } else {
      alert(result);
    }
  });
}

function yaeyakDateStartAndEndFetchAndPrint() {
  const startDate = document.querySelector("#start").value;
  const endDate = document.querySelector("#end").value;
  location.href = `./admin?reservation&start=${startDate}&end=${endDate}`
  console.log(startDate, endDate);
}

function setupyaeyakDateStartAndEnd() {
  const startElem = document.querySelector("#start");
  const endElem = document.querySelector("#end");
  //startElem 영역
  let date = new Date();
  for (let i = 0; i < 14; i++) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    startElem.innerHTML += `<option id="start${i}" value="${i}">${year}-${month}-${day}</option>`;
    date.setDate(date.getDate() + 1);
  }

  //endElem 영역
  date = new Date();
  for (let i = 0; i < 13; i++) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    endElem.innerHTML += `<option id="end${i}" value="${i}">${year}-${month}-${day}</option>`;
    date.setDate(date.getDate() + 1);
  }
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  endElem.innerHTML += `<option id="end13" value="13" selected>${year}-${month}-${day}</option>`;

  const url = new URLSearchParams(window.location.search);
  if (url.get("start")) {
    const start = url.get("start");
    const end = url.get("end");
    const startSelectElem = document.querySelector(`#start${start}`);
    const endSelectElem = document.querySelector(`#end${end}`);
    startSelectElem.selected = true;
    endSelectElem.selected = true;
  }
}

