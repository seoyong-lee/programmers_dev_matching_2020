class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, getCatsModalData }) {
    this.getCatsModalData = getCatsModalData;
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);
    this.options = {
      rootMargin: "0px",
      threshold: [1.0],
    };
    this.data = initialData;
    this.onClick = onClick;
    this.bindScrollEvent();
    this.render();
  }
  bindScrollEvent() {
    window.onscroll = function (e) {
      console.log("on scroll");
    };
  }
  isLoadding() {
    this.$searchResult.innerHTML = "<h1> Loading </h1>";
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  noSearchData() {
    this.$searchResult.innerHTML = `<h1>No Search Data</h1>`;
  }
  bindHoverEvent() {
    Array.from(this.$searchResult.querySelectorAll(".lazy")).forEach((item) => {
      item.addEventListener("mouseover", (e) => {});
    });
  }
  lazyLoadHandler(entries, observer) {
    console.log(this);
    
    entries.forEach((entry) => {
      console.log(entry.isIntersecting);

      if (entry.isIntersecting) {
        const item = entry.target;
        const image = item.querySelector(".lazy");

        image.src = image.dataset.src;
        image.alt = image.dataset.alt;
        image.classList.remove("data-src");
        image.classList.remove("lazy");
        image.classList.remove("data-alt");
        observer.unobserve(entry.target);
      }
    });
  }
  lazyload() {
    this.items = Array.prototype.slice.call(
      this.$searchResult.querySelectorAll(".item")
    );
    this.imageObserver = new IntersectionObserver(
      this.lazyLoadHandler.bind(this),
      this.options
    );
    this.items.forEach((item) => this.imageObserver.observe(item));
  }
  
  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <div class="item">
            <img class="lazy" data-src=${cat.url} data-alt=${cat.name} />
          </div>
        `
      )
      .join("");
    this.lazyload();
    this.bindHoverEvent();

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        console.log(this.data[index]);

        this.onClick(this.data[index].id);
      });
    });
  }
  
}