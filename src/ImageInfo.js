class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.$loading = document.createElement("div");
    this.$loading.style.display = "none";
    this.$loading.innerText = "Loading..";
    this.$loading.classList.add("modal-loading");
    $target.appendChild(this.$loading);
    $target.appendChild($imageInfo);
    this.hide = this.hide.bind(this);
    this.hidePressEscKey = this.hidePressEscKey.bind(this);
    this.hideOutSideClick = this.hideOutSideClick.bind(this);
    this.data = data;
    this.render();
  }
  isLoadding() {
    this.$loading.style.display = "block";
  }
  setState(nextData) {
    this.data = nextData;
    console.log(nextData);

    this.render();
  }

  render() {
    if (this.data.visible) {
      this.$loading.style.display = "none";

      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
      setTimeout(() => {
        this.$imageInfo.classList.add("modal-open");
      }, 10);
      this.bindCloseEvent();
      this.scrollHidden();
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
  scrollHidden() {
    document.body.classList.add("scroll-hidden");
  }

  removeEvent() {
    this.$imageInfo.querySelector(".close").removeEventListener('click', this.hide)

    window.removeEventListener("keydown", this.hide);
    window.removeEventListener("click", this.hide);
  }
  hide() {
    console.log('click');
    this.removeEvent();
    document.body.classList.remove("scroll-hidden");
    setTimeout(() => {
      this.$imageInfo.style.display = "none";
    }, 1000);
    this.$imageInfo.classList.remove("modal-open");
  }
  hidePressEscKey(e){
    console.log('click');
    if (e.keyCode == 27) {
      this.hide();
    }
  }
  hideOutSideClick(e){
    if (e.target == this.$imageInfo) {
      this.hide();
    }
  }
  /*
  이벤트 리무브가 안됨. 중첩해서 계속 생성됨.
  */
  bindCloseEvent() {
    this.$imageInfo.querySelector(".close").addEventListener("click", this.hide);
    window.addEventListener("keydown", this.hidePressEscKey);
    window.addEventListener("click", this.hideOutSideClick);
  }
}