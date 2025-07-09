document.querySelectorAll(".accordion-wrap .title").forEach(function (title) {
  title.addEventListener("click", function () {
    const parent = this.parentElement;
    const isActive = parent.classList.contains("active");

    if (isActive) {
      parent.classList.remove("active");
    } else {
      parent.classList.add("active");
      const siblings = Array.from(parent.parentElement.children).filter(
        (el) => el !== parent
      );
      siblings.forEach((sibling) => sibling.classList.remove("active"));
    }
  });
});

function extractPrice(priceText) {
  return parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
}

document.querySelectorAll(".bundle--wrapper--container .m-product-option--node").forEach(function (swatch) {
  swatch.addEventListener("change", function () {
      let regularPriceSum = 0;
      let comparePriceSum = 0;
      let savePriceSum = 0;
      let bundleTotalPrice = document.querySelector(".bundle__total_price .total_price");
      let bundleComparePrice = document.querySelector(".bundle__total_compare_price span");
      let bundleSavePrice = document.querySelector(".bundle__total_save_price span");
    
      document.querySelectorAll(".bundle--wrapper--container .m-price__regular .m-price-item--regular").forEach(function (regular_price) {
        regularPriceSum += extractPrice(regular_price?.textContent || "0");
      });
      document.querySelectorAll(".bundle--wrapper--container .m-price__sale .m-price-item--regular").forEach(function (compare_price) {
        comparePriceSum += extractPrice(compare_price?.textContent || "0");
      });

      const moneyFormat = window.MinimogSettings.money_format;
      if(regularPriceSum > 0 && bundleTotalPrice) bundleTotalPrice.innerHTML= formatMoney((regularPriceSum).toFixed(2), moneyFormat);
      if(comparePriceSum > 0 && bundleComparePrice) bundleComparePrice.innerHTML= formatMoney((comparePriceSum).toFixed(2), moneyFormat);
      if(regularPriceSum > 0 && comparePriceSum > 0) {
        document.querySelector(".bundle__total_save_price").style.display = "block";
        bundleSavePrice.innerHTML= `Save ${formatMoney((comparePriceSum-regularPriceSum).toFixed(2), moneyFormat)}`;
      } else {
        document.querySelector(".bundle__total_save_price").style.display = "none";
      }
  });
});

setTimeout(() => {
  document.querySelectorAll(".bundle--wrapper--container .m-product-option--node").forEach(function (swatch) {
    const event = new Event('change', { bubbles: true });
    swatch.dispatchEvent(event);
  });
}, 1000);


document.querySelector("[data-add-bundle]").addEventListener("click",function(){
    const parentEle = this.closest(".bundle--wrapper--container");
    let buttonsAdd = parentEle.querySelectorAll('product-form button');
    let timer=0;
    buttonsAdd.forEach(function (button) {
      setTimeout(() => {
        button.click();
      }, timer);
      timer += 1500;
  });
});

// Review


const reviewIconEl = document.querySelectorAll(".review_scroll");
reviewIconEl.forEach(function (reviewIconClick) {
  reviewIconClick.addEventListener("click",function(e){
    e.preventDefault();
    const target = document.querySelector(".bazaarvoice-reviews");
    console.log("element-----",target);
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

const reviewBtn = document.querySelector('.review-bottom-text .new-btn');

reviewBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const targetElement = document.getElementById('m-featured-product-template--23705860014327__your_own_bundle_bzCiMK');

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offset = 100; // Offset from top

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
});



