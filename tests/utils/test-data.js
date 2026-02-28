/**
 * Test Data - Tập trung quản lý dữ liệu test
 */
const testData = {
  // Form Authentication (the-internet.herokuapp.com)
  login: {
    valid: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!',
    },
    invalid: {
      username: 'wronguser',
      password: 'wrongpass',
    },
  },
};

module.exports = testData;
