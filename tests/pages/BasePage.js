/**
 * BasePage - Class cha cho tất cả Page Objects
 * Chứa các method dùng chung
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = BasePage;
