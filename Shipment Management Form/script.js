const token = "90932507|-31949274847128543|90949616";
const dbName = "SHIPMENT-DB";
const relName = "ShipmentData";
const irl = "/api/irl";
const iml = "/api/iml";

const shipmentNumberField = document.getElementById("shipment-no");
const descriptionField = document.getElementById("description");
const sourceField = document.getElementById("source");
const destinationField = document.getElementById("destination");
const shippingDateField = document.getElementById("shipping-date");
const deliveryDateField = document.getElementById("delivery-date");

const saveButton = document.getElementById("save");
const changeButton = document.getElementById("change");
const resetButton = document.getElementById("reset");

reset();

function search() {
  const shipmentNumber = parseInt(document.getElementById("shipment-no").value);
  if (!shipmentNumber) {
    window.alert("Shipment Number can't be empty!");
    location.reload();
    return;
  }
  const query = `{"shipmentNumber": ${shipmentNumber}}`;
  const request = createGET_BY_KEYRequest(token, dbName, relName, query);
  jQuery.ajaxSetup({ async: false });
  const exec = executeCommandAtGivenBaseUrl(request, baseUrl, irl);

  if (exec["status"] == 200) {
    console.log(exec);
    const record = JSON.parse(exec["data"])["record"];

    shipmentNumberField.disabled = true;

    descriptionField.disabled = false;
    document.getElementById("description").select();
    descriptionField.value = record["description"];

    sourceField.disabled = false;
    sourceField.value = record["source"];

    destinationField.disabled = false;
    destinationField.value = record["destination"];

    shippingDateField.disabled = false;
    shippingDateField.value = record["shippingDate"];

    deliveryDateField.disabled = false;
    deliveryDateField.value = record["deliveryDate"];

    changeButton.disabled = false;
    resetButton.disabled = false;
  } else {
    descriptionField.disabled = false;
    descriptionField.value = "";
    document.getElementById("description").select();

    sourceField.disabled = false;
    sourceField.value = "";

    destinationField.disabled = false;
    destinationField.value = "";

    shippingDateField.disabled = false;
    shippingDateField.value = "";

    deliveryDateField.disabled = false;
    deliveryDateField.value = "";

    saveButton.disabled = false;
    resetButton.disabled = false;
  }
}

function reset() {
  shipmentNumberField.disabled = false;

  descriptionField.disabled = true;
  descriptionField.value = "";

  sourceField.disabled = true;
  sourceField.value = "";

  destinationField.disabled = true;
  destinationField.value = "";

  shippingDateField.disabled = true;
  shippingDateField.value = "";

  deliveryDateField.disabled = true;
  deliveryDateField.value = "";

  saveButton.disabled = true;
  changeButton.disabled = true;
  resetButton.disabled = true;

  document.getElementById("shipment-no").select();
}

function save() {
  const shipmentNumber = shipmentNumberField.value;
  const description = descriptionField.value;
  const source = sourceField.value;
  const destination = destinationField.value;
  const shippingDate = shippingDateField.value;
  const deliveryDate = deliveryDateField.value;

  if (
    !shipmentNumber ||
    !description ||
    !source ||
    !destination ||
    !shippingDate ||
    !deliveryDate
  ) {
    window.alert("Kindly check the values again!");
    return;
  }

  const jsonStr = `{
    "shipmentNumber": ${shipmentNumber},
    "description": "${description}",
    "source": "${source}",
    "destination": "${destination}",
    "shippingDate": "${shippingDate}",
    "deliveryDate": "${deliveryDate}"
    }`;

  const request = createSETRequest(
    token,
    jsonStr,
    dbName,
    relName,
    "PUT",
    "shipmentNumber"
  );

  //   const request = createPUTRequest(token, jsonStr, dbName, relName);
  jQuery.ajaxSetup({ async: false });
  const result = executeCommandAtGivenBaseUrl(request, baseUrl, iml + "/set");

  console.log(request);
  console.log(result);

  if (result["status"] == 200) window.alert("Records entered successfully!");
  else window.alert("Error: " + result["message"]);

  location.reload();
}

function change() {
  const shipmentNumber = shipmentNumberField.value;
  const description = descriptionField.value;
  const source = sourceField.value;
  const destination = destinationField.value;
  const shippingDate = shippingDateField.value;
  const deliveryDate = deliveryDateField.value;

  if (
    !shipmentNumber ||
    !description ||
    !source ||
    !destination ||
    !shippingDate ||
    !deliveryDate
  ) {
    window.alert("Kindly check the values again!");
    return;
  }
  const jsonStr = `{
      "shipmentNumber": ${shipmentNumber},
      "description": "${description}",
      "source": "${source}",
      "destination": "${destination}",
      "shippingDate": "${shippingDate}",
      "deliveryDate": "${deliveryDate}"
  }`;

  const request = createSETRequest(
    token,
    jsonStr,
    dbName,
    relName,
    "UPDATE",
    "shipmentNumber"
  );
  jQuery.ajaxSetup({ async: false });
  const result = executeCommandAtGivenBaseUrl(request, baseUrl, iml + "/set");

  if (result["status"] == 200) window.alert("Records updated successfully!");
  else window.alert("Error: " + result["message"]);
  location.reload();
}
