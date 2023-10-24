// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.14/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'myaccount-platform-status.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const statusArray = Object.values(json); // convert property values into an array
const filteredPlatformStatus = statusArray.map(item => ({
    name: 'Cleansing services',
    status: item.status,
    last_polled_time: item.last_polled_time,
    code: item.code,
    id: item.monitor_id
}));

// Step 3. Write a new JSON file with our filtered data
const newFilename = `myaccount-platform-status-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, filteredPlatformStatus) // create a new JSON file
console.log("Wrote a post process file")

// Optionally delete the original file
await removeFile('./myaccount-platform-status.json')
