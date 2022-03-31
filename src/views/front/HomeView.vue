<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 350px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center center;
        opacity: 0.3;
      "
      :style="{ backgroundImage: `url(${BannerImage})` }"
    ></div>
    <h2 class="fw-bold">美麗雙手，自信人生</h2>
  </div>
  <div class="container">
    <h1 class="mt-5">最新款式</h1>
    <!-- 迷思、預約 -->
    <div class="row row-cols-1 row-cols-md-2 mt-5">
      <div class="col">
        <img class="img-fluid" src="@/assets/img/index_img.jpg" alt="" />
      </div>

      <div
        class="col d-flex flex-column justify-content-center"
        style="line-height: 1.5; letter-spacing: 0.15rem"
      >
        <div class="fs-5 text-secondary">凝膠指甲迷失</div>
        <ul class="list-unstyled d-grid text-start">
          <li>迷失1 ：指甲泛黃是因為缺氧?</li>
          <li>
            NO!!
            卸除光療指甲、指甲油後，若發現指甲泛黃，原因並不是因為缺氧，而是因為指甲油色素所致。
          </li>
          <li>解：塗上護甲隔離油，可以防止指甲油色素沉澱。</li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li>迷失2 ：指甲需要呼吸嗎?</li>
          <li>
            指甲跟頭髮一樣，表面並沒有氣孔，也沒有新陳代謝的功能，所以不需要呼吸新鮮的空氣。
          </li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li>迷失3 ：美甲維持越久品質越好?</li>
          <li>
            不是維持越久越好，指甲過久未卸除，反而會容易造成指甲斷裂或繼續滋長。
          </li>
          <li>
            建議：當出現裂縫或缺角時，就可以去卸除指甲，避免發炎或甲面龜裂。
          </li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li>
            溫馨提醒：凝膠施做完1周內，為熊貓指甲保固期，若因非人為因素可回來補，3-4周的凝膠就可以回來卸除換新，因每個人生活習慣工作的不同，維持度的時間難免會不同，不是每個人都可以超過5周，甚至一個月半才來換甲，且常常得指甲會形成翹翹板的樣子，這樣本甲支撐的壓力很大，更可能會直接段到肉肉那邊噢。
          </li>
        </ul>
        <br />
      </div>

      <div
        class="col d-flex flex-column justify-content-center"
        style="line-height: 1.5; letter-spacing: 0.15rem"
      >
        <div class="fs-5 text-secondary">預約注意事項</div>
        <ul class="list-unstyled d-grid">
          <li>到達時請發訊息+按電鈴</li>

          <li>提前到最多10分鐘</li>

          <li>會提前超過10分鐘以上請一個小時告知</li>
          <li>若時間能配會主動發訊息通知</li>
          <li>若沒發訊息通知就無法讓預約提前就照原定的時間</li>

          <li>遲到10分鐘改單色</li>
          <li>遲到15分鐘取消預約</li>

          <li>以上壓線就執行 請各位準時抵達</li>
          <li>若不讀不回直接黑名單</li>
        </ul>
        <br />
      </div>

      <div class="col">
        <img class="img-fluid" src="@/assets/img/index_img.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import BannerImage from '@/assets/img/banner3.jpg'
export default {
  data () {
    return {
      BannerImage: BannerImage
    }
  }
}
</script>
