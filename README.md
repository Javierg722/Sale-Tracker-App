# Sale Tracker PWA v5

This build now does the two big upgrades you asked for:

- the app starts with the actual data from your latest `Sale Tracker.xlsx`
- the Tools tab can import a newer spreadsheet to refresh the app data

## Included now
- Add Buy
- Record Sale
- Partial sale split-lot workflow
- Wash Review
- JSON backup import
- XLSX spreadsheet import from the `Wash Sale Tracker` sheet
- XLSX spreadsheet export that writes the current app data into the workbook entry ranges while keeping formulas intact

## Spreadsheet import behavior
Use **Import Spreadsheet (.xlsx)** in the Tools tab.
The importer reads the trade-entry tables on the **Wash Sale Tracker** sheet and rebuilds the app data from those rows.

Expected columns:
- Ticker
- Buy Date
- Shares Bought
- Cost / Share
- Sell Date
- Sale Price / Share
- Shares Remaining
- Shares Sold

## Spreadsheet export behavior
Use **Export Spreadsheet (.xlsx)** in the Tools tab.
The app builds a fresh copy of the included `Sale Tracker.xlsx` template, clears the trade-entry cells in the U.S. and International entry ranges, then writes your current app data back into those rows. Formula columns stay in the workbook.

## Notes
- Spreadsheet import replaces the current in-app data with the uploaded workbook data.
- Spreadsheet export creates a new workbook download from the included template.
- The app still calculates its own wash-review view from the imported lots and sales.
- JSON import is still available for app-only recovery if needed.
