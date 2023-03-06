const token = "90932507|-31949274847128543|90949616";
const dbName = "EMP-DB";
const relName = "EmpData";
const irl = "/api/irl";
const iml = "/api/iml";
reset();
// executeCommandAtGivenBaseUrl(request, baseUrl, irl);

function search() {
  const id = document.getElementById("emp-id").value;
  if (!id) {
    window.alert("ID can not be empty!");
    location.reload();
    return;
  }
  const query = `{"id": ${parseInt(id)}}`;
  const request = createGET_BY_KEYRequest(
    token,
    dbName,
    relName,
    query,
    true,
    true
  );
  jQuery.ajaxSetup({ async: false });
  const exec = executeCommandAtGivenBaseUrl(request, baseUrl, irl);

  console.log(request);
  console.log(exec);
  if (exec["status"] == 200) {
    console.log("done");
    /*
      1. lock the id field.
      2. unlock the rest of the fields and focus on Employee name.
      3. fill relevant data in the rest of the fields.
      4. enable change and reset button.
    */

    const record = JSON.parse(exec["data"])["record"];
    document.getElementById("emp-id").disabled = true;
    document.getElementById("emp-name").disabled = false;
    document.getElementById("emp-name").select();
    document.getElementById("emp-name").value = record["name"];
    document.getElementById("emp-basic").disabled = false;
    document.getElementById("emp-basic").value = record["basic"];
    document.getElementById("emp-hra").disabled = false;
    document.getElementById("emp-hra").value = record["hra"];
    document.getElementById("emp-da").disabled = false;
    document.getElementById("emp-da").value = record["da"];
    document.getElementById("emp-deduction").disabled = false;
    document.getElementById("emp-deduction").value = record["deduction"];

    document.getElementById("change").disabled = false;
    document.getElementById("reset").disabled = false;
  } else {
    /*
      1. unlock other fields.
      2. enable save and reset buttons.
    */
    document.getElementById("emp-name").disabled = false;
    document.getElementById("emp-name").value = "";
    document.getElementById("emp-name").select();

    document.getElementById("emp-basic").disabled = false;
    document.getElementById("emp-basic").value = "";

    document.getElementById("emp-hra").disabled = false;
    document.getElementById("emp-hra").value = "";

    document.getElementById("emp-da").disabled = false;
    document.getElementById("emp-da").value = "";

    document.getElementById("emp-deduction").disabled = false;
    document.getElementById("emp-deduction").value = "";

    document.getElementById("save").disabled = false;
    document.getElementById("reset").disabled = false;
  }
}

function reset() {
  document.getElementById("save").disabled = true;
  document.getElementById("change").disabled = true;
  document.getElementById("reset").disabled = true;

  document.getElementById("emp-id").disabled = false;
  document.getElementById("emp-id").value = "";

  document.getElementById("emp-name").disabled = true;
  document.getElementById("emp-name").value = "";

  document.getElementById("emp-basic").disabled = true;
  document.getElementById("emp-basic").value = "";

  document.getElementById("emp-hra").disabled = true;
  document.getElementById("emp-hra").value = "";

  document.getElementById("emp-da").disabled = true;
  document.getElementById("emp-da").value = "";

  document.getElementById("emp-deduction").disabled = true;
  document.getElementById("emp-deduction").value = "";

  document.getElementById("emp-id").select();
}

function save() {
  const id = document.getElementById("emp-id").value;
  const name = document.getElementById("emp-name").value;
  const hra = document.getElementById("emp-hra").value;
  const da = document.getElementById("emp-da").value;
  const basic = document.getElementById("emp-basic").value;
  const deduction = document.getElementById("emp-deduction").value;

  if (
    !id ||
    !name ||
    !hra ||
    !da ||
    !basic ||
    !deduction ||
    (!isNaN(parseFloat(name)) && isFinite(name))
  ) {
    window.alert("Kindly check the values again!");
    return;
  }

  const jsonStr = `{
    "id": "${id}",
    "name": "${name}",
    "basic": "${basic}",
    "hra": "${hra}",
    "da": "${da}",
    "deduction": "${deduction}"
  }`;
  const request = createPUTRequest(token, jsonStr, dbName, relName);
  jQuery.ajaxSetup({ async: false });
  const result = executeCommandAtGivenBaseUrl(request, baseUrl, iml);

  console.log(request);
  console.log(result);

  if (result["status"] == 200) window.alert("Records entered successfully!");
  else window.alert("Error: " + result["message"]);

  location.reload();
}

function change() {
  const id = document.getElementById("emp-id").value;
  const name = document.getElementById("emp-name").value;
  const hra = document.getElementById("emp-hra").value;
  const da = document.getElementById("emp-da").value;
  const basic = document.getElementById("emp-basic").value;
  const deduction = document.getElementById("emp-deduction").value;

  if (
    !id ||
    !name ||
    !hra ||
    !da ||
    !basic ||
    !deduction ||
    (!isNaN(parseFloat(name)) && isFinite(name))
  ) {
    window.alert("Kindly check the values again!");
    return;
  }

  const jsonStr = `{
    "id": ${id},
    "name": "${name}",
    "basic": "${basic}",
    "hra": "${hra}",
    "da": "${da}",
    "deduction": "${deduction}"
  }`;

  const request = createSETRequest(
    token,
    jsonStr,
    dbName,
    relName,
    "UPDATE",
    "id"
  );

  jQuery.ajaxSetup({ async: false });
  const result = executeCommandAtGivenBaseUrl(request, baseUrl, iml + "/set");

  if (result["status"] == 200) window.alert("Records updated successfully!");
  else window.alert("Error: " + result["message"]);
  location.reload();
}
