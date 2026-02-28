const { test, expect } = require('@playwright/test');
const AddRemovePage = require('../pages/AddRemovePage');

/**
 * Thực hành: Add/Remove Elements (Dynamic elements)
 * https://the-internet.herokuapp.com/add_remove_elements/
 */
test.describe('Add/Remove Elements', () => {
  test('thêm và xóa element động', async ({ page }) => {
    const addRemovePage = new AddRemovePage(page);
    await addRemovePage.navigate();

    // Add 3 elements
    await addRemovePage.addElement();
    await addRemovePage.addElement();
    await addRemovePage.addElement();

    expect(await addRemovePage.getDeleteButtonsCount()).toBe(3);

    // Remove 1 element
    await addRemovePage.removeElement(0);
    expect(await addRemovePage.getDeleteButtonsCount()).toBe(2);
  });
});
