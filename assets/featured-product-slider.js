if (!customElements.get("m-featured-slider")) {
  class MFeaturedSlider extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        sliderContainer: ".m-featured-slider__products",
        slideImages: ["m-featured-slider__img"],
        slideImagesContainer: ".m-featured-slider__images",
        sliderControls: ".m-slider-controls",
        prevBtn: ".m-slider-controls__button-prev",
        nextBtn: ".m-slider-controls__button-next",
      };
      this.domNodes = queryDomNodes(this.selectors, this);
    }

    connectedCallback() {
      console.log('Slider connected')
      this.initSlider();
    }

    setInitialHeight() {
      // Get the aspect ratio from data attribute or default to 1:1
      const aspectRatio = this.dataset.aspectRatio || '100%';

      // Set a fixed height container for both sliders
      [this.domNodes.sliderContainer, this.domNodes.slideImagesContainer].forEach(container => {
        if (container) {
          container.style.position = 'relative';
          container.style.paddingBottom = aspectRatio;
          container.style.height = '0';

          // Make slides absolute positioned within container
          const slides = container.querySelectorAll('.swiper-slide');
          slides.forEach(slide => {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
          });
        }
      });
    }

    initSlider() {
      const showNavigation = this.dataset.showNavigation === "true";
      const showPagination = this.dataset.showPagination === "true";
      const autoplay = this.dataset.autoplay === "true";
      const timeout = this.dataset.timeout;

      this.slider = new MinimogLibs.Swiper(this.domNodes.sliderContainer, {
        speed: 400,
        loop: false,
        autoplay: autoplay
          ? {
            delay: parseInt(timeout),
            disableOnInteraction: false,
          }
          : false,
        pagination: showPagination
          ? {
            el: this.querySelector(".swiper-pagination"),
            type: "bullets",
            clickable: true,
          }
          : false,
        on: {
          init: () => {
            if (showNavigation) {
              if (this.domNodes.prevBtn) this.domNodes.prevBtn.addEventListener("click", () => this.slider.slidePrev());
              if (this.domNodes.nextBtn) this.domNodes.nextBtn.addEventListener("click", () => this.slider.slideNext());
            }
          },
        },
      });

      // Sync 2 sliders
      this.imageSlider = new MinimogLibs.Swiper(this.domNodes.slideImagesContainer, {
        speed: 500,
        loop: false,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
      });

      this.slider.on("activeIndexChange", (swiper) => {
        const { realIndex, activeIndex } = swiper;
        this.imageSlider.slideTo(activeIndex);
      });

      this.imageSlider.on("activeIndexChange", (swiper) => {
        const { realIndex, activeIndex } = swiper;
        this.slider.slideTo(activeIndex);
      });

      if (Shopify.designMode) {
        document.addEventListener("shopify:block:select", (e) => this.onBlockSelect(e));
      }
    }

    onBlockSelect(evt) {
      const block = evt.target;
      const index = Number(block.dataset.index);
      if (this.slider) this.slider.slideToLoop(index);
      if (this.imageSlider) this.imageSlider.slideToLoop(index);
    }
  }

  customElements.define("m-featured-slider", MFeaturedSlider);
}
