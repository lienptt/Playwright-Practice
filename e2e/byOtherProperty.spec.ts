import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

test('transport registration flow', async ({ page }) => {
  await page.goto('https://logistic.rabbitfly.org/transport-registration', {
    waitUntil: 'domcontentloaded',
  });
  await expect(page).toHaveURL(/transport-registration/);

  //Test data
  const registration = {
    company: {
      name: 'CompanyB',
      email: 'lienptt.test@gmail.com',
      phone: '0987654321',
      contactPerson: 'Lyn test',
      country: 'Vietnam',
      city: 'HCMC',
      address: '1001',
      taxId: '1234',
      notes: 'No',
      preferredContactMethod: 'Phone',
      customerType: 'Individual',
    },
    goods: {
      type: 'Fragile',
      description: 'Checked',
      quantity: '100',
      unitLabel: 'Cartons',
      totalWeightKg: '50',
      totalVolumeCbm: '19.97',
      packagingType: 'Pallet',
      hsCode: '1234.11',
      declaredValue: '1999.97',
      extraLabel: 'Temperature Controlled',
    },
    shipment: {
      transportMode: 'Sea',
      incoterms: 'CIF',
      originLocation: 'Shanghai',
      originCountry: 'CN',
      destinationLocation: 'Rotterdam',
      destinationCountry: 'Netherlands',
      expectedPickupDate: '2026-02-27',
      expectedDeliveryDate: '2026-03-03',
      portOfLoading: '111',
      portOfDischarge: '12',
      deliveryType: 'Port-to-Port',
      customsQuestionYesLabel: 'Yes',
    },
    admin: {
      email: 'huydao@gmail.com',
      password: 'asdEDZ12#',
      orderId: '966d55d6-9588-4a08-8b30-151c378a4e3a'
    },
  };

  const pickComboboxOption = async (combobox: Locator, optionName: string | RegExp) => {
    await combobox.click();
    await page.getByRole('option', { name: optionName }).click();
  };

  // Step 1: Fill registration form
  const companyName = page.getByRole('textbox', { name: 'Company Name' });
  const email = page.getByRole('textbox', { name: 'Email Address' });
  const phone = page.getByRole('textbox', { name: 'Phone Number' });
  const contactPerson = page.getByRole('textbox', { name: 'Contact Person Name' });
  const country = page.getByRole('textbox', { name: 'Country' });
  const city = page.getByRole('textbox', { name: 'City' });
  const address = page.getByRole('textbox', { name: 'Company Address' });
  const taxId = page.getByRole('textbox', { name: 'Tax ID / Business' });
  const nextStep = page.getByRole('button', { name: 'Next Step' });

  await companyName.fill(registration.company.name);
  await email.fill(registration.company.email);
  await phone.fill(registration.company.phone);
  await contactPerson.fill(registration.company.contactPerson);
  await country.fill(registration.company.country);
  await city.fill(registration.company.city);
  await address.fill(registration.company.address);
  await taxId.fill(registration.company.taxId);

  await page.getByText(registration.company.customerType).first().click();
  await pickComboboxOption(
    page.getByRole('combobox', { name: 'Preferred Contact Method' }),
    registration.company.preferredContactMethod,
  );
  await page
    .getByRole('textbox', { name: 'Notes / Special Instructions' })
    .fill(registration.company.notes);
  await nextStep.click();

  // Step 2: Goods info
  await pickComboboxOption(
    page.getByRole('combobox', { name: 'Type of Goods' }),
    registration.goods.type,
  );
  await page
    .getByRole('textbox', { name: 'Goods Description' })
    .fill(registration.goods.description);
  await page
    .getByRole('spinbutton', { name: 'Quantity' })
    .fill(registration.goods.quantity);

  const unitCombo = page.getByRole('combobox').filter({ hasText: 'Unit' });
  await unitCombo.click();
  await page.getByLabel(registration.goods.unitLabel).getByText(registration.goods.unitLabel).click();

  await page
    .getByRole('spinbutton', { name: 'Total Weight (kg)' })
    .fill(registration.goods.totalWeightKg);
  await page
    .getByRole('spinbutton', { name: 'Total Volume (CBM)' })
    .fill(registration.goods.totalVolumeCbm);
  await pickComboboxOption(
    page.getByRole('combobox', { name: 'Packaging Type' }),
    registration.goods.packagingType,
  );
  await page.getByRole('textbox', { name: 'HS Code' }).fill(registration.goods.hsCode);
  await page
    .getByRole('spinbutton', { name: 'Declared Cargo Value' })
    .fill(registration.goods.declaredValue);

  // The original recording referenced local screenshots that aren't in the repo.
  // Use a stable repo file so the test doesn't fail on missing fixtures.
  const uploadFilePath = path.resolve(process.cwd(), 'package.json');
  await page.getByRole('button', { name: 'Image Upload for Goods' }).setInputFiles(uploadFilePath);
  await page.getByRole('button', { name: 'Image Upload for Package' }).setInputFiles(uploadFilePath);

  await page.locator('label').filter({ hasText: registration.goods.type }).click();
  await page.getByText(registration.goods.extraLabel).first().click();
  await nextStep.click();

  // Step 3: Shipment details
  const transportModeCombo = page.getByRole('combobox', { name: 'Transport Mode' });
  const incotermsCombo = page.getByRole('combobox', { name: 'Incoterms' });
  const originLocationInput = page.getByRole('textbox', { name: 'Origin Location' });
  const destinationLocationInput = page.getByRole('textbox', { name: 'Destination Location' });

  await pickComboboxOption(transportModeCombo, registration.shipment.transportMode);
  await pickComboboxOption(incotermsCombo, registration.shipment.incoterms);

  await originLocationInput.fill(registration.shipment.originLocation);
  await page.locator('#originCountry').fill(registration.shipment.originCountry);
  await destinationLocationInput.fill(registration.shipment.destinationLocation);
  await page.locator('#destinationCountry').fill(registration.shipment.destinationCountry);

  // Capture actual values shown in the detail form for later verification in admin
  const transportModeValue =
    (await transportModeCombo.textContent())?.trim() ?? registration.shipment.transportMode;
  const originLocationValue = await originLocationInput.inputValue();
  const destinationLocationValue = await destinationLocationInput.inputValue();

  await page
    .getByRole('textbox', { name: 'Expected Pickup Date' })
    .fill(registration.shipment.expectedPickupDate);
  await page
    .getByRole('textbox', { name: 'Expected Delivery Date' })
    .fill(registration.shipment.expectedDeliveryDate);
  await page
    .getByRole('textbox', { name: 'Port of Loading (POL)' })
    .fill(registration.shipment.portOfLoading);
  await page
    .getByRole('textbox', { name: 'Port of Discharge (POD)' })
    .fill(registration.shipment.portOfDischarge);
  await pickComboboxOption(
    page.getByRole('combobox', { name: 'Delivery Type' }),
    registration.shipment.deliveryType,
  );
  await page.getByText(registration.shipment.customsQuestionYesLabel).first().click();
  await nextStep.click();

  // Step 4: Confirm & submit
  await page.getByRole('checkbox', { name: 'I agree to the Terms & Conditions' }).check();
  await page.getByRole('checkbox', { name: 'I understand that fees may' }).check();
  await page.getByRole('checkbox', { name: 'I confirm the provided' }).check();
  await page.getByRole('checkbox', { name: 'Subscribe to shipment updates' }).check();

  const submit = page.getByRole('button', { name: 'Submit Request' });
  await expect(submit).toBeEnabled();
  await submit.click();

  // Verify success dialog appears after submit
  const successDialog = page.getByRole('alertdialog', { name: 'Request submitted' });
  await expect(successDialog).toBeVisible();
  await expect(
    successDialog.getByRole('heading', { name: 'Request submitted' }),
  ).toBeVisible();

  const close = page.getByRole('button', { name: 'Close' });
  await expect(close).toBeVisible();
  await close.click();

  // Step 5: Verify in admin
  await page.goto('https://admin.rabbitfly.org/');
  await page.getByRole('textbox', { name: 'admin@rfl.com' }).fill(registration.admin.email);
  await page
    .getByRole('textbox', { name: 'Enter your password' })
    .fill(registration.admin.password);
  await page.getByRole('button', { name: 'Sign in to Admin' }).click();

  await page.getByRole('button', { name: 'Transport Order list' }).click();
  await expect(page).toHaveURL(/admin/);

  // Assert company name in list
  await expect(
    page.getByRole('cell', { name: registration.company.name }),
  ).toBeVisible();

  // Find row for specific order id in admin table
  const row = page.getByRole('row').filter({
    has: page.getByRole('cell', { name: registration.admin.orderId }),
  });

  // Origin from detail form
  const originCell = row
    .getByRole('cell')
    .filter({ hasText: new RegExp(originLocationValue, 'i') });
  await expect(originCell).toBeVisible();

  // Destination from detail form
  const destinationCell = row
    .getByRole('cell')
    .filter({ hasText: new RegExp(destinationLocationValue, 'i') });
  await expect(destinationCell).toBeVisible();

  // Transport mode from detail form
  const transportModeCell = row
    .getByRole('cell')
    .filter({ hasText: new RegExp(transportModeValue, 'i') });
  await expect(transportModeCell).toBeVisible();
});