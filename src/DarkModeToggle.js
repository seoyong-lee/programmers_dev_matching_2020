class DarkModeToggle {
  constructor({ $target }) {
    this.$target = $target;
    this.$toggleCheckBox = document.createElement("input");
    this.$toggleCheckBox.className = "checkbox"
    this.$toggleCheckBox.setAttribute("type", "checkbox");
    this.checkDefaultSetting();
    this.bindToggleEvent();
    this.$target.appendChild(this.$toggleCheckBox);
  }
  checkDefaultSetting() {
    this.userPreferSetting = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (this.userPreferSetting) {
      document.body.classList.toggle("dark-theme");
      this.$toggleCheckBox.checked = true;
    }
  }
  bindToggleEvent() {
    this.$toggleCheckBox.addEventListener("click", (e) => {
        document.body.classList.toggle("dark-theme");
    });
  }
}