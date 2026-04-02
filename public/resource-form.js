import { auth, db } from "../config.js";
import { ref, push, onValue, remove, set, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const resourceDropdown = document.getElementById("resourceType");

resourceDropdown.onchange = () => {
    const selectedValue = resourceDropdown.value;
    switch (selectedValue) {
        case "nonprofit":
            document.getElementById("addressBox").classList.remove("hidden");
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("dates").classList.add("hidden");
            break;
        case "event":
            document.getElementById("addressBox").classList.remove("hidden");
            document.getElementById("dates").classList.remove("hidden");
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            break;
        case "program": 
            document.getElementById("addressBox").classList.remove("hidden");
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("dates").classList.add("hidden");
            break;
        case "hotline":
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("addressBox").classList.add("hidden");
            document.getElementById("dates").classList.add("hidden");
            break;
        case "info":
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("addressBox").classList.add("hidden");
            document.getElementById("dates").classList.add("hidden");
            document.getElementById("contactInfo").classList.add("hidden");
            break;
        case "support": 
            document.getElementById("addressBox").classList.remove("hidden");
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("dates").classList.add("hidden");
            break;
        case "media":
            document.getElementById("contactInfo").classList.remove("hidden");
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("addressBox").classList.add("hidden");
            document.getElementById("dates").classList.add("hidden");
            break;
        case "other":
            document.getElementById("linkBox").classList.remove("hidden");
            document.getElementById("addressBox").classList.add("hidden");
            document.getElementById("dates").classList.add("hidden");
            document.getElementById("contactInfo").classList.add("hidden");
            break;
    }
}

const dateCheckbox = document.getElementById("isMultiDay")
dateCheckbox.addEventListener("input", () => {
    if (dateCheckbox.checked) {
        document.getElementById("dateRange").classList.remove("hidden")
        document.getElementById("singleDate").classList.add("hidden")
    } else {
        document.getElementById("dateRange").classList.add("hidden")
        document.getElementById("singleDate").classList.remove("hidden")
    }
})

const form = document.getElementById("new-resource");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dbref = ref(db, "resources");

    const address = [
        form.streetAddress.value,
        form.town.value,
        form.zip.value
    ].filter(Boolean).join(", ");

    const contact = form.phone.value || form.email.value || "";

    const resource = {
        rName: form.rName.value,
        resourceType: form.resourceType.value,
        address: address,
        contact: contact,
        website: form.link.value,
        desc: form.desc.value,
        tags: form.tags.value.split(",").map(t => t.trim()).filter(t => t.length > 0)
    };

    push(dbref, resource);

    console.log("Saved:", resource);
    form.reset();
});