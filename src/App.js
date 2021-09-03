console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.darkMode = new DarkModeToggle({
      $target,
    });
    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.searchResult.isLoadding();
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
      onRandomSearch: () => {
        this.searchResult.isLoadding();
        api.fetchRandomCats().then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (id) => {
        this.imageInfo.isLoadding();
        api.fetchCatsModalData(id).then(({ data }) =>
          this.imageInfo.setState({
            visible: true,
            image: data,
          })
        );
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
    this.setSessionState();
  }
  setSessionState() {
    if (!sessionStorage.getItem("prevData")) {
      return;
    } else {
      this.setState(JSON.parse(sessionStorage.getItem("prevData")));
    }
  }
  setState(nextData) {
    this.data = nextData;
    sessionStorage.setItem("prevData", JSON.stringify(nextData));
    nextData?.length > 0
      ? this.searchResult.setState(nextData)
      : this.searchResult.noSearchData();
  }
}