
/**
 * 메인 페이지 슬라이드 (자동 슬라이드, 일시 정지, 재개 기능 구현)
 */
function carouselSlide() {
    //new bootstrap
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 2000,
        pause: false,
    });

}

function pauseCarousel() {
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    $(myCarouselElement).carousel('pause');
}

function playCarousel() {
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    $(myCarouselElement).carousel('cycle');
}

//Reservation
function reservation() {
    //JSON 파일에서 데이터 불러오기
    async function fetchReservation() {
        const getReservationJSON = await fetch("../api/reservation.json");
        const reservationJSON = await getReservationJSON.json();
        console.log(reservationJSON["reservition"]);

        return reservationJSON["reservition"];
    }

    //test code
    // const reservationData = fetchReservation();
    // console.log(reservationData);  
} 