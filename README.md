# Sale Tracker PWA v4

This build now does the two big upgrades you asked for:

- the app starts with the actual data from your latest `Sale Tracker.xlsx`
- the Tools tab can import a newer spreadsheet to refresh the app data

## Included now
- Add Buy
- Record Sale
- Partial sale split-lot workflow
- Wash Review
- JSON backup import/export
- XLSX spreadsheet import from the `Wash Sale Tracker` sheet
- Restore starter workbook data button

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

## Notes
- Spreadsheet import replaces the current in-app data with the uploaded workbook data.
- The app still calculates its own wash-review view from the imported lots and sales.
- JSON export remains useful as a quick app-only backup.
