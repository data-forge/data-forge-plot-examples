//
// This example modelled on the C3 example line chart.
//
// http://c3js.org/samples/timeseries.html
//

const x = ["2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"];
const data1 = [30, 200, 100, 400, 150, 250];
const data2 = [130, 340, 263, 300, 225, 315];

import { DataFrame } from "data-forge";
import "data-forge-plot";
import "@data-forge-plot/render";
import * as fs from "fs-extra";
import * as path from "path";

const outputName = path.basename(__filename, ".ts");
const outputPath = path.join("./output", outputName);
fs.emptyDirSync(outputPath);

async function main(): Promise<void> {

    const df = new DataFrame({
            columns: {
                date: x,
                data1: data1,
                data2: data2
            },
        })
        .parseDates("date", "YYYY-MM-DD")
        .setIndex<Date>("date")
        .dropSeries("date");
    
    //console.log(df.toString());
    
    const plot = df.plot({
            x: {
                label: {
                    text: "Date",
                    font: {
                        size: "2em",
                        family: "Courier New"
                    },
                },
            },
            y: { 
                label: {
                    text: "Data 1",
                    font: {
                        size: "1.2em",
                        family: "Courier New"
                    },
                },
            },
            y2: { 
                label: {
                    text: "Data 2",
                    font: {
                        size: "1.2em",
                        family: "Courier New"
                    },
                },
            },
            legend: {
                show: true, //TODO: This should just default to true if the legend is configured.
                font: {
                    size: "12px",
                    family: "Courier New"
                },
            },
        },
        {
            y: {
                series: "data1",
                label: "Data 1", //TODO: This doesn't work yet.
            },
            y2: {
                series: "data2",
                label: "Data 2", //TODO: This doesn't work yet.
            },
        }
    );
    await plot.renderImage(path.join(outputPath, "image.png"), { openImage: false });
    await plot.exportWeb(path.join(outputPath, "web"), { overwrite: true, openBrowser: false });
}

main()
    .then(() => console.log("Done"))
    .catch(err => console.error(err && err.stack || err));


