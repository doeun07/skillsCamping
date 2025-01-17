<!--Slide Start-->
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
      aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
      aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
      aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./assets/slide1.jpg" width="800" height="400" class="bd-placeholder-img-lg d-block w-100" color="#555"
        background="#777" text="First slide">
    </div>
    <div class="carousel-item">
      <img src="./assets/slide2.jpg" placeholder width="800" height="400" class="bd-placeholder-img-lg d-block w-100"
        color="#444" background="#666" text="Second slide">
    </div>
    <div class="carousel-item">
      <img src="./assets/slide3.jpg" placeholder width="800" height="400" class="bd-placeholder-img-lg d-block w-100"
        color="#333" background="#555" text="Third slide">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<!--Slide End-->

<div class="controlBtns">
  <button type="button" class="btn btn-primary btn-sm" onclick="pauseCarousel()">일시정지</button>
  <button type="button" class="btn btn-primary btn-sm" onclick="playCarousel()">재개</button>
</div>



<div class="main">
  <div class="main_cm">
    <img class="main_img" src="./assets/캠핑장구성.jpg" alt="">
    <div>
      <p class="h4">캠핑장 구성</p>
      <p class="h6">
        - 텐트데크(3m X 5m) : 10 개소<br>
        - 오토캠핑(5m X 8m) : 7 개소
      </p>
    </div>
  </div>
  <div class="main_cm" id="main_1">
    <img class="main_img" src="./assets/부대시설.jpg" alt="">
    <div>
      <p class="h4">부대시설</p>
      <p class="h6">
        - 관리소, 취사장, 세면장<br>
        - 화장실, 포토존, 전망대<br>
        - 잔디밭, 어린이놀이터
      </p>
    </div>
  </div>
</div>
<div class="main">
  <div class="main_cm">
    <img class="main_img" src="./assets/캠핑장예약.jpg" alt="">
    <div>
      <p class="h4">캠핑장 예약</p>
      <p class="h6">
        - 캠핑장 예약은 당일부터 2주간 가능<br>
        - 캠핑장 입영은 예약한 날의 14시부터 가능<br>
        - 당일 예약의 경우 17시부터 입영 가능
      </p>
    </div>
  </div>
  <div class="main_cm" id="main_2">
    <img class="main_img" src="./assets/예약문의.jpg" alt="">
    <div>
      <p class="h4">예약문의</p>
      <p class="h6">
        - 전화번호 : 041-987-1234<br>
        - 운영시간<br>
        평일 09:00 ~ 18:00 <br>
        주말 10:00 ~ 15:00 <br>
        점심시간 12:30 ~ 13:30 <br>
      </p>
    </div>
  </div>
</div>

<div class="location">
  <p class="h2">오시는 길</p>
  <img class="location_img" src="./location.jpg" alt="">
</div>
<script>
  carouselSlide();
</script>