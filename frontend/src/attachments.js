const { Client } = require("node-rfc");
const fs = require("fs"); // Required to save attachments if needed

// SAP connection configuration
const abapSystem = {
  user: "yourUsername",
  passwd: "yourPassword",
  ashost: "yourSAPHost", // e.g., 'sap.example.com'
  sysnr: "00", // System number
  client: "100", // Client number
  lang: "EN", // Language
};

async function getAttachments(purchaseOrderNumber) {
  const client = new Client(abapSystem);

  try {
    // Open connection
    await client.open();
    console.log("Connected to SAP!");

    // Call the RFC Function Module
    const result = await client.call("/VSDMAG/ZPO_ATTACH_CONTENT", {
      IV_PO_NUMBER: purchaseOrderNumber, // Input parameter
    });

    // Handle the response
    if (result && result.ET_ATTACHMENTS && result.ET_ATTACHMENTS.length > 0) {
      console.log("Attachments retrieved successfully!");

      result.ET_ATTACHMENTS.forEach((attachment, index) => {
        console.log(`Attachment ${index + 1}:`);
        console.log(`Filename: ${attachment.FILENAME}`);
        console.log(`File Content (Base64): ${attachment.CONTENT}`);

        // Save attachment to a file (optional)
        const buffer = Buffer.from(attachment.CONTENT, "base64");
        fs.writeFileSync(`./${attachment.FILENAME}`, buffer);
        console.log(`Attachment saved as: ${attachment.FILENAME}`);
      });
    } else {
      console.log("No attachments found for the given Purchase Order.");
    }
  } catch (err) {
    console.error("Error while retrieving attachments:", err);
  } finally {
    // Close connection
    await client.close();
    console.log("SAP connection closed.");
  }
}

// Example usage
const purchaseOrderNumber = "4500000000"; // Replace with your purchase order number
getAttachments(purchaseOrderNumber);
